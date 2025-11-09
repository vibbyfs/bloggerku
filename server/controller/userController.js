const { sign } = require('jsonwebtoken');
const { comparePassword } = require('../helper/bcryptjs');
const { signToken } = require('../helper/jwt');
const { User } = require('../models')
const bcryptjs = require('bcryptjs')

class UserController {

    static async addUser(req, res, next) {
        try {
            const { email, password, phoneNumber, address, username } = req.body

            let user = await User.create({
                email,
                password,
                phoneNumber,
                address,
                username,
            })
            res.status(201).json({
                email: user.email,
                phoneNumber: user.phoneNumber,
                address: user.address,
                username: user.username,
                role: user.role
            })

        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email) {
                throw { name: 'BadRequest', message: 'Email is required' }
            }
            if (!password) {
                throw { name: 'BadRequest', message: 'Password is required' }
            }

            const user = await User.findOne({ where: { email } })
            if (!user) {
                throw { name: 'Unauthorized', message: 'Email or password is required' }
            }

            const isValidPassword = comparePassword(password, user.password)
            if (!isValidPassword) {
                throw { name: 'Unauthorized', message: 'Email or password is required' }
            }

            const access_token = signToken({ id: user.id })
            res.status(200).json({ access_token })

        } catch (error) {
            next(error)
        }
    }

}

module.exports = UserController