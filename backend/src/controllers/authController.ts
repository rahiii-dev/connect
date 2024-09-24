import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/authService';
import { sendSuccessResponse } from '../utils/responseUtils';
import { clearToken } from '../utils/jwtUtils';
import asyncHandler from 'express-async-handler';

class AuthController {
    /**
     * @route   POST /auth/register
     * @desc    Register a new user
     * @access  Public
     */
    register = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { fullName, email, password } = req.body;

        const userData = await AuthService.register(fullName, email, password, res);

        res.status(201).json(userData);
    });

    /**
     * @route   POST /auth/login
     * @desc    Login a user
     * @access  Public
     */
    login = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { email, password } = req.body;

        const userData = await AuthService.login(email, password, res);

        res.status(200).json(userData);
    });

    /**
     * @route   POST /auth/logout
     * @desc    Logout a user (clears access and refresh tokens)
     * @access  Private
     */
    logout = asyncHandler(async (_: Request, res: Response, next: NextFunction): Promise<void> => {
        clearToken(res);

        sendSuccessResponse(res, {}, 'User logged out successfully', 200);
    });
}

export default new AuthController();
