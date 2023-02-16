const Admins=require("../models/adminModel")

const authAdmin=async(req,res,next)=>{
    try{
        const admin=await Admins.findOne({
            _id:req.admin.id
        })
        if(admin.role !== "admin"){
            return res.status(400).json({msg:"Admin Resources access denied"})
        }
        next()
    }catch(err){
        return res.status(500).json({msg:err.message})

    }
}

module.exports=authAdmin