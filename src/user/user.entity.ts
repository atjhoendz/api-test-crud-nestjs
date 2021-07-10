import { IUser, UserGender } from './user.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'enum', enum: UserGender })
  gender: UserGender;

  @Column({ type: 'text', nullable: true })
  address: string;
}
