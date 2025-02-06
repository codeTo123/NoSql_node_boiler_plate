import { Request, Response } from "express";

export const permission = (roles: any) => {
    return (req: Request, res: Response, next: any) => {
        //@ts-ignore
        const userRole = req.role; // Ideally, extend Request type instead of using "any"

        if (!userRole) {
            return res.status(403).json({ message: "Role not found in request." });
        }

        if (roles.includes(userRole)) {
            return next(); // Allow request to continue
        }

        return res.status(401).json({ message: "You are not authorized to perform this action." });
    };
};
