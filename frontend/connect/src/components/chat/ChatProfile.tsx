import { Avatar, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ChatProfileProps {
  avatarUrl: string;
  username: string;
  lastMessage?: string; 
  isOnline?: boolean;
  chatId: string;  
}

const ChatProfile = ({ avatarUrl, username, lastMessage, isOnline, chatId }: ChatProfileProps) => {
  const navigate = useNavigate();

  return (
    <div
       onClick={() => navigate(`/?chat=${chatId}`)}
       className="flex items-center gap-3 p-3 hover:bg-dark-secondary cursor-pointer transition-colors duration-200">
      <div className="relative">
        <Avatar src={avatarUrl} alt={`${username}'s avatar`} sx={{ width: 48, height: 48 }} />
        {isOnline && (
          <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 rounded-full border-2 border-dark-bg"></span>
        )}
      </div>

      <Box className="flex flex-col">
        <Typography className="text-dark-text font-semibold text-sm">{username}</Typography>
        {lastMessage && (
          <Typography className="text-gray-500 text-xs truncate w-48">{lastMessage}</Typography>
        )}
      </Box>
    </div>
  );
}

export default ChatProfile;
