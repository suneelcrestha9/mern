import connetcDB from "./src/db/index.js";
import dotenv from 'dotenv'
dotenv.config()
import { app } from "./app.js";
import userRouter from "./src/routes/user.route.js";
import userAuthRouter from "./src/routes/auth.route.js";
import blogRouter from './src/routes/blog.route.js'
import commentRouter from './src/routes/comment.router.js'
import path from 'path'

connetcDB()
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log("Listining in port:",process.env.PORT)
    })
})
.catch((error)=>{
    console.log("Errro",error)
})

const __dirname = path.resolve()
//declaring api and creating post
app.use('/api/v1',userRouter)
app.use('/api/v1',blogRouter)
app.use('/api/v1',commentRouter)

//api for singup , login
app.use('/api/v1',userAuthRouter) //userAuthRouter is the define in the routes in auth.routes.js file

app.use(express.static(path.join(__dirname,'/client/dist')))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

//handeling errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });