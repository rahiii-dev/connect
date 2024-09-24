import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/userModal';
import { generateAccessToken, verifyToken } from '../utils/jwtUtils';
import UserRepository from '../repositories/userRepository';
import { sendErrorResponse } from '../utils/responseUtils';

interface AuthenticatedRequest extends Request {
    user?: Partial<IUser>;
}

const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.accessToken || req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return sendErrorResponse(res, {}, 'No access token found, authorization denied', 401);
        }

        const decoded = verifyToken(token);

        if (decoded) {
            const user = await UserRepository.findById(decoded.userId);
            if (!user) {
                return sendErrorResponse(res, {}, 'User not found', 404);
            }
            req.user = user;
            return next();
        }

        const refreshToken = req.cookies.refreshToken || req.header('x-refresh-token');

        if (!refreshToken) {
            return sendErrorResponse(res, {}, 'No refresh token found, please log in again', 401);
        }

        const refreshDecoded = verifyToken(refreshToken);
        if (!refreshDecoded) {
            return sendErrorResponse(res, {}, 'Invalid refresh token', 403);
        }

        const newAccessToken = generateAccessToken(refreshDecoded.userId, res);

        const user = await UserRepository.findById(refreshDecoded.userId);
        if (!user) {
            return sendErrorResponse(res, {}, 'User not found', 404);
        }

        req.user = user;
        next();
    } catch (error: unknown) {
        if (error instanceof Error) {
            sendErrorResponse(res, error, 'Unauthorized: ' + error.message, 401);
        } else {
            sendErrorResponse(res, {}, 'Unauthorized: Unknown error', 401);
        }
    }
};

export default authMiddleware;
