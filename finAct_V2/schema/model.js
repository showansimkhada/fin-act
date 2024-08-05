const mongoose = require('mongoose');
const { Schema } = mongoose;

const Users = new Schema ({
    username: {
        type: String,
        reuired: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    sfirstname: {
        type: String
    },
    slastname: {
        type: String
    }
});
const User = mongoose.model("User", Users);

const BalanceSheet = new Schema ({
    username: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    fWE: {
        type: Number,
        required: true
    },
    sWE: {
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
        type: String,
        required: true
    },
    weekday: {
        type: String,
        required: true
    },
    spot: {
        type: Number,
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
exports.User = User;