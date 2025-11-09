
async function adminOnly(req, res, next) {
    try {
        if (req.user.role === 'Admin') {
            next()
        } else {
            throw { name: 'Forbidden', message: 'Forbidden Access' }
        }
    } catch (error) {
        next(error)
    }

}

module.exports = adminOnly