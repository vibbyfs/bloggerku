const { User } = require('../models')
const { verifyToken } = require('../helper/jwt')

async function authentication(req, res, next) {
    try {
        const { authorization } = req.headers

        if (!authorization) {
            throw { name: 'Unauthorized', message: 'Invalid Token' }
        }

        const rawToken = authorization.split(' ')
        const keyToken = rawToken[0]
        const valueToken = rawToken[1]

        if (keyToken !== "Bearer" || !valueToken) {
            throw { name: 'Unauthorized', message: 'Invalid Token' }
        }

        const result = verifyToken(valueToken)

        const user = await User.findByPk(result.id)
        if (!user) {
            throw { name: 'Unauthorized', message: "Invalid Token" }
        }

        req.user = { id: user.id, role: user.role }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication