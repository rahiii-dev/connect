export interface ChatParticipant {
    username: string;
    avatarUrl: string;
    isOnline: boolean;
}

export interface InboxChat {
    chatId: string;          
    username: string;        
    avatarUrl: string;       
    isOnline: boolean;       
    lastMessage: string;    
    isRead: boolean;         
    timestamp: Date;        
}
