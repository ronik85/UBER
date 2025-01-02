const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const userService = require("../services/user.service");
const BlacklistToken = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password } = req.body;

  const isUserAlreadyExist = await User.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(400).json({ message: 'User already exist' });
  }

  const hashedPassword = await User.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });
  const token = await user.generateAuthToken();

  res.status(201).json({ token, user });

};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(400).json({ message: 'Invalid Email of Password' });
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: 'Invalid Email of Password' });
  }

  const token = await user.generateAuthToken();
  res.cookie('token', token);

  return res.status(200).json({ token, user });

}

module.exports.getUserProfile = async (req, res, next) => {
  const user = req.user;
  return res.status(200).json(user);
}
module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];
  await BlacklistToken.create({ token });
  return res.status(200).json({ message: 'Logout successfully' });
}