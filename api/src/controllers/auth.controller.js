import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.utils.js";
import jwt from "jsonwebtoken";

//for singin
export const signup = async (req ,res,next)=>{
    const { fullName , email , password }= req.body;

    if(!fullName || !email || !password ||fullName === ' ' ||email === ' ' ||password === ' '){
        return next(errorHandler(404,"All fields are required"))
    }

    const hashedPassword = bcryptjs.hashSync(password,10)

    const newUser = new User({
        email,
        fullName,
        password: hashedPassword,
    })

    try {
        await newUser.save()
        res.status(200).send("Sign up success")
    } catch (error) {
      return next(errorHandler(500,error.message))
    }
}




//for login
export const login = async (req,res,next)=>{

    //getting email and password from the frontend
    const { email , password} = req.body;

    if(!email || !password || email === ' ' || password === ' '){
       return next(errorHandler(404,"All Fields are required"))
    }

    try {
        //checking user
        const validUser =await User.findOne({email})
            if(!validUser){
               return next(errorHandler(404),"User not found")
        }
        //validating password
        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if(!validPassword){
           return next(errorHandler(404,"Incorrect password"))
        }
        const token = jwt.sign(
            { id: validUser._id },
            process.env.JWT_SECRET_KEY
          );
      
          const { password: pass, ...rest } = validUser._doc;
      
          res
            .status(200)
            .cookie('access_token', token, {
              httpOnly: true,
            })
            .json(rest);

    } catch (error) {
       return next(errorHandler(500,error.message))
    }

}


export const oauth = async ( req,res,next)=>{
    const {email , fullName , avatar}=req.body;

    try {

        const user = await User.findOne({email})
        if(user){
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET_KEY
              );
          
              const { password: pass, ...rest } = user._doc;
          
              res
                .status(200)
                .cookie('access_token', token, {
                  httpOnly: true,
                })
                .json(rest);
        }else{
            const generatedPassword = fullName + Math.random().toString(9).slice(-4)
            const hashedPassword = bcryptjs.hashSync(generatedPassword,10)

            const newUser = new User({
                email,
                fullName,
                password: hashedPassword,
                avatar
            })
            await newUser.save()
            const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET_KEY)
            const {password:pass,...rest}=newUser._doc

            res.status(200).cookie('access_token',token,{
                httpOnly: true
            }).json(rest)
        }
    } catch (error) {
        return next(errorHandler(500,error.message))
    }

}