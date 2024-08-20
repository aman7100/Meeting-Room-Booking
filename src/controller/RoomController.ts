import { NextFunction, Request, Response } from 'express';
import  AppDataSource  from '../data-source';
import { Booking } from '../entity/booking';
import { Room } from '../entity/room';
import { ResponseParser } from "../util/response-parser";
import { User } from '../entity/user';
const roomRepository = AppDataSource.getRepository(Room);
const userRepository = AppDataSource.getRepository(User);
const bookingRepository = AppDataSource.getRepository(Booking);
  export async function getAvailableRoom (req: Request, res: Response): Promise<void> {
        try {
        const {startDate, endDate} = req.body;
        const unavailableRooms = await bookingRepository.createQueryBuilder('booking')
        .leftJoinAndSelect('booking.room', 'room')
        .leftJoinAndSelect('booking.user', 'user')
        .where('booking.startDate >= :startDate AND booking.startDate <= :endDate', { startDate, endDate })
        .andWhere('booking.endDate >= :startDate AND booking.endDate <= :endDate', { startDate, endDate })
        .select('DISTINCT(room.id)')
        .getRawMany();

        const query = roomRepository.createQueryBuilder('room');
        if(unavailableRooms.length > 0){
            query.where('room.id NOT IN (:...excludedIds)', { excludedIds: unavailableRooms.map(room => room.id) })
        }
        const rooms = await query.getMany();
        res.status(200).json(rooms)
      } catch (error) {
        console.log(error)
      }
    }
    export async function createNewRoom(req: Request, res: Response): Promise<void>{
      const {roomNo}=req.body
        const newRoom = new Room();
        newRoom.id=roomNo
        await roomRepository.save(newRoom);
        new ResponseParser()
        .setHttpCode(200)
        .setStatus(true)
        .setMessage('New Room Created Successfully!')
        .setResponseCode('USR10001')
        .setBody({})
        .send(res);
    }
  export async function getBookedRooms(req:Request,res:Response,next:NextFunction) {

    const convertUTCToIST = (utcDate: Date): string => {
      
      const istOffset = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
      const istDate = new Date(utcDate.getTime() + istOffset);
      return istDate.toISOString();
    };
      const bookings = await bookingRepository.find();
    try{
     
     const result = bookings.map(booking => ({
      roomId: booking.roomId,
      userId:  booking.userId,
      startTime: convertUTCToIST(new Date(booking.startDate)),
      endTime: convertUTCToIST(new Date(booking.endDate)),
      }));
      res.json(result);
    } catch (error) {
      console.error('Error fetching booked rooms:', error);
      new ResponseParser()
        .setHttpCode(500)
        .setStatus(false)
        .setMessage('Internal server error')
        .setResponseCode('ERR50000')
        .setBody({})
        .send(res);
    }
  }