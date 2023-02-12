const Teachers = require("../models/teacherModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const teacherCtrl={
    teacherRegister: async (req, res) => {
        try {
          const { teacherId,name, email, password } = req.body;
          if (teacherId==="" ||name === "" || email === "" || password === "")
            return res.status(400).json({ msg: "All fields should be filled" });
    
          const teacher = await Teachers.findOne({ email });
          if (teacher)
            return res.status(400).json({ msg: "This email already exists" });
    
          if (password.length < 6)
            return res
              .status(400)
              .json({ msg: "Password should be atleast 6 characters long" });
          
          //password encryption
          const passwordHash = await bcrypt.hash(password, 12);
          
          const newTeacher = new Teachers({
            teacherId,
            name,
            password: passwordHash,
            email,
          });
          // res.json(newTeacher)
          await newTeacher.save();
          //save to mongodb
    
          //Then jsonwebtoken for authentication
    
          // const access_token = createAccessToken({ id: newTeacher._id });
          // const refresh_token = createRefreshToken({ id: newTeacher._id });
          // res
          //   .cookie("refreshtoken", refresh_token, {
          //     httpOnly: true,
          //     path: "/teacher/refresh_token",
          //     maxAge: 30 * 24 * 60 * 60 * 1000, //30days
          //   })
          //   .json({
          //     msg: "Registered Successfully",
          //     access_token,
          //     teacher: {
          //       ...newTeacher._doc,
          //       password: "",
          //     },
          //   });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
      refreshToken: async(req, res) => {
        try {
          const rf_token = req.cookies.refreshtoken;
          if (!rf_token)
            return res.status(400).json({ msg: "Please Login or Register" });
          jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async(err, teacher) => {
    
            if (err)
              return res.status(400).json({ msg: "Please Login or Register" });
              
              const teacherDetails = await Teachers.findById(teacher.id).select("-password")
            const accesstoken = createAccessToken({ id: teacher._id });
            
    
            res.json({ accesstoken,rf_token,teacherDetails });
          });
        
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
      allTeacherDetails: async (req, res) => {
        try {
          const allTeacherDetails = await Teachers.find().select("-password");
          res.json({allTeacherDetails});
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
      teacherLogin:async(req,res)=>{
        try {
          const { email, password } = req.body;
          if (email === "" || password === "")
            return res.status(400).json({ msg: "All fields should be filled" });
    
          const teacher = await Teachers.findOne({ email });
          if (!teacher) return res.status(400).json({ msg: "Teacher doesn't exist" });
          // res.json({password,student});
          const isMatch = await bcrypt.compare(password, teacher.password);
          if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });
    
          //if login success create access token and refresh token
          const access_token = createAccessToken({ id: teacher._id });
          const refresh_token = createRefreshToken({ id: teacher._id });
          res.cookie("refreshtoken", refresh_token, {
            httpOnly: true,
            path: "/teacher/refresh_token",
            maxAge: 30 * 24 * 60 * 60 * 1000, //30days
          });
    
          res.json({ access_token });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
      teacherLogout:async(req,res)=>{
        try {
          res.clearCookie("refreshtoken",{path:"/teacher/refresh_token"})
          return res.json({msg:"Teacher Logged out"})
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
      adminTchrUpdate:async(req,res)=>{
        try {
          let avatar=(req.file) ? req.file.filename :  null
          const{name,email,subject,grade,mobile}=req.body
    
          await Teachers.findOneAndUpdate({teacherId:req.params.teacherId},{
            name,email,subject,grade,mobile,avatar
          })
          res.json({msg:"teacher updated"})
          
        } catch (err) {
          res.status(500).json({msg:err.message})
        }
      }
}
const createAccessToken = (teacher) => {
    return jwt.sign(teacher, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
  };
  
  const createRefreshToken = (teacher) => {
    return jwt.sign(teacher, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "30d",
    });
  };
module.exports = teacherCtrl;