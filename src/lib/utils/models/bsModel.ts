import { model, Schema, Document, models, ObjectId } from 'mongoose';

export interface IBS extends Document {
    _id: ObjectId,
    username: string,
    year: Number,
    month: Number,
    date: Number,
    fWI: Number,
    sWI: Number,
    return: Number,
    openingBalance: Number,
    closingBalance: Number,
    weeklySpent: Number,
    weeklySave: Number
}

const BalanceSheet = new Schema<IBS> ({
    username: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
    },
    month: {
        type: Number,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    fWI: {
        type: Number,
        required: true
    },
    sWI: {
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

export default models.BS || model<IBS>('BS', BalanceSheet)