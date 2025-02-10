import { Request, Response } from "express";
import { loginService, verifyUserByOtpService, VerifyUserByTokenService } from "../services/auth"

export const login = async (req: Request, res: Response) => {
    try {
        let data = await loginService(req)


        res.status(200).json({ message: "User login successfully.", data: data });
    } catch (error) {
        res.status(400).json({ message: error.message || "An error occurred." });
    }
}

//Verify user by otp request.
export const verifyUserByOtp = async (req: Request, res: Response) => {
    try {
        let data = await verifyUserByOtpService(req)

        res.status(200).json({ message: "User verified by opt successfully.", data: data });
    } catch (error) {
        res.status(400).json({ message: error.message || "An error occurred." });
    }
}

export const VerifyUserByToken = async (req: Request, res: Response) => {
    try {
        let data = await VerifyUserByTokenService(req)

        res.status(200).json({ message: "User Verified by email successfully.", data: data });
    } catch (error) {
        res.status(400).json({ message: error.message || "An error occurred." });
    }
}