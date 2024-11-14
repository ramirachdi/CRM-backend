import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { Agent } from '../agents/agent.entity';
import { Statistics } from '../statistics/statistics.entity';

@Entity()
export class Compagne {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  typeDeService: string;

  // Many-to-many relationship with Agents
  @ManyToMany(() => Agent, (agent) => agent.compagnes)
  agents: Agent[];

  @OneToMany(() => Statistics, (statistics) => statistics.compagne)
  statistics: Statistics[];
}
