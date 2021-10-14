import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Receiver } from "./Receiver";
import { Event } from "./Event";
import { Length, IsEmail } from 'class-validator';
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    accountName: string;

    @Column()
    @Length(6, 20, { message: 'Please use a password between 6 to 20 characters' })
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    phone: string;

    @OneToMany(() => Receiver, receiver => receiver.user)
    receivers: Receiver[];

    @OneToMany(() => Event, event => event.user)
    events: Event[];

}
