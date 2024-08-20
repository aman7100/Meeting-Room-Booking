import { Column, Entity, JoinColumn, ObjectIdColumn, OneToMany, PrimaryColumn } from "typeorm";
import { Booking } from "./booking";

@Entity('room')

export class Room {
    @ObjectIdColumn()
    id: number;

    @OneToMany(() => Booking, (booking)=> booking.room)
    booking: Booking[];
}