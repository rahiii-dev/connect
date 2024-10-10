import { Avatar } from "@mui/material";
import { AVATAR_URL } from "../../utils/constants";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
    return (
        <div className="h-full overflow-hidden flex flex-col gap-2">
            <div className='p-4 flex items-center gap-4 border-gray-800 border-b'>
                <Avatar src={AVATAR_URL} alt={`${'users'}'s avatar`} sx={{ width: 48, height: 48 }} />
                <div className="flex-grow">
                    <p className="text-lg font-semibold">john_doe</p>
                    <p className="text-xs text-gray-400">Active Now</p>
                </div>
            </div>

            <div className="flex-grow overflow-y-scroll overflow-x-hidden custom-scrollbar">
                {/* messages */}
            </div>

            <div className="p-4">
                <MessageInput/>
            </div>
        </div>
    );
}

export default ChatContainer;
