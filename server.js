require('dotenv').config()

const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const fileUpload=require('express-fileupload')
const cookieParser=require('cookie-parser')

const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles:true
}))
//Routes
app.use('/admin',require('./routes/adminRouter'))

//connect to mongodb
const URI=process.env.MONGODB_URL
mongoose.connect(URI,err=>{
if(err) throw err
console.log("connected to mongodb");
})

 
const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log("server connected to port",port);
})