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
    const data = await loginRepository.ingresar(usuario);

    if (!data) {
        throw new Error('El usuario no existe')
    }

    const compare_password = await bcrypt.compare(usuario.password, data.password);
    if (!compare_password) {
        throw new Error('Contraseña incorrecta')
    }

    const token = generarToken({
        id: data.id,
        email: data.email
    })


    return {
        message: 'Ingreso exitoso',
        email: data.email,
        token
    }
}

//Service para la logica de negocio al obtener los usuarios
exports.obtenerUsuarios = async () => {
    const response = await loginRepository.obtenerUsuarios();
    return { message: 'Usuarios obtenidos exitosamente', count: response.length + " usuarios obtenidos", data: response }
}