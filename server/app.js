if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const multer = require('multer')
const app = express()

const PostController = require('./controller/postController')
const CategoryController = require('./controller/categoryController')
const UserController = require('./controller/userController')
const authentication = require('./middleware/authentication')
const adminOnly = require('./middleware/adminOnly')
const errorHandler = require('./middleware/errorHandling')
const accessStaff = require('./middleware/accessStaff')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// CORS configuration for Vercel frontend
const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'https://bloggerku.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With']
}
app.use(cors(corsOptions))

//USERS ENDPOINTS
app.post('/login', UserController.login)
app.post('/add-user', authentication, adminOnly, UserController.addUser)

//POSTS PUBLIC ENDPOINTS
app.get('/pub/categories', CategoryController.getCategoriesPub)
app.get('/pub/posts', PostController.listPostPublic)
app.get('/pub/posts/:id', PostController.listPostPublicById)


//POSTS ENDPOINTS
const postRouter = express.Router()
postRouter.use(authentication)
postRouter.post('/', PostController.createPost)
postRouter.get('/', PostController.listPost)
postRouter.get('/:id', PostController.getPostById)
postRouter.put('/:id', accessStaff, PostController.updatePostById)
postRouter.delete('/:id', accessStaff, PostController.deletePostById)

const upload = multer({ storage: multer.memoryStorage() })
app.patch('/posts/:id/cover-url', authentication, accessStaff, upload.single('coverImage'), PostController.updatePostCoverById)

//CATEGORIES ENDPOINTS
const categoriesRouter = express.Router()
categoriesRouter.use(authentication)
categoriesRouter.post('/', CategoryController.createCategory)
categoriesRouter.get('/', CategoryController.getCategories)
categoriesRouter.delete('/:id', CategoryController.deleteCategoryById)
categoriesRouter.put('/:id', CategoryController.updateCategoryById)

app.use('/posts', postRouter)
app.use('/categories', categoriesRouter)

app.use(errorHandler)

module.exports = app