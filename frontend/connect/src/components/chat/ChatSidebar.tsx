import { Avatar, Button, CircularProgress } from "@mui/material";
import { useProfileStore } from "../../store/useProfileStore";
import { AVATAR_URL } from "../../utils/constants";
import Logo from "../Logo";
import ChatProfile from "./ChatProfile";
import { Logout, Search } from "@mui/icons-material";
import { Link, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useSocket } from "../SocketContext";
import { InboxChat } from "../../types/chat";

const ChatSidebar = () => {
    const socket = useSocket();
    const { logout } = useAuthStore();
    const { profile } = useProfileStore();
    const [loggingOut, setLoggingOut] = useState(false);
    const [inbox, setInbox] = useState<InboxChat[]>([]);
    const [searchParams] = useSearchParams();
    const chatId = searchParams.get('chat');

    useEffect(() => {
        if (socket) {
            socket.emit('get-inbox');

            socket.on('inbox', (inboxData: InboxChat[]) => {
                setInbox(inboxData);
            });
        }

        return () => {
            socket?.off('inbox');
        };
    }, [socket]);

    const handleLogout = async () => {
        setLoggingOut(true)
        await logout();
        toast.warning('You have logged out')
        setLoggingOut(false)
    }

    return (
        <div className="h-full overflow-hidden flex flex-col gap-2">
            <div className='p-2 flex items-center justify-between'>
                <Logo />
                <div className="p-2 cursor-pointer text-gray-400 hover:text-gray-400 transition-colors duration-300 ease-in-out">
                    <Search sx={{ fontSize: 24 }} />
                </div>
            </div>
            <div className="flex-grow overflow-y-scroll overflow-x-hidden custom-scrollbar">
                {inbox.length > 0 ? (
                    inbox.map((chat, index) => (
                        <ChatProfile
                            key={index}
                            active={chatId === chat.chatId}
                            chatId={chat.chatId}
                            username={chat.username}
                            avatarUrl={chat.avatarUrl || AVATAR_URL}
                            isOnline={chat.isOnline}
                            lastMessage={chat.lastMessage}
                        />
                    ))
                ) : (
                    <div className="h-full flex flex-col justify-center items-center gap-2 text-center">
                        <p className="text-xl font-semibold text-gray-500">No conversation yet!!</p>
                        <p className="text-lg text-gray-400">Start <span className="text-blue-accent">connecting</span> by finding users</p>
                    </div>

                )}
            </div>

            <div className="p-2 bg-dark-secondary flex items-center gap-4">
                <Link to="/profile" className="hover:opacity-90 transition-opacity duration-300 ease-in-out">
                    <Avatar
                        src={profile?.avatarUrl || AVATAR_URL}
                        alt={`${profile?.username || 'You'}'s avatar`}
                        sx={{ width: 40, height: 40 }}
                        className="border-2 border-blue-accent"
                    />
                </Link>
                <div className="flex-grow">
                    <Link to="/profile" className="hover:opacity-90 transition-opacity duration-300 ease-in-out">
                        <p className="text-lg font-semibold">{profile?.username || 'You'}</p>
                    </Link>
                </div>
                <Button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="bg-transparent p-2 rounded-full border-none text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all duration-300 ease-in-out"
                >
                    {loggingOut ? <CircularProgress size={24} color="error" /> : <Logout sx={{ fontSize: 24 }} />}
                </Button>
            </div>
        </div>
    );
}

export default ChatSidebar;
