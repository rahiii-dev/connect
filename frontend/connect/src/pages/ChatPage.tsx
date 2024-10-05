import { ExitToApp } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useAuthStore } from "../store/useAuthStore";

const ChatPage = () => {
    const {logout} = useAuthStore()
    return (
        <div>
            <h1 className="text-2xl">Chat Page</h1>
            <Button
              onClick={async () => {
                await logout()
              }}
              variant="contained"
              color="error"
              endIcon={<ExitToApp/>}
            >Logout</Button>
        </div>
    );
}

export default ChatPage;
