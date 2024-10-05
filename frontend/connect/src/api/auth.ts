import { AuthResponse, LoginResponse, UserCredentials } from "../types/auth";
import axios from "../utils/axiosInstance";

export const loginUser = async (credentials: UserCredentials): Promise<LoginResponse> => {
    return (await axios.post<LoginResponse>('/auth/login', credentials)).data
};

export const registerUser = async (userData: UserCredentials): Promise<AuthResponse> => {
    return (await axios.post<AuthResponse>('/auth/register', userData)).data;
};

export const logoutUser = async (): Promise<void> => {
    return await axios.post('/auth/logout');
};