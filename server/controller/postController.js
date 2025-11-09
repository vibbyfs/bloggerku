const { Post, User } = require('../models')
const cloudinary = require('cloudinary').v2;
const { Op } = require('sequelize')

class PostController {

    static async createPost(req, res, next) {
        try {

            const { title, content, imgUrl, categoryId } = req.body

            let post = await Post.create({
                title,
                content,
                imgUrl,
                categoryId,
                AuthorId: req.user.id
            })
            res.status(201).json(post)

        } catch (error) {
            next(error)
        }
    }

    static async listPost(req, res, next) {
        try {
            let post = await Post.findAll({
                include: {
                    model: User,
                    attributes: ['id', 'username', 'email', 'role', 'phoneNumber', 'address']
                },
                order: [['updatedAt', 'DESC']]
            })
            res.status(200).json(post)
        } catch (error) {
            next(error)
        }
    }

    static async getPostById(req, res, next) {
        try {
            const { id } = req.params

            let post = await Post.findByPk(id)
            if (!post) {
                throw { name: 'NotFound', message: `Post with id ${id} not found` }
            }

            res.status(200).json(post)
        } catch (error) {
            next(error)
        }
    }

    static async updatePostById(req, res, next) {
        try {
            const { id } = req.params
            const { title, content, imgUrl, categoryId } = req.body

            let post = await Post.findByPk(id)
            if (!post) {
                throw { name: 'NotFound', message: `Post with id ${id} not found` }
            }

            await post.update({
                title,
                content,
                imgUrl,
                categoryId
            })
            res.status(200).json(post)

        } catch (error) {
            next(error)
        }
    }

    static async deletePostById(req, res, next) {
        try {
            const { id } = req.params

            let post = await Post.findByPk(id)
            if (!post) {
                throw { name: 'NotFound', message: `Post with id ${id} not found` }
            }

            await Post.destroy({
                where: {
                    id
                }
            })

            res.status(200).json({ message: `Post with title ${post.id} success to delete` })

        } catch (error) {
            next(error)
        }
    }

    static async listPostPublic(req, res, next) {
        try {

            let { search, filter, sort, page } = req.query
            let queryOption = {
                where: {}
            }

            if (search) {
                queryOption.where.title = {
                    [Op.iLike]: `%${search}%`
                }
            }

            if (filter) {
                queryOption.where.categoryId = filter
            }

            if (sort) {
                const ordering = sort[0] === "-" ? 'DESC' : 'ASC'
                const columnName = ordering === "DESC" ? sort.slice(1) : sort
                queryOption.order = [
                    [columnName, ordering]
                ]
            }

            if (!Number(page)) {
                page = 1
            }
            let limit = 10

            queryOption.limit = limit
            queryOption.offset = (page - 1) * limit

            let post = await Post.findAll(queryOption)
            res.status(200).json(post)
        } catch (error) {
            next(error)
        }
    }

    static async listPostPublicById(req, res, next) {
        try {
            const { id } = req.params

            let post = await Post.findByPk(id)
            if (!post) {
                throw { name: 'NotFound', message: `Post with id ${id} not found` }
            }

            res.status(200).json(post)

        } catch (error) {
            next(error)
        }
    }

    static async updatePostCoverById(req, res, next) {
        try {
            if (!req.file) {
                throw { name: 'BadRequest', message: 'File is required' }
            }

            const postId = +req.params.id
            const post = await Post.findByPk(postId)
            if (!post) {
                throw { name: 'NotFound', message: `Post with ${postId} not found` }
            }

            const uploadPromise = new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream((error, uploadResult) => {

                    if (error) return reject(error)

                    return resolve(uploadResult);
                }).end(req.file.buffer);
            })

            const result = await uploadPromise
            await post.update({ imgUrl: result.secure_url });

            res.json({ message: `Post cover url has been updated!` })

        } catch (error) {
            next(error)
        }
    }

}

module.exports = PostController