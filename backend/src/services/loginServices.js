const bcrypt = require('bcryptjs');
const loginRepository = require('../repository/loginRepository');

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

    if (!datos) {
        throw new Error('El usuario no existe')
    }

    const match = await bcrypt.compare(usuario.password, datos.password);
    if (!match) {
        throw new Error('Contraseña incorrecta')
    }

    return {
        message: 'Ingreso exitoso',
        id: datos.id,
        nombre: datos.nombre,
        email: datos.email
    }
}

exports.obtenerUsuarios = async () => {
    const response = await loginRepository.obtenerUsuarios();
    return response;
}