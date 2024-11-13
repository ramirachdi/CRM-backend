import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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

  @OneToMany(() => Agent, (agent) => agent.compagne)
  agents: Agent[];
}
