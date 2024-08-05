require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;
module.exports = mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true});