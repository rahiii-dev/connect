import { Request } from "express";
import { IUser } from "../models/userModal";

export interface AuthenticatedRequest extends Request {
    user?: Partial<IUser>;
}