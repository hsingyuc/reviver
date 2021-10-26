import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate, getRepository } from "typeorm";
import { Receiver } from "./Receiver";
import { Event } from "./Event";
import { Length, IsEmail, IsNotEmpty } from 'class-validator';

const bcrypt = require('bcrypt');
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

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        if (this.password) {
            this.password = bcrypt.hashSync(this.password, 10);
        }
    }

    static async checkLogin(username: string) {
        if (!username) {
            throw { code: 400, message: 'Username is required!' };
        }

        const repository = getRepository(User);
        const user = await repository.findOne({ username: username })

        if (!user) {
            throw { code: 401, message: 'No user with that username found!' };
        }

        // @Todo add check password function
        return user;
    }

}
