import { model, Schema, Document, models } from 'mongoose';

export interface EMO extends Document {
    username: string,
    date: string,
    rent: Number,
    grocery: Number,
    oline_shop: Number,
    shop: Number,
    broadband: Number,
    insurance: Number,
    interest: Number,
    withholding_tax: Number,
    mobile_plans: Number,
    installments: Number,
    car_maintenance: Number,
    fuel: Number,
    electricity: Number,
    subscriptions: Number,
    travel: Number
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
    grocery: {
        type: Number,
        default: 0
    },
    oline_shop: {
        type: Number,
        default: 0
    },
    shop: {
        type: Number,
        default: 0
    },
    broadband: {
        type: Number,
        default: 0
    },
    insurance: {
        type: Number,
        default: 0
    },
    interest: {
        type: Number,
        default: 0
    },
    withholding_tax: {
        type: Number,
        default: 0
    },
    mobile_plans: {
        type: Number,
        default: 0
    },
    installments: {
        type: Number,
        default: 0
    },
    car_maintenance: {
        type: Number,
        default: 0
    },
    fuel: {
        type: Number,
        default: 0
    },
    electricity: {
        type: Number,
        default: 0
    },
    subscriptions: {
        type: Number,
        default: 0
    },
    travel: {
        type: Number,
        default: 0
    }
});

export default models.Expenses || model<EMO>('Expenses', Expenses)