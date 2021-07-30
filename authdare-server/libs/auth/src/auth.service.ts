import { AuthEntity } from './entities/auth.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { resourceName } from '@authdare/utils/naming';
import { CreateAuthDTO, ReadAuthDTO, UpdateAuthDto } from './dto';


@Injectable()
export class AuthService {

  constructor(@InjectRepository(AuthEntity) private readonly authRepo: Repository<AuthEntity>) { }

  async create(createAuthDTO: CreateAuthDTO) {
    return await this.authRepo.save(this.authRepo.create(createAuthDTO as any));
  }

  async find(query: FindManyOptions<AuthEntity>) {
    const data = (await this.authRepo.find(query)).map(e => {
      return classToPlain(new ReadAuthDTO(e))
    });
    return {
      name: resourceName(AuthEntity),
      profile: "Undefined",
      count: data.length,
      data
    }
  }

  async findOne(id: number) {
    const found = await this.authRepo.findOne(id);
    return plainToClass(CreateAuthDTO, found);
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    return this.authRepo.update(id, updateAuthDto as any);
  }

  async softDelete(id: number) {
    return this.authRepo.softDelete(id);
  }
}
