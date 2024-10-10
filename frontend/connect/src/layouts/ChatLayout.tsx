import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatContainer from "../components/chat/ChatContainer";

const ChatLayout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');


  return (
    <Box component={'section'} className="h-screen overflow-hidden flex">
      {/* Sidebar */}
      <Box 
        component="aside"
        width={isLargeScreen ? '300px' : isChatOpen ? '0px' : '100%'}
        display={isChatOpen ? 'none' : 'block'}
        overflow="hidden"
        className="h-full"
      >
        <ChatSidebar/>
      </Box>

      {/* Chat Container */}
      <Box
        component="main"
        flexGrow={1}
        display={isChatOpen || isLargeScreen ? 'block' : 'none'}
        position={isLargeScreen ? 'static' : 'absolute'}
        left={isLargeScreen ? 'auto' : isChatOpen ? 0 : '100%'}
        width={isLargeScreen ? 'auto' : '100%'}
        height="100%"
      >
        <ChatContainer/>
      </Box>
    </Box>
  );
};

export default ChatLayout;
