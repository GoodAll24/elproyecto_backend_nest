import { RoleType } from '@app/auth/entities/roles.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Correo del usuario',
    example: 'elusuario@example.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Nombre del usuario',
    examples: ['Pedro', 'Pedro Juan'],
    required: true,
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Apellidos del usuario',
    examples: ['Perez', 'Perez Garcia'],
    required: true,
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'nombre unico de usuario',
    example: 'pedroperez322',
    required: true,
    readOnly: true,
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'contraseñasegura123',
    required: true,
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'roles del usuario',
    examples: ['regular', 'professional', 'admin'],
    required: true,
  })
  @IsEnum(RoleType)
  roles: RoleType;
  // @ApiProperty({
  //   description: 'si el usuario esta usable o no',
  //   example: true,
  //   default: false,
  // })
  // @IsBoolean()
  // @IsOptional()
  // active?: boolean;
}
