import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
} from 'typeorm';
import { Transform } from 'class-transformer';
import { IsEmail, IsUUID, MinLength } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';
import { Role } from '@app/auth/entities/roles.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column({ unique: true, length: 255, nullable: false })
  @IsEmail({}, { message: 'El email debe ser valido' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @Column({ length: 105, nullable: false })
  firstName: string;

  @Column({ length: 105, nullable: false })
  lastName: string;

  @Column({ unique: true, length: 255, nullable: false })
  @MinLength(4, { message: 'username muy corto' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  username: string;

  @Column({ length: 90, nullable: false })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ManyToOne(() => Role)
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @DeleteDateColumn()
  // deletedAt: Date;

  // @Column({ default: false })
  // @IsBoolean()
  // active: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async normalizeEmail() {
    if (this.email)
      await new Promise<void>((resolve) => {
        this.email = this.email.toLocaleLowerCase().trim();
        resolve();
      });
  }

  @BeforeInsert()
  generateId() {
    if (this.id) this.id = uuidv4();
  }

  @BeforeInsert()
  @BeforeUpdate()
  async normalizeUsername() {
    if (this.username)
      await new Promise<void>((resolve) => {
        this.username = this.username.replaceAll(' ', '').trim();
        resolve();
      });
  }
  @BeforeInsert()
  @BeforeUpdate()
  async hashPass() {
    if (this.password)
      // Aquí iría la lógica para hashear la contraseña
      this.password = await hash(this.password, 11); // Ejemplo usando bcrypt
  }
}
