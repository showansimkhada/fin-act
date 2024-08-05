require('dotenv').config();
const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;
module.exports = mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true});