import { UnprocessableEntityException } from '@nestjs/common';
import { NotAcceptableException } from '@nestjs/common';
import { QueryOptions } from "@authdare/common";
import { ResourceService } from "@authdare/core";
import { User } from "@authdare/models";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

class CreateUserDto {

}

class UpdateUserDto {

}

export class UserService implements ResourceService<User, CreateUserDto, UpdateUserDto> {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) { }

    async find(queryOptions: QueryOptions<User>): Promise<User[]> {
        try {
            return await this.userRepo.find({});
        } catch (err) {
            throw new NotAcceptableException(err);
        }
    }

    async findOne(queryOption: QueryOptions<User>): Promise<User> {
        try {
            return await this.userRepo.findOne(queryOption);
        } catch (err) {
            throw new NotAcceptableException(err);
        }
    }

    async findOneById(id: number): Promise<User> {
        try {
            return await this.userRepo.findOne(id);
        } catch (err) {
            throw new NotAcceptableException(err);
        }
    }

    async save(value: CreateUserDto): Promise<User> {
        try {
            const created = await this.userRepo.create(value);
            return await this.userRepo.save(created);
        } catch (err) {
            throw new UnprocessableEntityException(err);
        }

    }
    async update(id: number, value: UpdateUserDto): Promise<any> {
        try {
            return await this.userRepo.update(id, value);
        } catch (err) {
            throw new UnprocessableEntityException(err);
        }
    }

    async delete(id: number, hard?: boolean): Promise<any> {
        try {
            return await this.userRepo.delete(id);
        } catch (err) {
            throw new NotAcceptableException(err);
        }
    }


}