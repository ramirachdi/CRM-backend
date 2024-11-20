import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn,
  } from 'typeorm';
  import { Agent } from '../agents/agent.entity';
  import { Details } from '../details/details.entity'; // Placeholder for the details entity
  
  @Entity()
  export class Presence {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'date' })
    date: Date;
  
    @Column({ type: 'time' }) // Use 'time' type for proper handling of time
    login: string;
  
    @Column({ type: 'time' }) // Use 'time' type for proper handling of time
    logout: string;
  
    @Column({ type: 'time' }) // Use 'time' type for the calculated duration
    dureeLog: string;
  
    @OneToOne(() => Details, { cascade: true, eager: true })
    @JoinColumn()
    details: Details;
  
    @ManyToOne(() => Agent, (agent) => agent.presences, { onDelete: 'CASCADE' })
    agent: Agent;
  }
  