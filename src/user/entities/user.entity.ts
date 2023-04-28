import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { List } from '../../list-item/entities/list.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => List, (list) => list.user)
  lists: List[];
}
