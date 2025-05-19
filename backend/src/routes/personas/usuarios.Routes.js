const express = require('express');
const router = express.Router();
const loginController = require('../../controller/loginController');
const authMiddleware = require('../../middlewares/login.middleware');


router.get('/', authMiddleware, async (req, res) => {
    try {
        const response = await loginController.obtenerUsuarios();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

router.post('/ingresar', loginController.ingresar);

router.post('/registrar', loginController.registrar);

module.exports = router;