import express from "express";
import { login, oauth, signup } from "../controllers/auth.controller.js";

const router = express.Router()

router.post('/user/singup',signup)
router.post('/user/login',login)
router.post('/user/google',oauth)


export default router