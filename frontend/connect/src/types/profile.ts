export interface ProfileCredentials {
    username: string, 
    bio: string, 
    gender: 'male' | 'female', 
    avatarUrl: string
}

export interface ProfileResponse {
    _id: string,
    user: string | {email: string, _id: string};
    username: string, 
    bio: string, 
    gender: 'male' | 'female', 
    avatarUrl: string
}