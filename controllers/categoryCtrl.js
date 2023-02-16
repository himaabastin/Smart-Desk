const Category=require("../models/categoryModel")

const categoryCtrl={
getCategories:async(req,res)=>{
try {
    const categories=await Category.find()
    res.json(categories)
} catch (err) {
    res.status(500).json({msg:err.message})
}
},
createCategory:async(req,res)=>{
try {
    const {name}=req.body
    const category=await Category.findOne({name})

    if(category) return res.status(400).json({msg:"This category already exist"})
    const newCategory=new Category({name})
await newCategory.save()
    res.json({msg:`category ${newCategory.name}  created`})
} catch (err) {
    res.status(500).json({msg:err.message})
    
}
},
deleteCategory:async(req,res)=>{
try {
    
} catch (err) {
    
}
}
}

module.exports=categoryCtrl