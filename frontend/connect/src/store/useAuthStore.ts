import { create } from 'zustand';
import { AuthResponse, UserCredentials } from '../types/auth';
import { loginUser, registerUser, logoutUser } from '../api/auth';
import { handleError } from '../utils/handleError';
import { persist } from 'zustand/middleware';
import { useProfileStore } from './useProfileStore';

interface AuthState {
    user: AuthResponse | null;
    loading: boolean;
    error: string | null;
    login: (credentials: UserCredentials) => Promise<void>;
    register: (userData: UserCredentials) => Promise<void>;
    logout: () => Promise<void>;
    clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            loading: false,
            error: null,
            login: async (credentials: UserCredentials) => {
                set({ loading: true, error: null });
                try {
                    const response = await loginUser(credentials);
                    const { _id, email } = response; 
                    set({ user: { _id, email }, loading: false, error: null });
                } catch (error) {
                    set({ loading: false, error: handleError(error, 'Login Failed') });
                    throw error;
                }
            },
            register: async (userData: UserCredentials) => {
                set({ loading: true, error: null });
                try {
                    const response = await registerUser(userData);
                    const { _id, email } = response; 
                    set({ user: { _id, email }, loading: false, error: null });
                } catch (error) {
                    set({ loading: false, error: handleError(error, 'Registration failed') });
                    throw error;
                }
            },
            clearUser: () => {
                set({user: null})
            },
            logout: async () => {
                const { clearProfile } = useProfileStore.getState()
                try {
                    await logoutUser();
                    set({ user: null });
                    clearProfile();
                } catch (error) {
                    set({ user: null });
                    clearProfile();
                }
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ user: state.user}),
        }
    )
);
