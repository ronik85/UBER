const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");

router.post(
    "/register",
    [
        body('email').isEmail().withMessage('Email is not valid'),
        body('fullname.firstname').isLength({ min: 3 }).withMessage('firstname must be 3 character long'),
        body('password').isLength({ min: 6 }).withMessage('Password must be 6 character long'),
        body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be 3 character long'),
        body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be 3 character long'),
        body('vehicle.capacity').isInt().withMessage('Capacity must be a number'),
        body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type must be car, motorcycle or auto'),
    ],
    captainController.registerCaptain
);


module.exports = router;