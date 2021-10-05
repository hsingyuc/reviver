import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Receiver {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

}
