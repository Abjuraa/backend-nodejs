const express = require('express');
const router = express.Router();
const loginController = require('../../controller/loginController');


router.get('/', loginController.obtenerUsuarios);

router.post('/ingresar', loginController.ingresar);

router.post('/registrar', loginController.registrar); 

module.exports = router;