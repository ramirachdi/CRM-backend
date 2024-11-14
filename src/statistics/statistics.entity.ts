import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Agent } from '../agents/agent.entity';
import { Compagne } from '../compagnes/compagne.entity';

@Entity()
@Unique(['agent', 'compagne', 'dateDebut', 'dateFin'])  // Ensures unique stats per agent-compagne-date range
export class Statistics {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Agent, (agent) => agent.statistics, { onDelete: 'CASCADE' })
  agent: Agent;

  @ManyToOne(() => Compagne, (compagne) => compagne.statistics, { onDelete: 'CASCADE' })
  compagne: Compagne;

  @Column()
  dateDebut: Date;

  @Column()
  dateFin: Date;

  @Column({ default: 0 })
  nombreAppelsEntrants: number;

  @Column({ default: 0 })
  dtce: number;  // Total duration of incoming communications

  @Column({ default: 0 })
  dmce: number;  // Average duration of incoming communications

  @Column({ default: 0 })
  nombreAppelsSortants: number;

  @Column({ default: 0 })
  dtcs: number;  // Total duration of outgoing communications

  @Column({ default: 0 })
  dmcs: number;  // Average duration of outgoing communications
}
