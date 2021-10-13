import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Receiver } from "./Receiver";
import { Event } from "./Event";
import { Length } from 'class-validator';
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    accountName: string;

    @Column()
    @Length(6, 20)
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @OneToMany(() => Receiver, receiver => receiver.user)
    receivers: Receiver[];

    @OneToMany(() => Event, event => event.user)
    events: Event[];

}
