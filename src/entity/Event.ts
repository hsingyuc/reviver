import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Receiver } from "./Receiver";

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

}
