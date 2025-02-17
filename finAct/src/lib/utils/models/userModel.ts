import { model, Schema, Document, models, ObjectId } from 'mongoose';

export interface IUSER extends Document {
    _id: ObjectId,
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    sfirstname: string,
    slastname: string,
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
    sfirstname: {
        type: String
    },
    slastname: {
        type: String
    }
});

export default models.Users || model<IUSER>('Users', UserSchema)
