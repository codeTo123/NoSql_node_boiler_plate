import { Request, Response, NextFunction } from 'express'
import JWT from 'jsonwebtoken'
export interface AppRequest extends Request {
    userId: string;
    user: {};
    role: string
}

export const authentication = async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
        const reqHeader = req.headers['authorization']
        const token = reqHeader.split(" ")[1]

        if (!token) {
            res.status(500).json({ message: "Token is required!" })
        }
        JWT.verify(token, process.env.JWT_SECRET, ((err: any, decode: any) => {
            if (err) {
                res.status(401).json({ error: err.message || err })
            }
            req.user = decode;
            req.userId = decode.id;
            req.role = decode.role;
            next()
        }))
    } catch (err: any) {
        res.status(500).json({ error: err.message || err })
    }
}