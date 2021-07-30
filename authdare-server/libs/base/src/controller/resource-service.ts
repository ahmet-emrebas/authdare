import { FindManyResponse } from "./find-response";

export interface ResourceService<Q, R, C, U> {
    create(createTaskDTO: C): Promise<R>
    find(query: Q): Promise<FindManyResponse<R>>
    findOne(id: number): Promise<R>
    update(id: number, updateTaskDto: U): Promise<any>
    softDelete(id: number): Promise<any>
}