import { Column, Entity, JoinColumn, ManyToOne, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room";
import { User } from "./user";

@Entity('booking')
export class Booking {
    @PrimaryGeneratedColumn()
    id: number

    @Column('timestamp')
     startDate: Date

    @Column('timestamp')
    endDate: Date
    
    @Column({name: 'room_id'})
    roomId: number
    
    @Column({name:'user_id'})
    userId: number

    @ManyToOne(()=>Room, (room)=>room.booking)
    @JoinColumn({name: 'room_id'})
    room: Room

    @ManyToOne(()=>User, (user)=>user.booking)
    @JoinColumn({name: 'user_id'})
    user: User

    
}