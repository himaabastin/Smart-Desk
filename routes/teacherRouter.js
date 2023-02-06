const router = require("express").Router();
const teacherCtrl = require("../controllers/teacherCtrl");

router.get("/refresh_token",teacherCtrl.refreshToken)


module.exports = router;