const router = require("express").Router();
const teacherCtrl = require("../controllers/teacherCtrl");
const authTeacher=require("../middleware/authTeacher")
router.get("/refresh_token",teacherCtrl.refreshToken)
router.post("/teacherLogin",teacherCtrl.teacherLogin)
router.get("/teacherLogout",teacherCtrl.teacherLogout)
router.post("/timeTableAdd",teacherCtrl.timeTableAdd)
router.get("/getTimeTable/:teacherId",teacherCtrl.getTimetable)

module.exports = router;