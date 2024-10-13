import { Chat, IChat } from '../models/chatModal';
import { Types } from 'mongoose';

class ChatRepository {
    async findOrCreateChat(participants: Types.ObjectId[]): Promise<IChat> {
        let chat = await Chat.findOne({ participants: { $all: participants } });
        if (!chat) {
            chat = await new Chat({ participants }).save();
        }
        return chat;
    }

    async getInbox(userId: string): Promise<IChat[]> {
        return Chat.find({ participants: userId, isActive: true })
            .populate('participants', 'username, avatarUrl, isOnline, user') 
    }

    async addParticipant(chatId: string, participantId: string): Promise<IChat | null> {
        return Chat.findByIdAndUpdate(
            chatId,
            { $addToSet: { participants: participantId } },  
            { new: true }
        );
    }
}

export const chatRepository = new ChatRepository();
