const router = require("express").Router();
const studentCtrl = require("../controllers/studentCtrl");

router.post("/studentLogin",studentCtrl.studentLogin)
router.get("/studentLogout",studentCtrl.studentLogout)
router.get("/refresh_token",studentCtrl.refreshToken)





module.exports = router;