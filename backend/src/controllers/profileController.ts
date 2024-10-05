import { Request, Response } from 'express';
import ProfileService from '../services/profileService';
import asyncHandler from '../utils/ayncHandler';
import { AuthenticatedRequest } from '../types/auth';

class ProfileController {
    /**
     * @route   POST /profile
     * @desc    Create a new user profile
     * @access  Private
     */
    createOrUpdate = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
        const profileData = { ...req.body, user: req.user?._id! };

         const existingProfile = await ProfileService.getProfileByUserId(req.user?._id!);

         if (existingProfile) {
             const updatedProfile = await ProfileService.updateProfile(existingProfile._id, profileData);
             return res.status(200).json(updatedProfile);
         } else {
             const newProfile = await ProfileService.createProfile(profileData);
             return res.status(201).json(newProfile);
         }
    });

    /**
     * @route   GET /profile
     * @desc    Get a user profile by userid
     * @access  Private
     */
    getProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
        const profile = await ProfileService.getProfileByUserId(req.user?._id!);
        res.status(200).json(profile);
    });

    /**
     * @route   GET /profile/verify-username/:username
     * @desc    Verify if a username exists
     * @access  Private
     */
    verifyUsername = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
        const { username } = req.params;
        const exists = await ProfileService.verifyUsername(username, req.user?._id!);
        res.status(200).json({ exists });
    });
}

export default new ProfileController();
