const router=require('express').Router()
const {cloudinary}=require("../utilis/cloudinary")
const {CloudinaryStorage} =require("multer-storage-cloudinary")
const auth=require("../middleware/auth")
const authAdmin=require("../middleware/authAdmin")
const fs=require('fs')
const multer=require('multer');

//multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'my-folder-name',
    allowedFormats: ['jpg', 'png'],
    // transformation: [{ width: 500, height: 500, crop: 'limit' }],
  });

  const upload=multer({storage:storage})
//upload image

router.post("/upload",upload.single("file"),authAdmin,(req,res)=>{
    try {
        console.log(req.file);
        if(!req.files || Object.keys(req.files).length === 0)
        return res.status(400).json({msg:'No files were uploaded'})

        const file=req.files.file
            if(file.size > 1024*1024) {
                removeTmp(file.tempFilePath)
                return res.status(400).json({msg:"File size large"})}
            if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
                removeTmp(file.tempFilePath)

            return res.status(400).json({msg:"File format is incorrect"})}

            cloudinary.uploader.upload(file.tempFilePath,{folder:"test"},async(err,result)=>{
                if(err) throw err
                removeTmp(file.tempFilePath)

                res.json({public_id:result.public_id,url:result.secure_url})
            })
        // res.json('test upload')
    } catch (err) {
        res.status(500).json({msg:err.message})
    }
})

router.post('/destroy',authAdmin,(req,res)=>{
    try {
const{public_id}=req.body
      if(!public_id) return res.status(400).json({msg:"No images Selected"})
      cloudinary.uploader.destroy(public_id,async(err,result)=>{
        if(err) throw err
        res.json({msg:"Deleted Image"})
      })
    } catch (err) {
       return res.status(500).json({msg:err.message})
    }
})

const removeTmp=(path)=>{
fs.unlink(path,err=>{
    if(err) throw err
})
}
module.exports=router