import { User } from '@app/users/users.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum RoleType {
  admin = 'admin',
  regular = 'regular',
  professional = 'professional',
}

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.regular,
  })
  type: RoleType;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('simple-array')
  permissions: string[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
