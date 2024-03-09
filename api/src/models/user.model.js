import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        required: true,
        default: "https://imgs.search.brave.com/jvi9lbV-oDo2K75wOghHSKsYLq6W8rbwr1_IsGZPztw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4y/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvZS1jb21tZXJj/ZS1saW5lLTQtMS8x/MDI0L3VzZXI0LTY0/LnBuZw"
    }
},{timestamps: true})

const User = mongoose.model("User",userSchema)
export default User