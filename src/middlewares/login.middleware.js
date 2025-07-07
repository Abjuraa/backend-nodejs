const { verificarToken } = require('../utils/jwt');
module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('')[1];

    if (!token) {
        return res.status(403).json({ error: 'Token requerido' });
    }

    try {
        const decoded = verificarToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Acceso denegado o token invalido' });
    }
}