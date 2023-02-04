const Students = require("../models/studentModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const studentCtrl = {
  studentRegister: async (req, res) => {
    try {
      const { name, email, mobile, grade, password } = req.body;
      if (
        (name === "" || email === "" || mobile === "" || grade === "",
        password === "")
      )
        return res.status(400).json({ msg: "All fields are mandatory" });

      const student = await Students.findOne({ email });
      if (student)
        return res.status(400).json({ msg: "This email already exists" });

      if (mobile.length != 10)
        return res
          .status(400)
          .json({ msg: "Mobile number should have 10 digits" });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Passwords should be atleast 6 characters" });

          //password encryption
          const passwordHash = await bcrypt.hash(password, 12);

          const newStudent=new Students({
            name,
            password:passwordHash,
            email,
            grade,
            mobile
          })

          await newStudent.save()

          //jwt for authentication

          const access_token=createAccessToken({id:newStudent._id})
          const refresh_token=createRefreshToken({id:newStudent._id})

          res
          .cookie("refreshtoken",refresh_token,{
            httpOnly:true,
            path:"/student/refresh_token",
            maxAge:30*24*60*60*1000 //30days
          })
          .json({
            msg:"Student registration successfull!!!",
            access_token,
            student:{
                ...newStudent._doc,
                password:""
            }
          })
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken=(student)=>{
    return jwt.sign(student,process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"1d"
    })
}

const createRefreshToken=(student)=>{
    return jwt.sign(student,process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:"30d"
    })
}

module.exports=studentCtrl
