import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Agent } from '../agents/agent.entity';

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

  @Column({ nullable: true })
  detailsId: number; // Assuming a future relationship
}
