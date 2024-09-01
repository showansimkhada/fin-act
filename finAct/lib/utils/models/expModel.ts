import { model, Schema, Document, models } from 'mongoose';

export interface EMO extends Document {
    username: string,
    date: string,
    rent: Number,
    // Grocery
    groc: Number,
    // Online Shoppings
    on_shp: Number,
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
    plans: Number,
    // Installments
    inst: Number,
    // Car Maintenance
    main: Number,
    // Car fuel
    fuel: Number,
    // Electricity
    elec: Number,
    // Subscriptions
    subs: Number,
    // Travel
    tra: Number
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
    on_shp: {
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
    plans: {
        type: Number,
        default: 0
    },
    inst: {
        type: Number,
        default: 0
    },
    main: {
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
    }
});

export default models.Expenses || model<EMO>('Expenses', Expenses)