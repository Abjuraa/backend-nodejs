const loginServices = require('../services/loginServices');
require("dotenv").config();


exports.registrar = async (req, res, next) => {
    try {
        const usuario = req.body;
        const response = await loginServices.registrar(usuario);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

exports.ingresar = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const response = await loginServices.ingresar({ email, password })

        res.cookie("access_token", response.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60,
            sameSite: "strict"
        })

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

exports.obtenerUsuarios = async (req, res, next) => {
    try {
        const response = await loginServices.obtenerUsuarios();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}