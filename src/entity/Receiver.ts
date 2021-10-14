import { IsEmail } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Receiver {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    @IsEmail()
    email: string;

    @ManyToOne(() => User, user => user.receivers)
    user: User;
}
