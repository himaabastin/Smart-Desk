const mongoose=require('mongoose')

const timeTableSchema=new mongoose.Schema({
grade:{
    type:mongoose.Schema.Types.String,
    ref:'Teachers',
    required:true
},
day:{
    type:String,
    required:true
},
   subjects:{
    type:Array,
    required:true
   }

},{
    timestamps:true
})

module.exports=mongoose.model('TimeTables',timeTableSchema)
