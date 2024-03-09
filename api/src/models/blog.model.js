import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    name:{
        type: String,
        reuired: true
    },
    category:{
        type: String,
        reuired: true
    },
    discription:{
        type: String,
        reuired: true
    },
    image:{
        type: String,
        default:"https://imgs.search.brave.com/jXn4GDPL29rYEFd0t2w8pUFDMHkLKret19liercKi4c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wbHVz/LnVuc3BsYXNoLmNv/bS9wcmVtaXVtX3Bo/b3RvLTE2NjY5NjMz/MjM3MzYtNWVlMWMx/NmVmMTlkP3E9ODAm/dz0xMDAwJmF1dG89/Zm9ybWF0JmZpdD1j/cm9wJml4bGliPXJi/LTQuMC4zJml4aWQ9/TTN3eE1qQTNmREI4/TUh4elpXRnlZMmg4/Tlh4OGJtRjBkWEpo/Ykh4bGJud3dmSHd3/Zkh4OE1BPT0"
    }
},{timestamps: true})

const Blog = mongoose.model('Blog',blogSchema)
export default Blog