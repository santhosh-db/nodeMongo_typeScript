import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
    name: String;
    phone: String;
    location: String;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        location: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IUserModel>('user', UserSchema);
