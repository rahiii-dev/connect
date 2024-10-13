import { Message, IMessage, MessageStatus } from '../models/messageModal';
import { Types } from 'mongoose';

class MessageRepository {
    async findMessagesByChat(chatId: string): Promise<IMessage[]> {
        return Message.find({ chat: chatId, isActive: true })
            .populate('sender', 'username, avatarUrl, isOnline, user')
    }

    async createMessage(chatId: string, senderId: string, content: string): Promise<IMessage> {
        const message = new Message({
            chat: new Types.ObjectId(chatId),
            sender: new Types.ObjectId(senderId),
            content,
            status: MessageStatus.SENT
        });
        return message.save();
    }

    async markMessageAsRead(messageId: string, userId: string): Promise<IMessage | null> {
        return Message.findByIdAndUpdate(
            messageId,
            { $addToSet: { isReadBy: userId }, status: MessageStatus.READ },
            { new: true }
        );
    }

    async getLastMessageInChat(chatId: string | Types.ObjectId): Promise<IMessage | null> {
        return Message.findOne({ chat: chatId }).sort({ createdAt: -1 });
    }
}

export const messageRepository = new MessageRepository();
