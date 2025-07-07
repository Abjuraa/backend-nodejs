const express = require('express');
const router = express.Router();
const loginController = require('../../controller/loginController');
const authMiddleware = require('../../middlewares/login.middleware');


router.get("/", authMiddleware, loginController.obtenerUsuarios);

router.post('/ingresar', loginController.ingresar);

router.post('/registrar', loginController.registrar);

module.exports = router;