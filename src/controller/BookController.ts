import { Request, Response } from 'express';
import  AppDataSource  from '../data-source';
import { Booking } from '../entity/booking';
import { Room } from '../entity/room';
import { User } from '../entity/user';
import { Between, LessThanOrEqual, MoreThanOrEqual, Not } from 'typeorm';
import { ResponseParser } from "../util/response-parser";
const roomRepository = AppDataSource.getRepository(Room);
const userRepository = AppDataSource.getRepository(User);
const bookingRepository = AppDataSource.getRepository(Booking);
export async function   createNewUser(req: Request, res: Response): Promise<void>{
    const newUser = new User();
    newUser.name = req.body.name;
    newUser.password=req.body.password;
    newUser.role=req.body.role;
    const checkUser=await userRepository.findOne({where:{name:req.body.name}})
    if(checkUser){
        new ResponseParser()
        .setHttpCode(500)
        .setStatus(false)
        .setMessage('User Exists!')
        .setResponseCode('ERR50000')
        .setBody({})
        .send(res);
    }
  else {
    await userRepository.save(newUser);
    new ResponseParser()
        .setHttpCode(200)
        .setStatus(true)
        .setMessage('User Created Succesfully!')
        .setResponseCode('USR10001')
        .setBody(newUser)
        .send(res);
   }
}

export async function createNewBooking(req: Request, res: Response): Promise<void>{
    const {userId ,roomId, startDate, endDate} = req.body;

     const user = await bookingRepository.findOne({where: {userId: userId}});
     const room = await bookingRepository.findOne({where: {roomId: roomId}});

     if(!user || !room){
        const user1=await userRepository.findOne({where: {id:userId}})
        const room1=await roomRepository.findOne({where:{id:roomId}})
        if(!user1){
            new ResponseParser()
        .setHttpCode(500)
        .setStatus(false)
        .setMessage('No Such User exists! Create a user First')
        .setResponseCode('ERR50000')
        .setBody({})
        .send(res);
        }
        else if(!room1){
            new ResponseParser()
        .setHttpCode(500)
        .setStatus(false)
        .setMessage('No Such Room Exists!')
        .setResponseCode('ERR50000')
        .setBody({})
        .send(res);
        }
        else{
         const newBooking = new Booking();
         newBooking.roomId = roomId;
         newBooking.user = userId;
         newBooking.startDate = startDate;
         newBooking.endDate = endDate;
         await bookingRepository.save(newBooking);

         new ResponseParser()
        .setHttpCode(200)
        .setStatus(true)
        .setMessage('Room Booked Successfully!')
        .setResponseCode('USR10001')
        .setBody(newBooking)
        .send(res);
         }
        }
    else{
        const overlappingBooking = await bookingRepository.findOne({
            where: [{
                endDate: Between(startDate, endDate),
                roomId: roomId
            }, {
                startDate: Between(startDate, endDate),
                roomId: roomId
            }]
        })
        
         if (overlappingBooking) {
            new ResponseParser()
            .setHttpCode(500)
            .setStatus(false)
            .setMessage('Room is already Booked for a different user!')
            .setResponseCode('ERR50000')
            .setBody({})
            .send(res);  }
        else{
        const newBooking = new Booking();
        newBooking.roomId = roomId;
        newBooking.userId = userId;
        newBooking.startDate = startDate;
        newBooking.endDate = endDate;
        await bookingRepository.save(newBooking);
        new ResponseParser()
        .setHttpCode(200)
        .setStatus(true)
        .setMessage('Room Booked Successfully!')
        .setResponseCode('USR10001')
        .setBody(newBooking)
        .send(res);
        }
    }
}