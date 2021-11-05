import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate, getRepository } from "typeorm";
import { Receiver } from "./Receiver";
import { Event } from "./Event";
import { Length, IsEmail, IsNotEmpty } from 'class-validator';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

    static async login(username: string, password: string) {
        if (!username) {
            throw { code: 400, message: 'Username is required!' };
        }

        if (!password) {
            throw { code: 400, message: 'Password is required!' };
        }

        const repository = getRepository(User);
        const user = await repository.findOne({ username: username })

        if (!user) {
            throw { code: 401, message: 'No user with that username found!' };
        }

        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) {
            throw { code: 401, message: 'Password is incorrect!' };
        }

        return user;
    }

    getToken() {
        const token = jwt.sign(
            { id: this.id, username: this.username },
            'secret',
            { expiresIn: "72h", }
        );

        return token;
    }

}
