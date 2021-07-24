import { FindManyOptions } from 'typeorm';
import { cloneDeep } from "lodash";
import supertest from "supertest";

export class HttpTestService<CreateDTO extends {} = any, UpdateDTO extends {} = any> {
    constructor(private readonly basePath: string) { }

    async create(createDTO: CreateDTO) {
        return await supertest(this.basePath).post('').send(cloneDeep(createDTO));
    }

    async find(queryPath: string) {
        return await supertest(this.basePath + queryPath).get('');
    }

    async findOne(id: number) {
        return await supertest(this.basePath).get('' + id)
    }

    async query(query: FindManyOptions) {
        return await supertest(this.basePath).post('').send(query);
    }

    async patch(id: number, updateDTO: UpdateDTO) {
        return await supertest(this.basePath).patch(id + '').send(updateDTO)
    }

    async delete(id: number) {
        return await supertest(this.basePath).delete(id + '');
    }
}



export class ApiTestClass<CreateDTO extends {} = any, UpdateDTO extends {} = any> {
    constructor(private readonly http: HttpTestService,
        private readonly validCreateDtoGens: (() => CreateDTO)[],
        private readonly invalidCreateDtoGens: (() => CreateDTO)[],
        private readonly validUpdateDtoGens: (() => CreateDTO)[],
        private readonly invalidUpdateDtoGens: (() => CreateDTO)[],
    ) {


    }

    should_create_user_with_valid_data() {

    }

    shoud

}