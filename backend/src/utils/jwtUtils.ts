import { Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
    userId: string; 
}

export const generateAccessToken = (userId: string, res: Response) => {
    const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET || '', { expiresIn: '15m' })

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000,
        sameSite: 'none',
    });

    return accessToken;
};

export const generateRefreshToken = (userId: string, res: Response) => {
    const refreshToken =  jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET || '', { expiresIn: '7d' });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'none',
    });

    return refreshToken
};

export const clearToken = (res: Response) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
}

export const verifyToken = (token: string, type: 'access' | 'refresh'): CustomJwtPayload | null => {
    try {
        let secret = '';
        if(type === 'access') {
            secret =  process.env.JWT_ACCESS_SECRET || '';
        } else if(type === 'refresh') {
            secret = process.env.JWT_REFRESH_SECRET || '';
        } 

        const decoded = jwt.verify(token, secret) as CustomJwtPayload;
        return decoded;
    } catch (error) {
        return null; 
    }
};