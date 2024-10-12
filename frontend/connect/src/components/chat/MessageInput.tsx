import { useState } from 'react';
import { IconButton, InputBase } from '@mui/material';
import { Send } from '@mui/icons-material';

interface MessageInputProps {
    onSendMessage?: (message: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message.trim()) {
            alert(message)
            onSendMessage?.(message.trim());
            setMessage(''); 
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex items-center gap-2 p-2 border-t border-gray-800 bg-dark-secondary rounded-md">
            <InputBase
                placeholder="Type a message..."
                multiline
                // rowsMax={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyUp={handleKeyPress}
                onKeyDown={handleKeyPress}
                className="flex-grow bg-transparent outline-none text-white px-2"
                sx={{ color: 'white' }}
            />
            <IconButton onClick={handleSendMessage} color="primary" disabled={!message.trim()}>
                <Send />
            </IconButton>
        </div>
    );
};

export default MessageInput;
