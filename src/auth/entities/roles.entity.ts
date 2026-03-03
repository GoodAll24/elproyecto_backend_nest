import { User } from '@app/users/users.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum RoleType {
  admin = 'admin',
  client = 'client',
  professional = 'professional',
}

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.client,
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
