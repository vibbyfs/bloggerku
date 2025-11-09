const app = require('../app')
const supertest = require('supertest')
const { expect, test, describe } = require('@jest/globals')
const { sequelize, User, Category, Post } = require("../models");
const queryInterface = sequelize.getQueryInterface();

const { signToken } = require('../helper/jwt')
const { hashPassword } = require('../helper/bcryptjs');

let accessAdmin;
let accessStaff;
let accessInvalid = 'invalidinvalidinvalid'

beforeAll(async () => {
    try {
        const users = require('../data/users.json').map((user) => {
            delete user.id;
            user.password = hashPassword(user.password);
            user.createdAt = user.updatedAt = new Date();
            return user;
        });

        const categories = require("../data/categories.json").map((category) => {
            delete category.id;
            category.createdAt = category.updatedAt = new Date();
            return category;
        });

        const posts = require("../data/posts.json").map((post) => {
            delete post.id;
            post.createdAt = post.updatedAt = new Date();
            return post;
        });

        await queryInterface.bulkInsert("Users", users);
        await queryInterface.bulkInsert("Categories", categories);
        await queryInterface.bulkInsert("Posts", posts);
    } catch (error) {
        // console.log(error);
        // console.log("Error seeding")
        throw error
    }

    const admin = await User.findOne({ where: { role: 'Admin' } });
    accessAdmin = signToken({ id: admin.id });

    const staff = await User.findOne({ where: { role: 'Staff' } });
    accessStaff = signToken({ id: staff.id });
});

afterAll(async () => {
    await Post.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    });
    await Category.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    });
    await User.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    });
});


describe('GET /pub/posts', () => {

    test('Berhasil mendapatkan semua postingan', async () => {
        const response = await supertest(app)
            .get('/pub/posts');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('Berhasil mendapatkan semua postingan dengan satu parameter query', async () => {
        const response = await supertest(app)
            .get('/pub/posts?categoryId=1');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('Berhasil mendapatkan semua postingan dengan nomor halaman atau paginasi', async () => {
        const response = await supertest(app)
            .get('/pub/posts?categoryId=1&page=1');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('Berhasil mendapatkan postingan dengan id', async () => {
        const response = await supertest(app)
            .get('/pub/posts/1');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("id", expect.any(Number))
        expect(response.body).toHaveProperty("title", expect.any(String));

    });

    test('Gagal mendapatkan postingan dengan id karena data tidak ditemukan', async () => {
        const response = await supertest(app)
            .get('/pub/posts/99');

        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Post with id 99 not found");
    });
});
