import UserRepository from '../repositories/userRepository';
import { Response, Request } from 'express';
import { IUser } from '../models/userModal';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../utils/jwtUtils';
import AppError from '../utils/AppError';
import { comparePassword } from '../utils/passwordUtils';

class AuthService {
    async register(email: string, password: string, res: Response): Promise<Partial<IUser> & { accessToken: string, refreshToken: string }> {
        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            throw new AppError('User already exists', 400);
        }

        const user = await UserRepository.createUser({ email, password });

        const accessToken = generateAccessToken(user._id, res);
        const refreshToken = generateRefreshToken(user._id, res);

        return {
            ...user.toJSON(),
            accessToken,
            refreshToken
        };
    }

    async login(email: string, password: string, res: Response): Promise<Partial<IUser> & { accessToken: string, refreshToken: string }> {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Invalid email or password', 404);
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            throw new AppError('Invalid email or password', 404);
        }

        const accessToken = generateAccessToken(user._id, res);
        const refreshToken = generateRefreshToken(user._id, res);

        return {
            ...user.toJSON(),
            accessToken,
            refreshToken
        };
    }

    async refreshToken(req: Request, res: Response): Promise<{ accessToken: string, refreshToken?: string }> {
        const refreshToken = req.cookies?.refreshToken || req.header('x-refresh-token');
        
        if (!refreshToken) {
            throw new AppError('No refresh token provided', 403);
        }

        const decoded = verifyToken(refreshToken, 'refresh');
        if (!decoded) {
            throw new AppError('Invalid refresh token', 403);
        }

        const user = await UserRepository.findById(decoded.userId);
        if (!user) {
            throw new AppError('User not found', 404);
        }

        const accessToken = generateAccessToken(user._id, res);
        const newRefreshToken = generateRefreshToken(user._id, res);

        return {
            accessToken,
            refreshToken: newRefreshToken 
        };
    }
}

export default new AuthService();
