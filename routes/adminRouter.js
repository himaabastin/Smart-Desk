const router = require("express").Router();
const adminCtrl = require("../controllers/adminCtrl");
const adminAuth=require('../middleware/adminAuth')
const studentCtrl=require("../controllers/studentCtrl")
const teacherCtrl=require("../controllers/teacherCtrl")
const multer=require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,uniqueSuffix+'_'+file.originalname)
    }
  })

  const upload=multer({storage:storage})




router.post("/adminRegister", adminCtrl.adminRegister);
router.post("/adminLogin", adminCtrl.adminLogin);
router.get("/adminLogout", adminCtrl.adminLogout);
router.get("/refresh_token", adminCtrl.refreshToken);
router.get('/adminInfo',adminAuth,adminCtrl.getAdmin)

//student
router.post("/studentRegister",studentCtrl.studentRegister)
router.get("/allStudentDetails",studentCtrl.allStudentDetails)
router.put("/adminStdUpdate/:stdAdNo",upload.single('avatar'), studentCtrl.adminStdUpdate)

//teacher
router.post("/teacherRegister",teacherCtrl.teacherRegister)
router.get("/allTeacherDetails",teacherCtrl.allTeacherDetails)
router.put("/adminTchrUpdate/:teacherId",teacherCtrl.adminTchrUpdate)


module.exports = router;
