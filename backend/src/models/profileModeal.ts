import { Schema, model, Types } from "mongoose";
import { IUser } from "./userModal";

export interface IProfile extends Document {
    _id: string | Types.ObjectId;
    user: IUser | Types.ObjectId;
    username: string;
    bio: string;
    gender: 'male' | 'female';
    avatarUrl: string;
    isOnline : boolean;
}

const profileSchema = new Schema<IProfile>(
    {
        user: {
            type: Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"],  
            unique: true,
        },
        username: {
            type: String,
            lowercase: true,
            required: [true, "Username is required"],  
            unique: true,
            trim: true,
            minlength: [3, "Username must be at least 3 characters long"],  
            maxlength: [30, "Username cannot exceed 30 characters"],  
            index: true,
        },
        bio: {
            type: String,
            maxlength: [150, "Bio cannot exceed 150 characters"],  
        },
        gender: {
            type: String,
            enum: {
                values: ['male', 'female'],
                message: "Gender must be either 'male' or 'female'", 
            },
            required: [true, "Gender is required"],  
        },
        avatarUrl: {
            type: String,
            required: [true, "Avatar URL is required"],  
        },
        isOnline: {
            type: Boolean
        }
    },
    {
        timestamps: true,
    }
);

const Profile = model<IProfile>("Profile", profileSchema);

export default Profile;
