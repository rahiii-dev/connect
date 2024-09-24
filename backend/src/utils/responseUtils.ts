import { Response } from 'express';

// Success Response Utility
export const sendSuccessResponse = (
  res: Response,
  data: any = {},
  message: string = 'Request successful',
  statusCode: number = 200
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// Error Response Utility
export const sendErrorResponse = (
  res: Response,
  error: any = {},
  message: string = 'Something went wrong',
  statusCode: number = 500
) => {
    
  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};
