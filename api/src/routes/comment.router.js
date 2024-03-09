import express from "express";
import { deleteComment, editcomment, getcomment, postComment } from "../controllers/comment.controller.js";

const router = express.Router()

router.post('/create/postcomment',postComment)
router.get('/create/getcomment/:id',getcomment)
router.delete('/deletecomment/:id',deleteComment)
router.put('/editcomment/:id',editcomment)

export default router