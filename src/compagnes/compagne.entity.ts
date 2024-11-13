import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Agent } from '../agents/agent.entity';

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
}
