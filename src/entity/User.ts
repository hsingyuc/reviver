import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Receiver } from "./Receiver";
import { Event } from "./Event";
import { Length, IsEmail, IsNotEmpty } from 'class-validator';
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @IsNotEmpty()
    username: string;

    @Column()
    @Length(6, 20, { message: 'Please use a password between 6 to 20 characters' })
    password: string;

    @Column()
    @IsNotEmpty()
    firstName: string;

    @Column()
    @IsNotEmpty()
    lastName: string;

    @Column()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsNotEmpty()
    phone: string;

    @OneToMany(() => Receiver, receiver => receiver.user)
    receivers: Receiver[];

    @OneToMany(() => Event, event => event.user)
    events: Event[];

}
