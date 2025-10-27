const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if(!token) {
        return res.status(401).json({ message: "Accès refusé"});
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decodedToken.userId;
        next();
    } catch(e) {
        res.status(401).json({ message: "Invalid token"});
    }
}