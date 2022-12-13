const { Router } = require("express");
const {
  httpSignupUser,
  httpLoginUser,
} = require("../controllers/auth.controller");
const catchAsync = require("../services/catchAsync");

const router = Router();

router.route("/signup").post(catchAsync(httpSignupUser));
router.route("/login").post(catchAsync(httpLoginUser));

module.exports = router;
