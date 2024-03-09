import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createPost, getPost, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verify.utils.js";
import { deleteAccount, userUpdate } from "../controllers/userUpdate.controller.js";


const router = express.Router()

router.post('/post-user',upload.single('image'),createPost)
router.get('/get-post',getPost)
router.put('/user/update/:userId',upload.single('avatar'),userUpdate);
router.delete('/user/delete/:id',deleteAccount);
router.get('/:id',getUser)
// router.post('/user/signout',signOut)

export default router