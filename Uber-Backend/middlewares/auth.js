const BlacklistToken = require("../models/blacklistToken.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");



module.exports.authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const isblacklisted = await BlacklistToken.findOne({ token })
        if (isblacklisted) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedUser.id)

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}