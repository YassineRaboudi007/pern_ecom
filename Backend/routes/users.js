const router = require("express").Router();
const UserController = require("../controller/user.controller");

router.post("/signup", UserController.signup);
router.post("/signin");

module.exports = router;
