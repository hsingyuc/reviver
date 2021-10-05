import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Receiver } from "./Receiver";
import { User } from "./User";

enum Status {
	Ongoing,
	Updated,
	Completed
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

	@Column('int')
	status: Status;

	@Column()
	note: string;

	@ManyToMany(() => Receiver)
	@JoinTable()
	receivers: Receiver[];

	@ManyToOne(() => User, user => user.events)
	user: User;

}
