const { logger } = require('sequelize/lib/utils/logger')
const { Category } = require('../models')
const { where } = require('sequelize')

class CategoryController {

    static async createCategory(req, res, next) {
        try {
            const { name } = req.body

            let category = await Category.create({
                name
            })
            res.status(201).json(category)

        } catch (error) {
            next(error)
        }
    }

    static async getCategories(req, res, next) {
        try {

            let data = await Category.findAll()
            res.status(200).json(data)

        } catch (error) {
            next(error)
        }
    }

    static async updateCategoryById(req, res, next) {
        try {

            const { id } = req.params
            const { name } = req.body

            let category = await Category.findByPk(id)
            if (!category) {
                throw { name: 'NotFound', message: `Category with id ${id} not found` }
            }

            await category.update({ name })

            res.status(200).json(category)

        } catch (error) {
            next(error)
        }
    }

    static async deleteCategoryById(req, res, next) {
        try {
            const { id } = req.params

            const category = await Category.findByPk(id)
            if (!category) {
                throw { name: 'NotFound', message: `Category with id ${id} not found` }
            }

            await category.destroy()

            res.status(200).json({ message: 'Category deleted' })
        } catch (error) {
            next(error)
        }
    }

    static async getCategoriesPub(req, res, next) {
        try {

            let data = await Category.findAll()
            res.status(200).json(data)

        } catch (error) {
            next(error)
        }
    }

}

module.exports = CategoryController