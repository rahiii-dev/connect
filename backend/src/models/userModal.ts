import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    _id: string;
    username: string;
    fullName: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    username: { type: String },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true })

const User = mongoose.model<IUser>('User', userSchema);

export default User;