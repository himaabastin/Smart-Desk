const mongoose=require('mongoose')

const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
   grade:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    bloodGroup:{
        type:String
    },
    dob:{
        type:String
    },
    address:{
        type:Array
    },
    role:{
        type:String,
        default:"student"
    },
    avatar:{
        type:String,
        default:"https://cdn4.iconfinder.com/data/icons/people-avatar-1-2/512/33-512.png"
    }

},{
    timestamps:true
})

module.exports=mongoose.model('Students',studentSchema)