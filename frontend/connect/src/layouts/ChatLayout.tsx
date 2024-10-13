import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatContainer from "../components/chat/ChatContainer";
import { useSearchParams } from "react-router-dom";

const ChatLayout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get('chat');

  useEffect(() => {
    if (chatId) {
      setIsChatOpen(true);
    } else {
      setIsChatOpen(false)
    }

  }, [chatId]);

  
  return (
    <Box component={'section'} className="relative h-screen overflow-hidden flex">
      {/* Sidebar */}
      <Box
        component="aside"
        width={isLargeScreen ? '300px' : '100%'}
        display={isChatOpen && !isLargeScreen ? 'none' : 'block'}
        overflow="hidden"
        className="h-full"
      >
        <ChatSidebar />
      </Box>

      {/* Chat Container */}
      <Box
        component="main"
        flexGrow={1}
        position={isLargeScreen ? 'static' : 'absolute'}
        visibility={isChatOpen || isLargeScreen ? 'visible' : 'hidden'}
        sx={{
          width: isLargeScreen ? 'auto' : '100%',
          height: '100%',
          transition: 'transform 0.3s ease, opacity 0.3s ease',
          transform: isLargeScreen ? 'none' : isChatOpen ? 'translateX(0)' : 'translateX(100%)',
          opacity: isLargeScreen ? 1 : isChatOpen ? 1 : 0,
        }}
      >
        <ChatContainer />
      </Box>
    </Box>
  );
};

export default ChatLayout;
