import { Schema, model, Document, Types } from 'mongoose';

export enum MessageStatus {
    SENT = 'sent',
    DELIVERED = 'delivered',
    READ = 'read',
}

export interface IMessage extends Document {
    chat: Types.ObjectId;
    sender: Types.ObjectId;
    content: string;
    isReadBy: Types.ObjectId[];  
    status: MessageStatus;
    isActive: boolean;  
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
    chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true }, 
    sender: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },  
    content: { type: String, required: true },  
    isReadBy: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],  
    status: { type: String, enum: MessageStatus, default: MessageStatus.SENT },  
    isActive: { type: Boolean, default: true },  
}, { timestamps: true });

messageSchema.methods.softDelete = function() {
    this.isActive = false;
    return this.save();
};

export const Message = model<IMessage>('Message', messageSchema);
