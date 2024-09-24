import User, { IUser } from "../models/userModal";

class UserRepositoy {
    async findById(id: string): Promise<IUser | null> {
        return await User.findById(id);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email });
    }

    async findByUsername(username: string): Promise<IUser | null> {
        return await User.findOne({ username });
    }

    async createUser(userData: Partial<IUser>): Promise<IUser> {
        const user = new User(userData);
        return user.save();
    }
}

export default new UserRepositoy()