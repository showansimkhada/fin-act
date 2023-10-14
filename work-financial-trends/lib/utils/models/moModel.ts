import { model, Schema, Document, models } from 'mongoose';

export interface IMO extends Document {
    username: string,
    date: string,
    weekday: string,
    spot: Number,
    fShift: Number,
    sShift: Number,
    tShift: Number,
    total: Number
}

const MusselOpened = new Schema<IMO> ({
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

export default models.MusselOpeneds || model<IMO>('MusselOpeneds', MusselOpened)