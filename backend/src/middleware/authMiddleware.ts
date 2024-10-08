import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';
import UserRepository from '../repositories/userRepository';
import { sendErrorResponse } from '../utils/responseUtils';
import { AuthenticatedRequest } from '../types/auth';
import { Types } from 'mongoose';

const isAuthenticated = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');

        console.log("Token: ", accessToken);
        

        if (accessToken) {
            const decoded = verifyToken(accessToken, 'access');
            if (decoded) {
                const user = await fetchUser(decoded.userId, res);
                if (user) {
                    req.user = user;
                    return next();
                }
                return;
            }
        } 

        return sendErrorResponse(res, {}, 'No valid token found, please log in again', 401);
    } catch (error: unknown) {
        if (error instanceof Error) {
            sendErrorResponse(res, error, 'Unauthorized: ' + error.message, 401);
        } else {
            sendErrorResponse(res, {}, 'Unauthorized: Unknown error', 401);
        }
    }
};

async function fetchUser(userId: string | Types.ObjectId, res: Response) {
    const user = await UserRepository.findById(userId);
    if (!user) {
        sendErrorResponse(res, {}, 'User not found', 404);
        return null;
    }
    return user;
}

export default isAuthenticated;
