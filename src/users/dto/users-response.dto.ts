import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  constructor(user?: Partial<UserResponseDto>) {
    if (user) Object.assign(this, user);
  }

  @ApiProperty({
    description: 'ID único del usuario',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'usuario@ejemplo.com',
  })
  email: string;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan',
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    description: 'nombre unico del usuario',
    example: 'anldensj112',
    required: true,
  })
  username: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Pérez',
    required: false,
  })
  lastName?: string;

  // @ApiProperty({
  //   description: 'Indica si el usuario está activo',
  //   example: true,
  // })
  // active: boolean;

  @ApiProperty({
    description: 'Fecha de creación del usuario',
    example: '2024-03-20T12:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización del usuario',
    example: '2024-03-20T12:00:00Z',
  })
  updatedAt: Date;

  // @ApiProperty()
  // lastLogin: Date;
}
