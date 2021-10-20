import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, CreateDateColumn } from "typeorm";
import { Receiver } from "./Receiver";
import { User } from "./User";
import { IsInt } from 'class-validator';

enum Status {
	Ongoing = 'ongoing',
	Updated = 'updated',
	Completed = 'completed'
}

@Entity()
export class Event {

	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdDate: Date;

	@Column("decimal", { precision: 8, scale: 6 })
	latitude: number;

	@Column("decimal", { precision: 9, scale: 6 })
	longitude: number;

	@Column()
	@IsInt()
	duration: number;

	@Column({ default: Status.Ongoing })
	status: Status;

	@Column()
	note: string;

	@ManyToMany(() => Receiver)
	@JoinTable()
	receivers: Receiver[];

	@ManyToOne(() => User, user => user.events)
	user: User;

}
