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

describe('PUT /posts/:id', () => {

    test('Berhasil mengupdate data entitas utama berdasarkan params id yang diberikan', async () => {
        const formPost = {
            "title": "Tips tidak belajar tapi pintar",
            "content": "Mengelola keuangan pribadi adalah kunci mencapai tujuan finansial. Mulailah dengan membuat anggaran, lacak pengeluaran, dan sisihkan dana untuk tabungan serta investasi.",
            "imgUrl": "https://example.com/images/keuangan1.jpg",
            "categoryId": 2,
            "AuthorId": 2
        }

        const response = await supertest(app)
            .put('/posts/2')
            .set('Authorization', `Bearer ${accessStaff}`)
            .send(formPost);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty("createdAt", expect.any(String));
        expect(response.body).toHaveProperty("updatedAt", expect.any(String));
        expect(response.body).toHaveProperty("title", formPost.title);
        expect(response.body).toHaveProperty("content", formPost.content);
        expect(response.body).toHaveProperty("imgUrl", formPost.imgUrl);
        expect(response.body).toHaveProperty("categoryId", formPost.categoryId);
        expect(response.body).toHaveProperty("AuthorId", formPost.AuthorId);
    });

    test('Gagal menjalankan fitur karena belum login', async () => {
        const formPost = {
            "title": "Tips tidak belajar tapi pintar",
            "content": "Mengelola keuangan pribadi adalah kunci mencapai tujuan finansial. Mulailah dengan membuat anggaran, lacak pengeluaran, dan sisihkan dana untuk tabungan serta investasi.",
            "imgUrl": "https://example.com/images/keuangan1.jpg",
            "categoryId": 2,
            "AuthorId": 2
        }

        const response = await supertest(app)
            .put('/posts/2')
            .send(formPost);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Invalid Token");

    });

    test('Gagal menjalankan fitur karena token yang diberikan tidak valid', async () => {
        const formPost = {
            "title": "Tips tidak belajar tapi pintar",
            "content": "Mengelola keuangan pribadi adalah kunci mencapai tujuan finansial. Mulailah dengan membuat anggaran, lacak pengeluaran, dan sisihkan dana untuk tabungan serta investasi.",
            "imgUrl": "https://example.com/images/keuangan1.jpg",
            "categoryId": 2,
            "AuthorId": 2
        }

        const response = await supertest(app)
            .put('/posts/2')
            .set('Authorization', `InvalidToken ${accessInvalid}`)
            .send(formPost);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Invalid Token");

    });

    test('Gagal karena id identity yang dikirim tidak ada di database', async () => {
        const formPost = {
            "title": "Tips tidak belajar tapi pintar",
            "content": "Mengelola keuangan pribadi adalah kunci mencapai tujuan finansial. Mulailah dengan membuat anggaran, lacak pengeluaran, dan sisihkan dana untuk tabungan serta investasi.",
            "imgUrl": "https://example.com/images/keuangan1.jpg",
            "categoryId": 2,
            "AuthorId": 2
        }

        const response = await supertest(app)
            .put('/posts/99')
            .set('Authorization', `Bearer ${accessStaff}`)
            .send(formPost);

        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Post with id 99 not found");

    });

    test('Gagal menjalankan fitur karena staff mengolah data entity yang bukan miliknya', async () => {
        const formPost = {
            "title": "Tips tidak belajar tapi pintar",
            "content": "Mengelola keuangan pribadi adalah kunci mencapai tujuan finansial. Mulailah dengan membuat anggaran, lacak pengeluaran, dan sisihkan dana untuk tabungan serta investasi.",
            "imgUrl": "https://example.com/images/keuangan1.jpg",
            "categoryId": 2,
            "AuthorId": 2
        }

        const response = await supertest(app)
            .put('/posts/1')
            .set('Authorization', `Bearer ${accessStaff}`)
            .send(formPost);

        expect(response.status).toBe(403);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "You are not authorized to access this post");

    });

    test('Gagal ketika request body tidak sesuai (validation required)', async () => {
        const formPost = {
            "title": "",
            "content": "Mengelola keuangan pribadi adalah kunci mencapai tujuan finansial. Mulailah dengan membuat anggaran, lacak pengeluaran, dan sisihkan dana untuk tabungan serta investasi.",
            "imgUrl": "https://example.com/images/keuangan1.jpg",
            "categoryId": 1,
            "AuthorId": 1
        }

        const response = await supertest(app)
            .put('/posts/1')
            .set('Authorization', `Bearer ${accessAdmin}`)
            .send(formPost);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Title is required");

    });

});