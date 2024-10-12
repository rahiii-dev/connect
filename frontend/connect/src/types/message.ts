export interface IMessage {
    id: string | number;
    sender: string;
    content: string;
    timestamp: string;
    isRead: boolean,
}