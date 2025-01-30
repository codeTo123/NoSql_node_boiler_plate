// import { Request, Response, NextFunction } from "express"

// export const permission = (roles: string[]) => {
//     // return (req: Request, res: Response, next: NextFunction) => {
//     //     const userRole = (req as any).role; // Ideally, extend Request type instead of using "any"

//     //     if (!userRole) {
//     //         return res.status(403).json({ message: "Role not found in request." });
//     //     }

//     //     if (roles.includes(userRole)) {
//     //         return next();
//     //     }

//     //     return res.status(401).json({ message: "You are not authorized to perform this action." });
//     // };
//     return (req: Request, res: Response, next: NextFunction) => {
//         try {
//             // @ts-ignore - Ignoring TypeScript error for missing `user` property in Request
//             const userRole = req.user?.role?.role;

//             if (!userRole) {
//                 return res.status(403).json({ message: "Role not found in request." });
//             }

//             // Check if the user is an admin or has the required role
//             if (roles.includes(userRole)) {
//                 return next();
//             }

//             // If roles do not match, throw an error
//             return res.status(401).json({ message: "You are not authorized to perform this action." });
//         } catch (err: any) {
//            throw err
//         }
//     };
// };

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
