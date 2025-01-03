const Captain = require("../models/captain.model");
const { validationResult } = require('express-validator');
const captainservice = require('../services/captain.service');
const BlacklistToken = require("../models/blacklistToken.model");

module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        fullname,
        email,
        password,
        vehicle,
    } = req.body;

    const isCaptainAlreadyExist = await Captain.findOne({ email });
    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exist' });
    }

    const hashedPassword = await Captain.hashPassword(password);
    const captain = await captainservice.registerCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    })
    const token = await captain.generateAuthToken();

    res.status(201).json({ captain, token });
}

module.exports.loginCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const captain = await Captain.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(400).json({ message: 'Captain not found' });
        }
        const isPasswordMatch = await captain.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const token = await captain.generateAuthToken();
        res.cookie('token', token);
        
        res.status(200).json({ captain, token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getCaptainProfile = async (req, res) => {
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await BlacklistToken.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successfully' });
}