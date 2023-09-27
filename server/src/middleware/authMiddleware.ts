import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserData {
    id: string;
    email: string;
}
  
interface AuthRequest extends Request {
    userData: UserData;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Authentication failed!!",
        });
    }
    
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Authentication failed!!",
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);

        if (typeof decodedToken === "object" && "id" in decodedToken && "email" in decodedToken) {
            req.userData = decodedToken as UserData;
            next();
        }
    } catch (_) {
        return res.status(401).json({
            message: "Authentication failed!!",
        });
    }
};

export default authMiddleware;
