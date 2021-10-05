import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Receiver } from "./Receiver";
import { Event } from "./Event";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    accountName: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    phone: number;

    @OneToMany(() => Receiver, receiver => receiver.user)
    receivers: Receiver[];

    @OneToMany(() => Event, event => event.user)
    events: Event[];

}
