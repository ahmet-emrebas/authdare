import { FindOneOptions, Repository } from 'typeorm';


export class BaseResourceService<Entity, CreateDTO, UpdateDTO, QueryOptions>{

    constructor(private readonly repo: Repository<Entity>) { }

    find(options: QueryOptions) { }
}