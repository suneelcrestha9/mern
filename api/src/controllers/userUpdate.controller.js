import { errorHandler } from "../utils/error.utils.js"
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import cloudinary from "../utils/cloudinary.utils.js"

export const userUpdate = async (req,res,next)=>{

    
    let cloudinaryResponse;
    if(req.file){
        const updateImage = req.file
        try {
             cloudinaryResponse = await cloudinary.uploader.upload(updateImage.path)
        } catch (error) {
            return next(errorHandler(401,'error uploading to cloudinary'))
        }
    }

    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorHandler(403,'Password shoudl contains at least 6 characters'))
        }
        req.body.password = bcryptjs.hashSync(req.body.password,10)
    }

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                fullName: req.body.fullName,
                email : req.body.email,
                password: req.body.password,
                avatar:cloudinaryResponse ? cloudinaryResponse.secure_url : undefined
            }
        },{new: true})
        const {password,...rest}=updateUser._doc
        res.status(200).json(rest)
    } catch (error) {
        return next(errorHandler(404,error))
    }
}



export const deleteAccount = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return next(errorHandler(404, 'User not found'));
      }
      res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  };
  
  

// export const signOut = async (req,res,next)=>{
//     try {
//         req
//         .clearCookie('access_token')
//         .status(200)
//         .send('User signout successsful')
//     } catch (error) {
//         return next(errorHandler(401,'Error signing out'))
//     }
// }
