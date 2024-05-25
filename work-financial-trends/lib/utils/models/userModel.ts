import { model, Schema, Document, models } from 'mongoose';

export interface IUSER extends Document {
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    mo: Boolean,
    usernames: string,
    sfirstname: string,
    slastname: string,
    mos: Boolean
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
    mo: {
        type: Boolean
    },
    usernames: {
        type: String
    },
    sfirstname: {
        type: String
    },
    slastname: {
        type: String
    },
    mos: {
        type: Boolean
    }
});

export default models.Users || model<IUSER>('Users', UserSchema)
