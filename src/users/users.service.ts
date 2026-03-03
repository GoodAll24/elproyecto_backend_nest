import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/users.dto';
import { UserResponseDto } from './dto/users-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const newUser = await this._create(createUserDto);
    return new UserResponseDto({
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      // active: newUser.active,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    });
  }

  async _create(createUserDto: CreateUserDto, manager?: EntityManager): Promise<User> {
    if (!createUserDto.email) throw new BadRequestException('El email es requerido');

    if (!createUserDto.username) throw new BadRequestException('El nombre de usuario es requerido');
    if (!createUserDto.password) throw new BadRequestException('La contraseña es requerida');

    if (createUserDto.password.length < 6)
      throw new BadRequestException('La contraseña debe tener al menos 6 caracteres');

    const repo = manager ? manager.getRepository(User) : this.userRepository;
    const { email } = createUserDto;
    const searchConditions: any[] = [];

    if (email) searchConditions.push({ email });

    if (!searchConditions) throw new BadRequestException('Se requiere un email para crear usuario');

    const existingUser = await repo.findOne({ where: searchConditions });

    if (existingUser) throw new ConflictException('email ya registrado');

    // // if (!createUserDto.active) createUserDto.active = false;

    const userEntity = repo.create({
      ...createUserDto,
    });

    return repo.save(userEntity);
  }
}
