import { Repository, FindManyOptions } from "typeorm";
import { tryCatch } from '@authdare/utils'

export class BaseResourceService<Entity, CreateDTO, UpdateDTO> {

    constructor(private readonly repository: Repository<Entity>) { }

    async find(options: FindManyOptions) {
        return await tryCatch(() => this.repository.find(options))
    }

    async save(createDto: CreateDTO) {
        return await tryCatch(() => {
            const created = this.repository.create(createDto);
            return this.repository.save(created);
        })
    }

    async update(id: number | string, udpateDto: UpdateDTO) {
        return await tryCatch(() => {
            return this.repository.update(id, udpateDto);
        })
    }

    async delete(id: number | string) {
        tryCatch(() => {
            return this.repository.delete(id);
        })
    }

}