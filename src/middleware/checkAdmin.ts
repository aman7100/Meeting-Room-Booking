import { NextFunction, Request, Response } from 'express';
import AppDataSource from '../data-source';
import { User } from '../entity/user';
import authenticateToken from './authMiddleware';
enum Roles {
    ADMIN = 'admin',
    USER = 'user'
}
const userRepository = AppDataSource.getRepository(User);
export const isAdmin= (req:Request,res:Response,next:NextFunction)=>{
    const user=req.body.loggedUser;
    if(user.role===Roles.ADMIN){
        next();
    }
    else{
        res.status(401).json({
            status:"Failed!",
            message:"You are not an Admin! You cannot get Other Access!"
         })
    }
}