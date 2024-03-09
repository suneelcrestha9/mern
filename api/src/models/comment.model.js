import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId : {
        type: String,
        required: true
    },
    blogId : {
        type: String,
        required: true
    },
    content : {
        type: String,
        required: true
    },
    like : {
        type: Array,
        default:[]
    },
    numberOfLikes:{
        type: Number,
        default: 0
    }
},{timestamps: true})

const Comment = mongoose.model('Comment',commentSchema)
export default Comment