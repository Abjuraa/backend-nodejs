const bcrypt = require('bcryptjs');
const loginRepository = require('../repository/loginRepository');
const { generarToken } = require('../utils/jwt');

//Service para la logica de negocio al registrar un usuario
exports.registrar = async (usuario) => {
    const verificarEmail = await loginRepository.verificarEmail(usuario.email);

    if (verificarEmail) {
        throw new Error('El usuario con el correo ingresado ya existe')
    }

    if (usuario.password.length < 8) {
        throw new Error('La contraseña debe tener al menos 8 caracteres')
    }

    await loginRepository.registrar(usuario);

    return { message: 'Registro exitoso' }
}

//Service para la logica de negocio al ingresar
exports.ingresar = async (usuario) => {
    const datos = await loginRepository.ingresar(usuario);

    if (!datos) {
        throw new Error('El usuario no existe')
    }

    const match = await bcrypt.compare(usuario.password, datos.password);
    if (!match) {
        throw new Error('Contraseña incorrecta')
    }

    const token = generarToken({ id: datos.id, email: datos.email, nombre: datos.nombre, apellido: datos.apellido });


    return {
        message: 'Ingreso exitoso',
        nombre: datos.nombre,
        apellido: datos.apellido,
        email: datos.email,
        token
    }
}

//Service para la logica de negocio al obtener los usuarios
exports.obtenerUsuarios = async () => {
    const response = await loginRepository.obtenerUsuarios();
    return { message: 'Usuarios obtenidos exitosamente', count: response.length + " usuarios obtenidos", data: response }
}