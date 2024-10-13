import { Schema, model, Document, Types } from 'mongoose';

export interface IChat extends Document {
    participants: Types.ObjectId[];
    isGroupChat: boolean;
    groupName?: string;
    groupIcon?: string;
    admin?: Types.ObjectId[];  
    isActive: boolean;  
    createdAt: Date;
    updatedAt: Date;
}

const chatSchema = new Schema<IChat>({
    participants: [{ type: Schema.Types.ObjectId, ref: 'Profile', required: true }],  
    isGroupChat: { type: Boolean, default: false },  
    groupName: { type: String },  
    groupIcon: { type: String },  
    admin: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],  
    isActive: { type: Boolean, default: true },  
}, { timestamps: true });

chatSchema.methods.softDelete = function() {
    this.isActive = false;
    return this.save();
};

export const Chat = model<IChat>('Chat', chatSchema);
