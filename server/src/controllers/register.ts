import bcrypt from "bcrypt";
import { Request, Response } from "express";

import User from "../models/User"; 

export const register = async (req: Request, res: Response): Promise<Response> => {
    const { fName, lName, email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ where: { email } });
        const hashedPassword = await bcrypt.hash(password, 10);

        if (existingUser) {
            return res.status(400).json({
                message: "User already created.",
            });
        }

        const newUser = await User.create({
            fName, 
            lName, 
            email, 
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "Successful registration.",
            user: {
                id: newUser.id,
                fName: newUser.fName,
                lName: newUser.lName,
                email: newUser.email,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
