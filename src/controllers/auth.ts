import { Request, Response } from "express";
import { loginService } from "../services/auth"

export const login = async (req: Request, res: Response) => {
    try {
        let data = await loginService(req)


        res.status(200).json({ message: "User login successfully.", data: data });
    } catch (error) {
        res.status(400).json({ message: error.message || "An error occurred." });
    }
}