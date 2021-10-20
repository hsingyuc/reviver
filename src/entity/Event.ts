import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, CreateDateColumn } from "typeorm";
import { Receiver } from "./Receiver";
import { User } from "./User";

enum Status {
	Ongoing = 'ongoing',
	Updated = 'updated',
	Completed = 'completed'
}

@Entity()
export class Event {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	date: number;

	@Column()
	latitude: number;

	@Column()
	longitude: number;

	@Column()
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
