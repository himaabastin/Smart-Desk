const mongoose=require('mongoose')

const adminSchema=new mongoose.Schema({
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
mobile:{
    type:Number,
    default:''
},
role:{
    type:String,
    default:"admin"
},
avatar:{
    type:String,
    default:"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg"
}
},{
    timestamps:true
})

module.exports=mongoose.model('Admins',adminSchema)