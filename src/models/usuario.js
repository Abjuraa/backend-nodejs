
module.exports = (queryInterface, sequelize) => {
    const Usuario = queryInterface.define('usuarios', {
        id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: sequelize.STRING,
            allowNull: false
        },
        apellido: {
            type: sequelize.STRING,
            allowNull: false
        },
        email: {
            type: sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })

    return Usuario;
}