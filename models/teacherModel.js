const mongoose=require('mongoose')

const teacherSchema=new mongoose.Schema({
    teacherId:{
        type:String,
        unique:true,
        trim:true,
        required:true
       },
name:{
    type:String,
    required:true,
    trim:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
subject:{
    type:String
},
grade:{
type:String
},
mobile:{
    type:Number,
    default:''
},
role:{
    type:String,
    default:"teacher"
},
avatar:{
    type:String,
    default:"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg"
}
},{
    timestamps:true
})

module.exports=mongoose.model('Teachers',teacherSchema)