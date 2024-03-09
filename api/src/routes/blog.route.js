import express from 'express'
import { upload } from '../middlewares/multer.middleware.js'
import { deleteBlog, getAllBlogs, getBlog, updateBlog, uploadBlog } from '../controllers/blog.controller.js'

const router = express.Router()

router.post('/user/postblog/:id',upload.single('image'),uploadBlog)
router.put('/user/updateblog/:id',upload.single('image'),updateBlog)
router.get('/user/getblog/:id?',getBlog)
router.delete('/blog/delete/:id',deleteBlog)
router.get('/user/getallblogs',getAllBlogs)

export default router