const router = require("express").Router();
const adminCtrl = require("../controllers/adminCtrl");
const adminAuth=require('../middleware/adminAuth')
const studentCtrl=require("../controllers/studentCtrl")


router.post("/adminRegister", adminCtrl.adminRegister);
router.post("/adminLogin", adminCtrl.adminLogin);
router.get("/adminLogout", adminCtrl.adminLogout);

router.get("/refresh_token", adminCtrl.refreshToken);
router.get('/adminInfo',adminAuth,adminCtrl.getAdmin)
//student
router.post("/studentRegister",studentCtrl.studentRegister)
router.get("/allStudentDetails",studentCtrl.allStudentDetails)

module.exports = router;
