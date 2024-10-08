import { ExitToApp } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
    const {logout} = useAuthStore()
    const navigate = useNavigate();

    return (
        <div>
            <h1 className="text-2xl">Chat Page</h1>
            <Button
              onClick={async () => {
                await logout()
                navigate('/auth', {replace: true});
              }}
              variant="contained"
              color="error"
              endIcon={<ExitToApp/>}
            >Logout</Button>

            <Button
              onClick={() => {
                navigate('/profile', {replace: true});
              }}
              variant="contained"
              color="info"
            >Profile</Button>
        </div>
    );
}

export default ChatPage;
