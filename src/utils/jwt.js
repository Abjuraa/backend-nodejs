const jwt = require('jsonwebtoken');
const SECRET = 'clavemuysecretamuysecreta'

const generarToken = (payload, expiresIn = "1h") => {
    return jwt.sign(payload, SECRET, { expiresIn });
}

const validarToken = (token) => {
    return jwt.verify(token, SECRET);
}

module.exports = { generarToken, validarToken }