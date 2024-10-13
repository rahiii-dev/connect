import { Avatar, Box, Button, debounce, Modal, Skeleton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { searchUsers } from "../../api/profile";
import { ProfileResponse } from "../../types/profile";
import { Send } from "@mui/icons-material";

type UserSearchModalProps = {
    open: boolean;
    onClose: () => void;
    onSelectUser: (user: ProfileResponse) => void;
}

const UserSearchModal = ({ open, onClose, onSelectUser }: UserSearchModalProps) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<ProfileResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearch = async (searchValue: string) => {
        if (searchValue) {
            setLoading(true);
            try {
                const users = await searchUsers(searchValue);
                setSearchResults(users);
            } catch (error) {
                setSearchResults([]);
            } finally {
                setLoading(false);
            }
        } else {
            setSearchResults([]);
        }
    };

    // Debounced search handler
    const debouncedSearch = debounce(handleSearch, 500);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        debouncedSearch(query.trim());
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                className="w-[90%] max-w-[500px] min-h-[200px] absolute p-6 bg-dark-secondary shadow-md rounded-md border-none"
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Find a user to chat
                </Typography>
                <TextField
                    label="Search users"
                    fullWidth
                    value={searchQuery}
                    onChange={handleChange}
                    sx={{ marginTop: 2 }}
                />

                <Box
                    className="overflow-y-scroll custom-scrollbar"
                    sx={{
                        marginTop: 2,
                        maxHeight: '300px',
                    }}
                >
                    {loading ? (
                        Array.from(new Array(5)).map((_, index) => (
                            <Box
                                key={index}
                                sx={{ display: 'flex', alignItems: 'center', padding: 1, marginTop: 2 }}
                            >
                                <Skeleton variant="circular" width={40} height={40} sx={{ marginRight: 2 }} />
                                <Skeleton variant="text" width="60%" />
                            </Box>
                        ))
                    ) : searchResults.length > 0 ? (
                        searchResults.map((user) => (
                            <Box
                                key={user._id}
                                sx={{ display: 'flex', alignItems: 'center', padding: 1, cursor: 'pointer', marginTop: 2 }}
                                onClick={() => onSelectUser(user)}
                            >
                                <div className="relative mr-2">
                                    <Avatar src={user.avatarUrl} alt={`${user.username}'s avatar`} />
                                    {user.isOnline && (
                                        <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 rounded-full border-2 border-dark-bg"></span>
                                    )}
                                </div>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography>{user.username}</Typography>
                                    {user.isOnline && (
                                        <Typography variant="caption" className="text-xs text-gray-400">
                                            Online
                                        </Typography>
                                    )}
                                </Box>
                                <Button
                                    sx={{ marginLeft: 'auto' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSelectUser(user);
                                    }}
                                >
                                    <Send />
                                </Button>
                            </Box>
                        ))
                    ) : (
                        <Typography sx={{ marginTop: 2 }} className="text-center">No users found</Typography>
                    )}
                </Box>
            </Box>
        </Modal>
    );
};

export default UserSearchModal;
