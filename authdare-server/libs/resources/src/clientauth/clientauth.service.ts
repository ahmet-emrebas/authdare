import { ClientauthEntity } from './entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { resourceName } from '@authdare/utils/naming';
import { CreateClientauthDTO, ReadClientauthDTO, UpdateClientauthDto } from './dto';


@Injectable()
export class ClientauthService {

  constructor(@InjectRepository(ClientauthEntity) private readonly clientauthRepo: Repository<ClientauthEntity>) { }
  async create(createClientauthDTO: CreateClientauthDTO): Promise<ClientauthEntity> {
    return await this.clientauthRepo.save(this.clientauthRepo.create(createClientauthDTO as any)) as unknown as ClientauthEntity;
  }

  async find(query: FindManyOptions<ClientauthEntity>) {
    const data = (await this.clientauthRepo.find(query)).map(e => {
      return classToPlain(new ReadClientauthDTO(e as any))
    });
    return {
      name: resourceName(ClientauthEntity),
      profile: "Undefined",
      count: data.length,
      data
    }
  }

  async findOne(id: number) {
    const found = await this.clientauthRepo.findOne(id);
    return plainToClass(CreateClientauthDTO, found);
  }

  async update(id: number, updateClientauthDto: UpdateClientauthDto) {
    return this.clientauthRepo.update(id, updateClientauthDto as any);
  }

  async softDelete(id: number) {
    return this.clientauthRepo.softDelete(id);
  }
}
