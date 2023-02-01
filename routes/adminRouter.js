const router = require("express").Router();
const adminCtrl = require("../controllers/adminCtrl");
const adminAuth=require('../middleware/adminAuth')

router.post("/adminRegister", adminCtrl.adminRegister);
router.post("/adminLogin", adminCtrl.adminLogin);
router.get("/adminLogout", adminCtrl.adminLogout);

router.get("/refresh_token", adminCtrl.refreshToken);
router.get('/adminInfo',adminAuth,adminCtrl.getAdmin)

module.exports = router;
