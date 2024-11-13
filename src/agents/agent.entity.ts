import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Compagne } from '../compagnes/compagne.entity';

@Entity()
export class Agent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  // Many-to-many relationship with Compagnes
  @ManyToMany(() => Compagne, (compagne) => compagne.agents, { cascade: true })
  @JoinTable()
  compagnes: Compagne[];
}
