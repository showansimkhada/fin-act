import { model, Schema, Document, models } from 'mongoose';

export interface EMO extends Document {
    username: string,
    date: string,
    rent: Number,
    // Grocery
    groc: Number,
    // Online Shoppings
    onshp: Number,
    // Shoppings
    shp: Number,
    // Broadbands
    bro: Number,
    // Insurance
    ins: Number,
    // Interests
    int: Number,
    // Withholding TAX
    wta: Number,
    // Mobile plans
    plan: Number,
    // Installments
    inst: Number,
    // Car Maintenance
    carme: Number,
    // Car fuel
    fuel: Number,
    // Electricity
    elec: Number,
    // Subscriptions
    subs: Number,
    // Travel
    tra: Number,
    // Remittance
    remi: Number
}

const Expenses = new Schema<EMO> ({
    username: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    rent: {
        type: Number,
        default: 0
    },
    groc: {
        type: Number,
        default: 0
    },
    onshp: {
        type: Number,
        default: 0
    },
    shp: {
        type: Number,
        default: 0
    },
    bro: {
        type: Number,
        default: 0
    },
    ins: {
        type: Number,
        default: 0
    },
    int: {
        type: Number,
        default: 0
    },
    wta: {
        type: Number,
        default: 0
    },
    plan: {
        type: Number,
        default: 0
    },
    inst: {
        type: Number,
        default: 0
    },
    carme: {
        type: Number,
        default: 0
    },
    fuel: {
        type: Number,
        default: 0
    },
    elec: {
        type: Number,
        default: 0
    },
    subs: {
        type: Number,
        default: 0
    },
    tra: {
        type: Number,
        default: 0
    },
    remi: {
        type: Number,
        default: 0
    }
});

export default models.Expenses || model<EMO>('Expenses', Expenses)