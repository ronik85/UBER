const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const User = require("../models/user.model");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth");
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Email is not valid"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage("firstname must be 3 character long"),
    body("password").isLength({ min: 6 }).withMessage("Password must be 6 character long"),
  ],
  userController.registerUser
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 character long')
  ],
  userController.loginUser
);

router.get('/profile', authMiddleware.authUser, userController.getUserProfile);
router.get('/logout', authMiddleware.authUser, userController.logoutUser);

module.exports = router;
