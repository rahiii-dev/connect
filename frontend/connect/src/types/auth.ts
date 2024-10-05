export interface UserCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    _id: string;
    accessToken?: string;
    refreshToken?: string;
    email: string;
}

export interface LoginResponse extends AuthResponse {
    profileExist: boolean;
}