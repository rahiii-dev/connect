import axios from "axios";

export const handleError = (error: unknown, fallBackMessage: string): string => {
    if (axios.isAxiosError(error)) { 
        return error.response?.data.message || fallBackMessage; 
    }
    return 'An unexpected error occurred';
};