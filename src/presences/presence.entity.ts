import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne
} from 'typeorm';
import { Agent } from '../agents/agent.entity';
import { Details } from '../details/details.entity';

@Entity()
export class Presence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  login: string;

  @Column({ type: 'time' })
  logout: string;

  @Column({ type: 'time', nullable: true })
  dureeLog: string;

  @ManyToOne(() => Agent, (agent) => agent.presences, { eager: true })
  @JoinColumn({ name: 'agentId' })
  agent: Agent;

  @OneToOne(() => Details, (details) => details.presence, { cascade: true, eager: true })
  details: Details;
}
