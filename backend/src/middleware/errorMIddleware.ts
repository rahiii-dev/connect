import { Request, Response, NextFunction } from "express";
import { sendErrorResponse } from "../utils/responseUtils";

interface ErrorType extends Error {
    statusCode?: number;
}

const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = ((err: ErrorType, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode === 200 ? err.statusCode || 500 : res.statusCode;
    sendErrorResponse(
        res,
        { stack: process.env.NODE_ENV === 'production' ? null : err.stack },
        err.message || 'Internal Server Error',
        statusCode
      );
});

export {notFound};

export default errorHandler