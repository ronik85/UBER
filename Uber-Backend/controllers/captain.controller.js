const Captain = require("../models/captain.model");
const { validationResult } = require('express-validator');
const captainservice = require('../services/captain.service');

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