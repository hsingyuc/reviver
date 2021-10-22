import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Receiver } from "./Receiver";
import { User } from "./User";
import { IsNotEmpty } from 'class-validator';

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
	@IsNotEmpty()
	latitude: number;

	@Column("decimal", { precision: 9, scale: 6 })
	@IsNotEmpty()
	longitude: number;

	@Column({ type: 'bigint' })
	@IsNotEmpty()
	duration: number;

	@Column({ default: Status.Ongoing })
	status: Status;

	@Column({ nullable: true })
	note: string;

	@UpdateDateColumn()
	updatedDate: Date;

	@ManyToMany(() => Receiver)
	@JoinTable()
	receivers: Receiver[];

	@ManyToOne(() => User, user => user.events)
	user: User;

}
