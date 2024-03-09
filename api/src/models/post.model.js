import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Assuming you store the image URL from Cloudinary
    required: true,
  },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;
