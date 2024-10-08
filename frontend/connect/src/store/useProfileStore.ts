import { create } from "zustand";
import { ProfileCredentials, ProfileResponse } from "../types/profile";
import { createUserProfile, getUserProfile } from "../api/profile";
import { handleError } from "../utils/handleError";

interface ProfileState {
    profile: ProfileResponse | null;
    loading: boolean;
    error: string | null;
    status: 'idle' | 'success' | 'error';
    fetchProfile: () => Promise<void>;
    createOrUpdateProfile: (credentials: ProfileCredentials) => Promise<void>;
    clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
    profile: null,
    loading: false,
    error: null,
    status: 'idle',
    fetchProfile: async () => {
        set({ loading: true });
        try {
            const userProfile = await getUserProfile();
            set({ profile: userProfile, status: 'success', error: null })
        } catch (error) {
            set({ error: handleError(error, 'Failed to fetch user') })
        } finally {
            set({ loading: false });
        }
    },

    // Create or Update 
    createOrUpdateProfile: async (data: ProfileCredentials) => {
        set({ loading: true });
        try {
            const newUserProfile = await createUserProfile(data);  
            set({ profile: newUserProfile, status: 'success', error: null });
        } catch (error) {
            set({ status: 'error', error: handleError(error, 'Failed to create user') });
        } finally {
            set({ loading: false });
        }
    },

    clearProfile: () => {
        set({profile: null, status: 'idle'})
    }
}))