import { genToken, QueryOptions } from "@authdare/common";
import { NotImplementedException } from "@nestjs/common";

export const RESOURCE_SERVICE_TOKEN = genToken();

export class ResourceService<Entity = any, CreateDTO = any, UpdateDTO = any, UpdateResult = any, DeleteResult = any> {

    find(queryOptions: QueryOptions<Entity>): Promise<Entity[]> | never {
        throw new NotImplementedException();
    }

    findOne(queryOption: QueryOptions<Entity>): Promise<Entity> | never {
        throw new NotImplementedException();
    }

    findOneById(id: number): Promise<Entity> | never {
        throw new NotImplementedException()
    }

    save(value: CreateDTO): Promise<Entity> {
        throw new NotImplementedException();
    }

    update(id: number, value: UpdateDTO): Promise<UpdateResult> {
        throw new NotImplementedException();
    }

    delete(id: number, hard?: boolean): Promise<DeleteResult> {
        throw new NotImplementedException();
    }

}