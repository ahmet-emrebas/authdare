import { UserEntity } from './entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { resourceName } from '@authdare/utils/naming';
import { CreateUserDTO, ReadUserDTO, UpdateUserDto } from './dto';


@Injectable()
export class UserService {

  constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) { }
  async create(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    return await this.userRepo.save(this.userRepo.create(createUserDTO as any)) as unknown as UserEntity;
  }

  async find(query: FindManyOptions<UserEntity>) {
    const data = (await this.userRepo.find(query)).map(e => {
      return classToPlain(new ReadUserDTO(e as any))
    });
    return {
      name: resourceName(UserEntity),
      profile: "Undefined",
      count: data.length,
      data
    }
  }

  async findOne(id: number) {
    const found = await this.userRepo.findOne(id);
    return plainToClass(CreateUserDTO, found);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.update(id, updateUserDto as any);
  }

  async softDelete(id: number) {
    return this.userRepo.softDelete(id);
  }
}
