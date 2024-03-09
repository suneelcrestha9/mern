import cloudinary from "../utils/cloudinary.utils.js"
import Post from '../models/post.model.js'
import { errorHandler } from "../utils/error.utils.js"
import User from "../models/user.model.js"

export const createPost = async (req,res,next)=>{
    const {name } = req.body
    const image = req.file

    try {
        const cloudinaryResponse = await cloudinary.uploader.upload(image.path)

        //saving new post
        const newPost = new Post({
            name,
            image: cloudinaryResponse.secure_url
        })

        await newPost.save()
        res.status(200).send("post sucessful")
    } catch (error) {
        next(errorHandler(400,error.message))
    }
}

export const getPost = async (req,res,next)=>{
    try {
        const getData = await Post.find()
        res.status(200).json(getData)
    } catch (error) {
        next(errorHandler(404,error))
    }
}

export const getUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        return next(errorHandler(401, 'Error fetching data'));
    }
};




