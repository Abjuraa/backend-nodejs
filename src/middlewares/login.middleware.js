const { validarToken } = require('../utils/jwt');

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(403).json({ error: 'Error al obtener el token' });

    const token = authHeader.split(' ')[1];

    if (!token) return res.status(403).json({ error: 'token invalido' });

    try {
        const decoded = validarToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Acceso denegado o token invalido' });
    }
}