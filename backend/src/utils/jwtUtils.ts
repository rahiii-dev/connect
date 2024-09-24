import { Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
    userId: string; 
}

export const generateAccessToken = (userId: string, res: Response) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' })

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000,
        sameSite: 'none',
    });

    return accessToken;
};

export const generateRefreshToken = (userId: string, res: Response) => {
    const refreshToken =  jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });

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

export const verifyToken = (token: string): CustomJwtPayload | null => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as CustomJwtPayload;
        return decoded;
    } catch (error) {
        return null; 
    }
};