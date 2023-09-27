import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import User from "../models/User"; 
import EnvVars from "@src/constants/EnvVars";

export const login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password.",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password.",
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            EnvVars.JWT.SecretKey as string,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ 
            token, 
            user: {
                id: user.id,
                fName: user.fName,
                lName: user.lName,
                email: user.email,
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
