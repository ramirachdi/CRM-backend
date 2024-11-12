import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
