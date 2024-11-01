import { Column, Entity, JoinColumn, ObjectIdColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./booking";

@Entity('room')

export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Booking, (booking)=> booking.room)
    booking: Booking[];
}