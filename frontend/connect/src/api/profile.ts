import { ProfileCredentials, ProfileResponse } from "../types/profile";
import axiosInstance from "../utils/axiosInstance";

export const getUserProfile = async (): Promise<ProfileResponse | null> => {
    return (await axiosInstance.get<ProfileResponse>('/profile')).data
};

export const verifyUsername = async (username: string): Promise<{exists: boolean}> => {
    return (await axiosInstance.get<{exists: boolean}>(`/profile/verify-username/${username}`)).data
};

export const searchUsers = async (username: string): Promise<ProfileResponse[]> => {
    return (await axiosInstance.get<ProfileResponse[]>(`/profile/search/${username}`)).data
};

export const createUserProfile = async (credentials: ProfileCredentials): Promise<ProfileResponse> => {
    return (await axiosInstance.post<ProfileResponse>('/profile', credentials)).data
};

export const updateUserProfile = async (credentials: ProfileCredentials): Promise<ProfileResponse> => {
    return (await axiosInstance.post<ProfileResponse>('/profile', credentials)).data
};
