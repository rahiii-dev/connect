import { Avatar, useMediaQuery } from "@mui/material";
import { AVATAR_URL } from "../../utils/constants";
import MessageInput from "./MessageInput";
import ChatMessages from "./ChatMessages";
import { useSearchParams } from "react-router-dom";
import EmptyChat from "./EmptyChat";
import { ArrowBackIosNew } from "@mui/icons-material";

const ChatContainer = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const chatId = searchParams.get('chat');
    const isSmallScreen = useMediaQuery('(max-width: 1024px)');

    console.log("Current chatId:", chatId); // Check what chatId is
    if (!chatId) {
        console.log("Rendering EmptyChat");
        return <EmptyChat />;
    }
    const padx = 'px-4';
    const handleBack = () => {
        searchParams.delete('chat');
        setSearchParams(searchParams);
    }
    return (
        <div className="h-full overflow-hidden flex flex-col">
            <div className={`${padx} py-3 flex items-center gap-4 border-gray-800 border-b`}>
                <div className="flex items-center text-blue-accent">
                    {isSmallScreen && (
                        <div onClick={handleBack} className="p-1 cursor-pointer">
                            <ArrowBackIosNew />
                        </div>
                    )}
                    <Avatar src={AVATAR_URL} alt={`${'users'}'s avatar`} sx={{ width: 48, height: 48 }} />
                </div>
                <div className="flex-grow">
                    <p className="text-lg font-semibold">john_doe</p>
                    <p className="text-xs text-gray-400">Active Now</p>
                </div>
            </div>

            <div className={`${padx} flex-grow overflow-y-scroll overflow-x-hidden custom-scrollbar`}>
                <ChatMessages />
            </div>

            <div className={`${padx} pt-2 pb-4`}>
                <MessageInput />
            </div>
        </div>
    );
}

export default ChatContainer;
