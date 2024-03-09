import Comment from "../models/comment.model.js"
import { errorHandler } from "../utils/error.utils.js"


export const postComment = async (req,res,next)=>{
    const { content , userId , blogId}=req.body
    try {
       const newcomment = new Comment({
        userId,
        blogId,
        content
       })

       await newcomment.save()
       res.status(200).json(newcomment)
    } catch (error) {
        return next(errorHandler(401,'Error commenting'))
    }
}



export const getcomment = async(req,res,next)=>{
    try {
        const blogId = req.params.id 
        const comments = await Comment.find({blogId: blogId}).sort({createdAt: -1})
        res.status(200).json(comments)
    } catch (error) {
        return next(errorHandler(401,"Error fetching comments"))
    }
}

export const deleteComment = async (req,res,next)=>{
    try {
        const commentId = req.params.id
        const commentDel = await Comment.findByIdAndDelete(commentId)
        res.status(200).send('Deleted successfully')
    } catch (error) {
        return next(errorHandler(401,'error deleting'))
    }
}

export const editcomment=async(req,res,next)=>{
    try {
        const commentId = req.params.id
        const updateComment = await Comment.findByIdAndUpdate(commentId,{
            content: req.body.content
        },{new: true})
        res.status(200).json(updateComment)
    } catch (error) {
        return next(errorHandler(401,'Error updaing comment'))
    }
}