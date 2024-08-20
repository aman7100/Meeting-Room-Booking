import { Column, Entity, JoinColumn, ObjectIdColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room";
import { Booking } from "./booking";
@Entity('user')
    
export class User {
    @ObjectIdColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    password: string;

    @Column()
    role: string;

    @OneToMany(() => Booking, booking => booking.user)
    booking: Booking[]
}