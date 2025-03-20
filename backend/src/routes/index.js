const express = require('express');

const usuariosRoutes = require('./personas')

const router = express.Router();

router.use('/personas', usuariosRoutes);

module.exports = router;