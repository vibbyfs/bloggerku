const app = require('../app')
const supertest = require('supertest')
const { expect, test, beforeAll, afterAll, describe } = require('@jest/globals')
const { sequelize, User } = require('../models')
const queryInterface = sequelize.getQueryInterface();

const { signToken } = require('../helper/jwt')
const { hashPassword, comparePassword } = require('../helper/bcryptjs')

let tokenAdmin;

beforeAll(async () => {

    const users = require('../data/users.json').map((user) => {
        delete user.id
        user.password = hashPassword(user.password)
        user.createdAt = user.updatedAt = new Date()
        return user
    })

    await queryInterface.bulkInsert("Users", users);

    const admin = await User.findOne({ where: { email: "admin1@mail.com" } });
    tokenAdmin = signToken({ id: admin.id });

})

afterAll(async () => {
        await User.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    });
})

describe('POST /login', () => {

    test('Berhasil login', async () => {

        const formLogin = {
            "email": "admin1@mail.com",
            "password": "adminadmin"
        }

        const response = await supertest(app).post('/login').send(formLogin)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("access_token");
    })

    test('Gagal login karena email tidak diisi', async () => {
        const formLogin = {
            "email": "",
            "password": "adminadmin"
        }
        const response = await supertest(app).post('/login').send(formLogin)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Email is required')
    })

    test('Gagal login karena password tidak diisi', async () => {
        const formLogin = {
            "email": "admin1@mail.com",
            "password": ""
        }
        const response = await supertest(app).post('/login').send(formLogin)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Password is required')
    })

    test('Gagal login karena email tidak valid', async () => {
        const formLogin = {
            "email": "malam-malam",
            "password": "adminadmin"
        }
        const response = await supertest(app).post('/login').send(formLogin)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Email or password is required')
    })

    test('Gagal login karena password tidak valid', async () => {
        const formLogin = {
            "email": "admin1@mail.com",
            "password": "1"
        }
        const response = await supertest(app).post('/login').send(formLogin)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Email or password is required')
    })

})



