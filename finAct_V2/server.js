'use strict'
require('dotenv').config();
const express = require('express');
const session = require('express-session');
require('./connection/connection');
const passport = require('passport');
const api = require('./routes/api.js');
const auth = require('./routes/auth');
const balsheet = require('./routes/balsheet');
const musop = require('./routes/musop');
const profile = require('./routes/profile');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views/pug');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/public', express.static(process.cwd() + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

api(app);
auth(app);
balsheet(app);
musop(app);
profile(app);

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