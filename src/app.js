const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const cookieParser = require("cookie-parser")

const createApp = () => {
    const app = express();

    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use('/api', routes);

    app.get('/', (req, res) => {
        res.send('Hola mundo, el servidor esta corriendo');
    })

    return app;
}

module.exports = createApp;