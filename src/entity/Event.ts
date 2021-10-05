import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Receiver } from "./Receiver";

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

	@Column()
	status: string;

	@Column()
	note: string;

	@ManyToMany(() => Receiver)
	@JoinTable()
	receivers: Receiver[];

}
