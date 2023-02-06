const router = require("express").Router();
const teacherCtrl = require("../controllers/teacherCtrl");

router.get("/refresh_token",teacherCtrl.refreshToken)
router.post("/teacherLogin",teacherCtrl.teacherLogin)
router.get("/teacherLogout",teacherCtrl.teacherLogout)


module.exports = router;