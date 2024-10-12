import { Avatar, Button, CircularProgress } from "@mui/material";
import { useProfileStore } from "../../store/useProfileStore";
import { AVATAR_URL } from "../../utils/constants";
import Logo from "../Logo";
import ChatProfile from "./ChatProfile";
import { Logout, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "sonner";
import { useState } from "react";

const dummyProfiles = [
    { username: "john_doe", avatarUrl: AVATAR_URL, isOnline: true, lastMessage: "Hey, how's it going?" },
    { username: "jane_smith", avatarUrl: AVATAR_URL, isOnline: false, lastMessage: "See you later!" },
    { username: "samuel23", avatarUrl: AVATAR_URL, isOnline: true, lastMessage: "I'm on my way." },
    { username: "karenM", avatarUrl: AVATAR_URL, isOnline: false, lastMessage: "Can we reschedule?" },
    { username: "mike_87", avatarUrl: AVATAR_URL, isOnline: true, lastMessage: "Just finished the task." },
    { username: "emma_w", avatarUrl: AVATAR_URL, isOnline: true, lastMessage: "Thanks for the update." },
    { username: "david_L", avatarUrl: AVATAR_URL, isOnline: false, lastMessage: "I'll call you later." },
    { username: "lucas_k", avatarUrl: AVATAR_URL, isOnline: true, lastMessage: "Let's meet up tomorrow." },
    { username: "olivia_w", avatarUrl: AVATAR_URL, isOnline: true, lastMessage: "Got it, thanks!" },
    { username: "noah_h", avatarUrl: AVATAR_URL, isOnline: false, lastMessage: "Please check your email." },
    { username: "sophia_A", avatarUrl: AVATAR_URL, isOnline: true, lastMessage: "I'll be there soon." },
    { username: "liam_n", avatarUrl: AVATAR_URL, isOnline: false, lastMessage: "Catch you later." },
    { username: "mia_s", avatarUrl: AVATAR_URL, isOnline: true, lastMessage: "Yes, that's fine." },
    { username: "benjamin_b", avatarUrl: AVATAR_URL, isOnline: false, lastMessage: "Sounds good to me!" },
    { username: "ava_r", avatarUrl: AVATAR_URL, isOnline: true, lastMessage: "See you at 5!" }
];

const ChatSidebar = () => {
    const { logout } = useAuthStore();
    const { profile } = useProfileStore();
    const [loggingOut, setLoggingOut] = useState(false);

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
                {dummyProfiles.map((profile, index) => (
                    <ChatProfile key={index} chatId={`${index}`} username={profile.username} avatarUrl={AVATAR_URL} isOnline={profile.isOnline} lastMessage={profile.lastMessage} />
                ))}
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
