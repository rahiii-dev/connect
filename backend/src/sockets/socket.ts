import { Server } from "socket.io"
import http from 'http';
import isAuthenticated from "./middleware/authMiddleware";
import ProfileRepository from "../repositories/ProfileRepository";
import { chatService } from "../services/chatService";

const setupSocket = (httpServer:  http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) => {
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000', 
            credentials: true,
        }
    })

    // middlewares
    io.use(isAuthenticated)

    io.on('connection', async (socket) => {
        const userId = socket.data.user;

        // user and profile is different model
        const profile = await ProfileRepository.updateOnlineStatus(userId, true);
        console.log("user connected: ", profile?.username);

        // a one-to-one chat app, later planing to add group chat

        // 1) inbox
        socket.on('get-inbox', async () => {
            try {
                const inbox = await chatService.getInbox(userId);
                console.log("inbox: ", inbox);
    
                socket.emit('inbox', inbox); 
            } catch (error) {
                console.error("Error fetching inbox:", error);
            }
        });

        // 2) private-message-to user
        // if its their first chat create a uniquye chat with id
        // else retrieve messages using chat id
        // send and recieve messages
        // update inbox

        
        io.on('disconnect', async () => {
            const profile = await ProfileRepository.updateOnlineStatus(userId, true);
            console.log("user diconnected: ", profile?.username);
        })
    })

    return io
}

export default setupSocket;