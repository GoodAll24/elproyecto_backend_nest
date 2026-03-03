import { User } from '@app/users/users.entity';
import { IsBoolean, IsUUID } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
} from 'typeorm';

@Entity('loginData')
export class LoginData {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column('uuid', { nullable: false })
  @IsUUID()
  userId: string;

  @Index()
  @Column({ nullable: false })
  ip: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  success: boolean;

  @Column('jsonb', { nullable: true })
  deviceInfo?: {
    userAgent: string;
    deviceId?: string;
  };

  @ManyToOne(() => User, { nullable: false })
  user: User;
}
