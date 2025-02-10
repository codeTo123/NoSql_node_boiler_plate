import User from '../models/user'
import { verifyToken } from '../utils/authentication';
import { hashPassword } from '../utils/encryption';
import JWT from "jsonwebtoken"

//Login services
export const loginService = async (req: any) => {
    try {
        const { email, password } = req.body;

        const _email = email.toLowerCase();
        const hashedPassword = await hashPassword(password, true);

        const user = await User.findOne({ email: _email, password: hashedPassword }).select("full_name role email profile_image")

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

export const VerifyUserByTokenService = async (req: any) => {
    try {
        const { token } = req.query;
        const user = verifyToken(token)
        const updateUser = await User.findOneAndUpdate({ email: user }, { is_verified: true, verify_token: null })

        if (!updateUser) {
            throw new Error("Email Verification failed ");
        }

        return {}
    } catch (error: any) {
        // Log the error for debugging purposes
        console.error("Error in Email verication:", error);
        throw error;
    }
}

export const verifyUserByOtpService = async (req: any) => {
    try {
        const { otp } = req.query;
        const _otp = parseInt(otp)

        const updateUser = await User.findOneAndUpdate({ otp: _otp }, { is_verified: true, otp: null })

        if (!updateUser) {
            throw new Error("Otp Verification failed ");
        }

        return {}
    } catch (error: any) {
        // Log the error for debugging purposes
        console.error("Error in Otp verification:", error);
        throw error;
    }
}

