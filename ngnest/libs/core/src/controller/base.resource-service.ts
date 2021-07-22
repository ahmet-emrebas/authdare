import { Repository, FindManyOptions } from "typeorm";
import { tryCatch } from '@authdare/utils'

export class BaseResourceService<Entity, CreateDTO, UpdateDTO> {

    constructor(private readonly repository: Repository<Entity>) { }

    async find(options: FindManyOptions) {
        return await tryCatch(() => this.repository.find(options))
    }

    async save(createDto: CreateDTO) {
        return await tryCatch(() => this.repository.save(this.repository.create(createDto)))
    }

    async update(id: number | string, udpateDto: UpdateDTO) {
        return await tryCatch(() => this.repository.update(id, udpateDto))
    }

    async delete(id: number | string) {
        return await tryCatch(() => this.repository.delete(id))
    }

}