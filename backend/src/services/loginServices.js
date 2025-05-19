const bcrypt = require('bcryptjs');
const loginRepository = require('../repository/loginRepository');
const { generarToken } = require('../utils/jwt');

exports.registrar = async (usuario) => {
    const response = await loginRepository.registrar(usuario);

    if (usuario.password.length < 8) {
        throw new Error('La contraseña debe tener al menos 8 caracteres')
    } else {
        return response
    }
}

exports.ingresar = async (usuario) => {
    const datos = await loginRepository.ingresar(usuario);
    console.log(datos);

    if (!datos) {
        throw new Error('El usuario no existe')
    }

    const match = await bcrypt.compare(usuario.password, datos.password);
    if (!match) {
        throw new Error('Contraseña incorrecta')
    }

    const token = generarToken({ id: datos.id});


    return {
        message: 'Ingreso exitoso',
        nombre: datos.nombre,
        apellido: datos.apellido,
        email: datos.email,
        token
    }
}

exports.obtenerUsuarios = async () => {
    const response = await loginRepository.obtenerUsuarios();
    return response;
}