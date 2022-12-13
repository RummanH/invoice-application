const User = require("../models/user.model");

async function httpSignupUser(req, res, next) {
  const { name, email, password, passwordConfirm } = req.body;

  if (!name || !email || !password || !passwordConfirm) {
    return res
      .status(400)
      .json({ status: "fail", message: "Please provide all values" });
  }
  const user = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });
  const token = await user.createJWT();
  user.password = undefined;
  return res.status(201).json({ status: "success", token, data: { user } });
}

async function httpLoginUser(req, res, next) {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "fail", message: "Please provide all values" });
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res
      .status(400)
      .json({ status: "fail", message: "incorrect email or password" });
  }

  const token = await user.createJWT();
  user.password = undefined;
  return res.status(200).json({ status: "success", token, data: { user } });
}

module.exports = { httpSignupUser, httpLoginUser };
