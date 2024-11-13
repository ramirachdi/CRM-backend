import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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

  @ManyToOne(() => Compagne, (compagne) => compagne.agents, { onDelete: 'CASCADE' })
  compagne: Compagne;
}
