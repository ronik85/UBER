const Captain = require("../models/captain.model");

module.exports.registerCaptain = async ({
    firstname,
    lastname,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType,
}) => {
    try {
        if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
            throw new Error('All fields are required');
        }
        const captain = await Captain.create({
            fullname: {
                firstname,
                lastname,
            },
            email,
            password,
            vehicle: {
                color,
                plate,
                capacity,
                vehicleType,
            },
        });
        return captain;
    } catch (error) {
        throw new Error(error.message);
    } s
};
