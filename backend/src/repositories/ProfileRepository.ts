import { Types } from "mongoose";
import Profile, { IProfile } from "../models/profileModeal";

class ProfileRepository {
    async createProfile(profileData: Partial<IProfile>): Promise<IProfile> {
        const profile = new Profile(profileData);
        return await profile.save();
    }

    async findUserProfileByUserId(userId: string | Types.ObjectId): Promise<IProfile | null> {
        return await Profile.findOne({ user: userId });
    }

    async findProfileById(profileId: string | Types.ObjectId): Promise<IProfile | null> {
        return await Profile.findById(profileId);
    }

    async findProfileByUsername(username: string): Promise<IProfile | null> {
        return await Profile.findOne({ username: { $regex: username, $options: 'i' } });
    }

    async verifyUsernames(username: string, userId: string | Types.ObjectId): Promise<IProfile | null> {
        return await Profile.findOne({ username: { $regex: username, $options: 'i' }, user: {$ne: userId} });
    }

    async updateProfile(profileId: string | Types.ObjectId, profileData: Partial<IProfile>): Promise<IProfile | null> {
        return await Profile.findByIdAndUpdate(profileId, profileData, {
            new: true,
            runValidators: true,
        });
    }
}

export default new ProfileRepository();
