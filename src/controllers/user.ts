import { Request, Response } from 'express'
import { deleteProfileService, getAllUserService, getMyProfileService, newUserRegistrationService, updateProfileService } from '../services/user'

// Controller function for handling user registration request
export const newUserRegistration = async (req: Request, res: Response) => {
    try {
        const user = await newUserRegistrationService(req);
        res.status(201).json({ message: "User registered successfully.", data: user });
    } catch (error: any) {
        res.status(400).json({ message: error.message || "An error occurred in registration profile." });
    }
};

//Update profile.
export const updateProfile = async (req: Request, res: Response) => {
    try {
        const data = await updateProfileService(req);
        res.status(200).json({ message: "User registered successfully.", data: data });
    } catch (error: any) {
        res.status(400).json({ message: error.message || "An error occurred in update profile." });
    }
}

//List existing users.
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const data = await getAllUserService(req);

        if (data.length > 0) {
            for (let value of data) {
                value.profile_image = value.profile_image ? `${process.env.BASE_URL}/${value.profile_image}` : ''
            }
            res.status(200).json({
                message: "User fetched successfully.", data: {
                    items: data,
                    totalCount: data.length
                }
            });
        } else {
            res.status(200).json({
                message: "User not found.", data: {
                    items: [],
                    totalCount: 0
                }
            });
        }

    } catch (error: any) {
        res.status(400).json({ message: error.message || "An error occurred in get user list." });
    }
}

//Get user profile.
export const getMyProfile = async (req: Request, res: Response) => {
    try {
        const data = await getMyProfileService(req)
        res.status(200).json({ message: "User profile fetched successfully.", data: data })
    } catch (error: any) {
        res.status(400).json({ message: error.message || "An error occurred in get profile." });
    }
}

//Delete user
export const deleteProfile = async (req: Request, res: Response) => {
    try {
        const data = await deleteProfileService(req)
        res.status(200).json({ message: "User deleted successfully.", data: {} })
    } catch (error: any) {
        res.status(400).json({ message: error.message || "An error occurred in delete profile." });
    }
}