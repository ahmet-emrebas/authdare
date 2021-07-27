import { UnprocessableEntityException } from '@nestjs/common';
import { ClassConstructor } from "class-transformer";
import { validate } from "class-validator";
import { Repository } from "typeorm";
import { BasicQueryOptions, AdvanceQueryOptions } from "../common";

export class ApiResourceService<T, CreateDTO, UpdateDTO> {
    constructor(private readonly repo: Repository<T>, createDTO: ClassConstructor<CreateDTO>, updateDTO: ClassConstructor<UpdateDTO>) { }
    // private async validateDTO(dto: ClassConstructor<CreateDTO | UpdateDTO>, value: CreateDTO | UpdateDTO) {
    //     const errors = await validate(new dto(value) as any);
    //     if (errors && errors.length > 0) {
    //         throw new UnprocessableEntityException(errors);
    //     }
    // }
    async find(queryOptions: BasicQueryOptions<T>) {
        return await this.repo.find(queryOptions)
    }

    async findOneById(id: number) {
        return await this.repo.findOne(id);
    }

    /**
     * For post request query
     * @param queryOptions 
     * @returns 
     */
    async query(queryOptions: AdvanceQueryOptions<T>) {
        return await this.repo.find(queryOptions);
    }

    async save(value: CreateDTO) {
        return await this.repo.save(this.repo.create(value))
    }

    async update(id: number, updated: UpdateDTO) {
        return await this.repo.update(id, updated)
    }

    async hardDelete(id: number, hard?: boolean) {
        return await this.repo.delete(id);
    }

    async softDelete(id: number) {
        return await this.repo.softDelete(id);
    }


}