const createApp = require('./src/app');
const pool = require('./src/config/db');
const port = 8080;

const startServer = async () => {
    try {
        await pool;
        const app = createApp();

        app.listen(port, () => {
            console.log(`Servidor ejecutandose en el puerto ${port}`);
        })
    } catch (error) {
        console.log("Error al iniciar servidor: ", error);
        process.exit(1);
    }
}

startServer();