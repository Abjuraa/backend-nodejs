const express = require('express');
const cors = require('cors');

const createApp = () => { 
    const app = express();

    app.use(cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));


    app.get('/', (req, res) => { 
        res.send('Hello World!');
    })

    return app;
}

module.exports = createApp;