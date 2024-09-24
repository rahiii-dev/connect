import UserRepository from '../repositories/userRepository';
import { Response } from 'express';
import { IUser } from '../models/userModal';
import { generateAccessToken, generateRefreshToken } from '../utils/jwtUtils';
import { comparePassword, hashPassword } from '../utils/passwordUtils';

class AuthService {
    async register(fullName: string, email: string, password: string, res: Response): Promise<Partial<IUser> & { accessToken: string, refreshToken: string }> {
        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await hashPassword(password);
        const user = await UserRepository.createUser({ fullName, email, password: hashedPassword });

        const accessToken = generateAccessToken(user._id, res);
        const refreshToken = generateRefreshToken(user._id, res);

        const { password: pass, ...userData } = user.toObject();

        return {
            ...userData,
            accessToken,
            refreshToken
        };
    }

    async login(email: string, password: string, res: Response): Promise<Partial<IUser> & { accessToken: string, refreshToken: string }> {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        const accessToken = generateAccessToken(user._id, res);
        const refreshToken = generateRefreshToken(user._id, res);

        const { password: pass, ...userData } = user.toObject();

        return {
            ...userData,
            accessToken,
            refreshToken
        };
    }
}

export default new AuthService();
