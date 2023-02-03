const Admins = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminCtrl = {
  adminRegister: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (name === "" || email === "" || password === "")
        return res.status(400).json({ msg: "All fields should be filled" });

      const admin = await Admins.findOne({ email });
      if (admin)
        return res.status(400).json({ msg: "This email already exists" });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password should be atleast 6 characters long" });

      //password encryption
      const passwordHash = await bcrypt.hash(password, 12);
      const newAdmin = new Admins({
        name,
        password: passwordHash,
        email,
      });
      console.log(newAdmin);
      await newAdmin.save();
      //save to mongodb

      //Then jsonwebtoken for authentication

      const access_token = createAccessToken({ id: newAdmin._id });
      const refresh_token = createRefreshToken({ id: newAdmin._id });
      res
        .cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/admin/refresh_token",
          maxAge: 30 * 24 * 60 * 60 * 1000, //30days
        })
        .json({
          msg: "Registered Successfully",
          access_token,
          admin: {
            ...newAdmin._doc,
            password: "",
          },
        });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  adminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email === "" || password === "")
        return res.status(400).json({ msg: "All fields should be filled" });

      const admin = await Admins.findOne({ email });
      if (!admin) return res.status(400).json({ msg: "Admin doesn't exist" });
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

      //if login success create access token and refresh token
      const access_token = createAccessToken({ id: admin._id });
      const refresh_token = createRefreshToken({ id: admin._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/admin/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, //30days
      });

      res.json({ access_token });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  adminLogout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/admin/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: async(req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async(err, admin) => {

        if (err)
          return res.status(400).json({ msg: "Please Login or Register" });
          
          const adminDetails = await Admins.findById(admin.id).select("-password")
        const accesstoken = createAccessToken({ id: admin._id });
        

        res.json({ accesstoken,rf_token,adminDetails });
      });
    
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAdmin: async(req, res) => {
    try {
      const admin = await Admins.findById(req.admin.id).select("-password");
      if (!admin) return res.status(400).json({ msg: "Admin does not exist" });

      res.json(admin);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
}

const createAccessToken = (admin) => {
  return jwt.sign(admin, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (admin) => {
  return jwt.sign(admin, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = adminCtrl;
