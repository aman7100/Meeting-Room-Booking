import { Request, Response } from 'express';
import  AppDataSource  from '../data-source';
import { ResponseParser } from "../util/response-parser";
import { User } from '../entity/user';
import  jwt from 'jsonwebtoken'
import { config } from 'dotenv';
config()
const userRepository = AppDataSource.getRepository(User)
export const createLogin=async(req:Request,res:Response)=>{
    
  const { name, password } = req.body
  const username=await userRepository.findOne({where:{name:name}})

if(!username){
    new ResponseParser()
        .setHttpCode(500)
        .setStatus(false)
        .setMessage('User Not Found!')
        .setResponseCode('ERR50000')
        .setBody({})
        .send(res);
    return;
}
else if(username.password !== password){
    new ResponseParser()
        .setHttpCode(500)
        .setStatus(false)
        .setMessage('User Not Authorized! Password incorrect!')
        .setResponseCode('ERR50000')
        .setBody({})
        .send(res);
    return;
}
   const token=jwt.sign({username},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
   new ResponseParser()
        .setHttpCode(200)
        .setStatus(true)
        .setMessage('Registration Success!')
        .setResponseCode('USR10001')
        .setBody(token)
        .send(res)
}