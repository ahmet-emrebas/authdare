import { Repository, FindManyOptions } from "typeorm";

export class ResourceService<T> {
    constructor(private readonly repository: Repository<T>) { }


    find(findManyOptions: FindManyOptions) {
        return this.repository.find(findManyOptions)
    }

    f() {
        return this.repository.find({ where: {}, })
    }
    findAll() {
        return this.repository.find()
    }

    findAllAndCount() {
        return this.repository.findAndCount()
    }

    findByIds(ids: number[]) {
        return this.repository.findByIds(ids)
    }

    findOne(id: number) {
        return this.repository.findOne(id)
    }

    findOneOrFail(id: number) {
        return this.repository.findOneOrFail(id)
    }


}