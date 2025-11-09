const { Post } = require('../models')

async function accessStaff(req, res, next) {
    try {
        const post = await Post.findByPk(req.params.id)
        if (!post) {
            throw { name: 'NotFound', message: `Post with id ${req.params.id} not found` };
        }

        if (req.user.role === 'Admin') {
            next()
        }
        if (req.user.role === 'Staff') {
            if (post.AuthorId === req.user.id) {
                next();
            } else {
                throw { name: 'Forbidden', message: 'You are not authorized to access this post' };
            }
        }
    } catch (error) {
        next(error)
    }
}

module.exports = accessStaff