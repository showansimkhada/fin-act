import { model, Schema, Document, models } from 'mongoose';

export interface IUSER extends Document {
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    mu: Boolean,
    sfirstname: string,
    slastname: string,
    pMu: Boolean
}

const UserSchema = new Schema<IUSER> ({
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
    mu: {
        type: Boolean
    },
    sfirstname: {
        type: String
    },
    slastname: {
        type: String
    },
    pMu: {
        type: Boolean
    }
});

export default models.Users || model<IUSER>('Users', UserSchema)
