import { Types } from "mongoose";
import { IProfile } from "../models/profileModeal";
import ProfileRepository from "../repositories/ProfileRepository";
import AppError from "../utils/AppError";

class ProfileService {
    // Create a new profile
    async createProfile({user, username, bio, gender, avatarUrl}: Partial<IProfile>): Promise<IProfile> {
        try {
            const newProfile = await ProfileRepository.createProfile({user, username, bio, gender, avatarUrl});
            return newProfile;
        } catch (error) {
            throw new AppError('Failed to create Profile', 500)
        }
    }

    // Update an existing profile
    async updateProfile(profileId: string | Types.ObjectId, {user, username, bio, gender, avatarUrl}: Partial<IProfile>): Promise<IProfile | null> {

        try {
            const updatedProfile = await ProfileRepository.updateProfile(profileId, {user, username, bio, gender, avatarUrl});
            return updatedProfile;
        } catch (error) {
            throw new AppError('Failed to update profile', 500)
        }
    }

    // Get a profile by user ID
    async getProfileByUserId(userId: string | Types.ObjectId): Promise<IProfile | null> {
        try {
            const profileData = await ProfileRepository.findUserProfileByUserId(userId);
            return profileData
        } catch (error) {
            throw new AppError('Failed to get user prfoile', 500)
        }
    }

    // Get a profile by profile ID
    async getProfileById(profileId: string | Types.ObjectId): Promise<IProfile | null> {
        try {
            const profileData = await ProfileRepository.findProfileById(profileId);
            if (!profileData) {
                throw new AppError('Profile not found', 404)
            }
            return profileData
        } catch (error) {
            throw new AppError('Failed to get user prfoile', 500)
        }
    }

    // Get a profile by username
    async getProfileByUsername(username: string): Promise<IProfile | null> {
        try {
            const profileData = await ProfileRepository.findProfileByUsername(username);
            if (!profileData) {
                throw new AppError('Profile not found', 404)
            }
            return profileData
        } catch (error) {
            throw new AppError('Failed to get user prfoile', 500)
        }
    }

    // Verify if a username exists
    async verifyUsername(username: string, userId: string | Types.ObjectId): Promise<boolean> {
        try {
            const existingProfile = await ProfileRepository.verifyUsernames(username, userId);
            return existingProfile !== null;
        } catch (error) {
            throw new AppError('Failed to verify username', 500)
        }
    }
}

export default new ProfileService();
