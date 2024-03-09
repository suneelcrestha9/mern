import mongoose from "mongoose";

const connetcDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB connected Host!! ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection error",error)
        process.exit(1)
    }
}

export default connetcDB