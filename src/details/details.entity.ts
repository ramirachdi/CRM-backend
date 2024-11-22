import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Presence } from '../presences/presence.entity';

@Entity()
export class Details {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json', { nullable: false })
  data: { type: string; value: string }[]; // Example: [{ type: "pause cafe", value: "00:30:00" }]

  @OneToOne(() => Presence, (presence) => presence.details, { onDelete: 'CASCADE' })
  @JoinColumn()
  presence: Presence;
}
