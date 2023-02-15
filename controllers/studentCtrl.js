const Students = require("../models/studentModel");
const VerificationToken = require("../models/verificationToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  generateOTP,
  mailTransport,
  generateEmailTemplate,
  plainEmailTemplate,
} = require("../utilis/mail");
const { isValidObjectId } = require("mongoose");

const studentCtrl = {
  studentRegister: async (req, res) => {
    try {
      const { stdAdNo, name, email, mobile, grade, password } = req.body;
      if (
        (stdAdNo === "" ||
          name === "" ||
          email === "" ||
          mobile === "" ||
          grade === "",
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
      if (grade === "")
        return res.status(400).json({ msg: "Grade is mandatory" });
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Passwords should be atleast 6 characters" });

      //password encryption
      const passwordHash = await bcrypt.hash(password, 12);

      const newStudent = new Students({
        stdAdNo,
        name,
        password: passwordHash,
        email,
        grade,
        mobile,
      });

      //otp
      const OTP = generateOTP();
      const verificationToken = new VerificationToken({
        owner: newStudent._id,
        token: OTP,
      });

      await verificationToken.save();
      await newStudent.save();

      mailTransport().sendMail({
        from: "himabastin0506@gmail.com",
        to: newStudent.email,
        subject: "Verify your email",
        html: generateEmailTemplate(OTP),
      });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },
  allStudentDetails: async (req, res) => {
    try {
      const allStudentDetails = await Students.find().select("-password");
      res.json({ allStudentDetails });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  studentLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email === "" || password === "")
        return res.status(400).json({ msg: "All fields should be filled" });

      const student = await Students.findOne({ email });
      if (!student)
        return res.status(400).json({ msg: "Student doesn't exist" });
       if(student.isBlocked)  return res.status(400).json({ msg: "Sorry you are restricted" });
        // if(student.verified === false) return res.status(400).json({ msg: "Email is not verified" });
      // res.json({password,student});
      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

      //if login success create access token and refresh token
      const access_token = createAccessToken({ id: student._id });
      const refresh_token = createRefreshToken({ id: student._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/student/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, //30days
      });

      res.json({ access_token });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  studentLogout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/student/refresh_token" });
      return res.json({ msg: "Studen Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });
      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, student) => {
          if (err)
            return res.status(400).json({ msg: "Please Login or Register" });

          const studentDetails = await Students.findById(student.id).select(
            "-password"
          );
          const accesstoken = createAccessToken({ id: student._id });

          res.json({ accesstoken, rf_token, studentDetails });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  adminStdUpdate: async (req, res) => {
    try {
      // console.log(req.file);
      let avatar = req.file ? req.file.filename : null;
      const { name, email, grade, bloodGroup, mobile, dob, address } = req.body;

      await Students.findOneAndUpdate(
        { stdAdNo: req.params.stdAdNo },
        {
          name,
          email,
          grade,
          bloodGroup,
          mobile,
          dob,
          address,
          avatar,
        }
      );
      res.json({ msg: "Student updated" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  verifyEmail: async (req, res) => {
    const { studentId, otp } = req.body;

    if (!studentId || !otp.trim())
      return res
        .status(400)
        .json({ msg: "Invalid request,missing parameters!" });
    if (!isValidObjectId(studentId))
      return res.status(400).json({ msg: "Invalid student id" });

    const student = await Students.findById(studentId);

    if (!student)
      return res.status(400).json({ msg: "Sorry,student not found" });
    if (student.verified)
      return res.status(400).json({ msg: "This student is already verified!" });

    const token = await VerificationToken.findOne({ owner: student._id });
    if (!token)
      return res.status(400).json({ msg: "Sorry,student not found!" });

    const isMatched = await token.compareToken(otp);
    if (!isMatched)
      return res.status(400).json({ msg: "Please provide a valid token!" });

    student.verified = true;
    await VerificationToken.findByIdAndDelete(token._id);

    await student.save();

    mailTransport().sendMail({
      from: "emailverfication@email.com",
      to: student.email,
      subject: "Confirmation",
      html: plainEmailTemplate(
        "Email Verfied Successfully",
        "Thanks for connecting with us"
      ),
    });
    res.json({msg:"Student Email is Verified!"})
  },
  adminBlockStd:async(req,res)=>{
    await Students.findOneAndUpdate({stdAdNo: req.params.stdAdNo},{isBlocked:true})
    res.json({ msg: "Student Blocked" });
  },
  studentSingleDetails:async(req,res)=>{
    const stdDetail=await Students.findOne({stdAdNo:req.params.stdAdNo})
    res.json(stdDetail)
  }
};

const createAccessToken = (student) => {
  return jwt.sign(student, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (student) => {
  return jwt.sign(student, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = studentCtrl;
