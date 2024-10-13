import { chatRepository } from '../repositories/ChatRepository';
import { messageRepository } from '../repositories/MessageRepository';
import { Types } from 'mongoose';

class ChatService {
    async getInbox(userId: string) {
        const chats = await chatRepository.getInbox(userId);
        
        const inbox = await Promise.all(
            chats.map(async (chat) => {
                const lastMessage = await messageRepository.getLastMessageInChat(chat.id);
                return {
                    chatId: chat.id,
                    participants: chat.participants,
                    lastMessage: lastMessage ? lastMessage.content : 'No messages',
                    isRead: lastMessage?.isReadBy.includes(new Types.ObjectId(userId)) ?? false,
                    timestamp: lastMessage?.createdAt,
                };
            })
        );
        
        return inbox;
    }

    async getMessages(chatId: string) {
        return messageRepository.findMessagesByChat(chatId);
    }

    async sendMessage(senderId: string, recipientId: string, content: string) {
        const chat = await chatRepository.findOrCreateChat([new Types.ObjectId(senderId), new Types.ObjectId(recipientId)]);
        return messageRepository.createMessage(chat.id, senderId, content);
    }
}

export const chatService = new ChatService();
