import cloudinary from "../utils/cloudinary.utils.js";
import { errorHandler } from "../utils/error.utils.js"
import Blog from "../models/blog.model.js"

export const uploadBlog = async(req,res,next)=>{
    const { name , category , discription} = req.body
    const userId = req.params.id

    if(!name || !category || !discription || name==' ' || category==' '  || discription==' '){
        return next(errorHandler(401,'All fields are required'))
    }

    let cloudinaryResponse;
    if(req.file){
        try {
            const image = req.file
            cloudinaryResponse = await cloudinary.uploader.upload(image.path)
        } catch (error) {
            return next(errorHandler(401,'Error uploadig to cloudinary'))
        }
    }

    try {
        const newBlog = new Blog({
            userId,
            name,
            category,
            discription,
            image: cloudinaryResponse ? cloudinaryResponse.secure_url : undefined
        })
        await newBlog.save()
        res.status(200).send("Blog upload sucessful")
    } catch (error) {
       return next(errorHandler(401,'Error uploadin blog')) 
    }

}




export const getBlog = async (req, res, next) => {
    try {
        const userId = req.params.id; // Use the correct parameter name
        const blogId = req.query.id; // Use req.query.id to capture the query parameter

        if (userId) {
            // If userId is provided, fetch blogs for that specific user
            const getData = await Blog.find({ userId: userId });

            if (getData.length > 0) {
                res.status(200).json(getData);
            } else {
                res.status(404).json({ message: 'No blogs found for the specified user ID' });
            }
        } else if (blogId) {
            // If blogId is provided, fetch a specific blog
            const updateData = await Blog.findById(blogId);

            if (updateData) {
                res.status(200).json(updateData);
            } else {
                res.status(404).json({ message: 'No blog found for the specified ID' });
            }
        } else {
            // If no userId is provided, fetch all blogs (remove the userId filter)
            const getAllBlogs = await Blog.find();

            if (getAllBlogs.length > 0) {
                res.status(200).json(getAllBlogs);
            } else {
                res.status(404).json({ message: 'No blogs found' });
            }
        }
    } catch (error) {
        next(errorHandler(404, error));
    }
};

export const updateBlog = async (req, res, next) => {
    const blogId = req.params.id;
    let cloudinaryResponse;
    if(req.file){
        const updateImage = req.file
        try {
             cloudinaryResponse = await cloudinary.uploader.upload(updateImage.path)
        } catch (error) {
            return next(errorHandler(401,'error uploading to cloudinary'))
        }
    }
    
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(blogId,{
            $set:{
                name:req.body.name,
                category:req.body.category,
                discription:req.body.discription,
                image:cloudinaryResponse ? cloudinaryResponse.secure_url : undefined
            }
        },{new : true})
        res.status(200).json(updatedBlog)
    } catch (error) {
        return next(errorHandler(401,'Error updating'))
    }
};


export const deleteBlog = async ( req ,res ,next)=>{
    try {
        const blogId = req.params.id
        const deleteBlog = await Blog.findByIdAndDelete(blogId)
        res.status(200).json({message:"Blog deleted"})
    } catch (error) {
        return next(errorHandler(401,'Error deleting blog'))
    }
    
}


export const getAllBlogs = async(req,res,next)=>{
    const searchTerm = req.query.q
    try {
        const result = await Blog.find({
            $or: [
              { name: { $regex: searchTerm, $options: 'i' } },
              { body: { $regex: searchTerm, $options: 'i' } },
              { category: { $regex: searchTerm, $options: 'i' } },
              { discription: { $regex: searchTerm, $options: 'i' } }
            ]
          });
          res.status(200).json(result)
    } catch (error) {
        return next(errorHandler(401,"error fetchingdata"))
    }
}