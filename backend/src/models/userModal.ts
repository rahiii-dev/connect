import mongoose, { Document, Schema, Types } from "mongoose";
import { comparePassword, hashPassword } from "../utils/passwordUtils";

export interface IUser extends Document {
  _id: string | Types.ObjectId;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true, 
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        delete ret.password;
        return ret;
      },
    },
    toObject: {
      transform(_, ret) {
        delete ret.password; 
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  const user = this as IUser;

  if (!user.isModified("password")) {
    return next();
  }

  try {
    user.password = await hashPassword(user.password)
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await comparePassword(candidatePassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
