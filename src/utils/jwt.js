const jwt = require('jsonwebtoken');
require("dotenv").config();

const generarToken = (payload, expiresIn = "1h") => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

const validarToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generarToken, validarToken }