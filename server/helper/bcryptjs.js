const bcryptjs = require('bcryptjs')

const hashPassword = (password) => {
    const salt = bcryptjs.genSaltSync(10)
    return bcryptjs.hashSync(password, salt)
}

const comparePassword = (password, hashedPassword) => {
    return bcryptjs.compareSync(password, hashedPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}