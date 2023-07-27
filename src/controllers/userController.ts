import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class UserController{
    async create(req: Request, res: Response){
        try {
            const { Name, Email } = req.body;
            const User = await prisma.user.create({
                data: {
                    email: Email,
                    name: Name
                }
            });
            return res.status(200).json(User);
        } 
        catch (error) {
            return res.status(500).json(error + "!");
        }
    }

    async findOne(req: Request, res: Response){
        try{
            const { userId } = req.body;
            const User = await prisma.user.findUnique({
                where:{
                    id: Number(userId)
                }
            })
            if (User != null){
                return res.status(200).json(User);
            }
            else{
                return res.status(404).json("User not found");
            }
        }
        catch(error){
            return res.status(500).json(error + "!");
        }
    }
}

export default new UserController();