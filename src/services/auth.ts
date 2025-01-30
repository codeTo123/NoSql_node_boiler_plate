import User from '../models/user'
import { hashPassword } from '../utils/encryption';
import JWT from "jsonwebtoken"

//Login services
export const loginService = async (req: any) => {
    try {
        const { email, password } = req.body;

        const _email = email.toLowerCase();
        const hashedPassword = await hashPassword(password, true);

        const user = await User.findOne({ email: _email, password: hashedPassword }).select("name role email profile_image hobbies")

        if (!user) {
            throw new Error("User not found or deleted.")
        }
        user.profile_image = user.profile_image ? `${process.env.BASE_URL}/${user.profile_image}` : "";

        const token = JWT.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET)

        return {
            user,
            token
        }
    } catch (error: any) {
        // Log the error for debugging purposes
        console.error("Error in user registration:", error);
        throw error;
    }
}

