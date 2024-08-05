'use strict'

const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config();
require('./connection/connection.js');

const apiRoute = require('./routes/api.js');

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/').get((req, res) => {
    res.sendFile(process.cwd() + '/views/index.html');
});

apiRoute(app);

app.use((req, res) => {
    res.status(404).type('text').send('Not Found');
});

const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT || 3030, () => {
    console.log("Listening on port " + process.env.PORT);
    if (process.env.NODE_ENV==="test") {
        console.log('Running tests...');
        setTimeout(() => {
            try {
                runner.run();
            } catch (e) {
                let error = e;
                console.log('Tests are not valid...');
                console.log(error);
            }
        }, 3500);
    }
});

module.exports = app;