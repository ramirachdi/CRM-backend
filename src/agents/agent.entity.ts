import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Compagne } from '../compagnes/compagne.entity';
import { Statistics } from '../statistics/statistics.entity';
import { Presence } from '../presences/presence.entity';

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

  @OneToMany(() => Statistics, (statistics) => statistics.agent)
  statistics: Statistics[];

  @OneToMany(() => Presence, (presence) => presence.agent)
  presences: Presence[];

}
