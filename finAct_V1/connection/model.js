const mongoose = require('mongoose');
const { Schema } = mongoose;

const Users = new Schema ({
    username: {
        type: String,
        reuired: true
    },
    name: {
        type: String,
        required: true,
        select: false
    },
    password: {
        type: String,
        required: true
    }
});
const User = mongoose.model("User", Users);

const BalanceSheet = new Schema ({
    username: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    showanWE: {
        type: Number,
        required: true
    },
    swastikaWE: {
        type: Number,
        required: true
    },
    return: {
        type: Number
    },
    openingBalance: {
        type: Number,
        required: true
    },
    closingBalance: {
        type: Number,
        required: true
    },
    weeklySpent: {
        type: Number
    },
    weeklySave: {
        type: Number
    }
});
const BS = mongoose.model("BS", BalanceSheet);

const MusselOpened = new Schema ({
    username: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    weekday: {
        type: String,
        required: true
    },
    fShift: {
        type: Number,
        required: true
    },
    sShift: {
        type: Number,
        required: true
    },
    tShift: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});
const MO = mongoose.model("MusselOpened", MusselOpened);

exports.BS = BS;
exports.MO = MO;