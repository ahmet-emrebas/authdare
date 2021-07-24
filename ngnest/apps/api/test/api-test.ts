import { HttpStatus } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { cloneDeep, omit } from "lodash";
import * as supertest from 'supertest';

export class HttpTestService<CreateDTO extends {} = any, UpdateDTO extends {} = any> {
    private basePath = 'localhost:3000/api/';
    constructor(resoucePath: string) {
        this.basePath += resoucePath + '/'
    }

    async post(createDTO: CreateDTO) {
        return await supertest(this.basePath).post('').send(cloneDeep(createDTO));
    }

    async get(queryPath: string) {
        return await supertest(this.basePath + queryPath).get('');
    }

    async getOne(id: number) {
        return await supertest(this.basePath).get('' + id)
    }

    async postQuery(query: FindManyOptions) {
        return await supertest(this.basePath).post('query').send(query);
    }

    async patch(id: number, updateDTO: UpdateDTO) {
        return await supertest(this.basePath).patch(id + '').send(updateDTO)
    }

    async delete(id: number) {
        return await supertest(this.basePath).delete(id + '');
    }
}

export class ApiTest<CreateDTO extends {} = any, UpdateDTO extends {} = any> {
    private readonly http: HttpTestService
    constructor(
        resoucePath: string,
        private readonly fakeItemGen: () => CreateDTO,
        private readonly requiredFields?: string[],
        private readonly uniqueFields?: string[]
    ) {

        this.http = new HttpTestService(resoucePath)

    }

    async postTest() {
        const fakeBody = this.fakeItemGen();
        const created = await this.http.post(fakeBody);
        expect(created.status).toEqual(HttpStatus.CREATED);
        for (const [key, value] of Object.entries(fakeBody)) {
            expect(created.body[key]).toEqual(fakeBody[key]);
        }
    }

    async requiredFieldTest() {
        const fakeBody = this.fakeItemGen();
        if (!this.requiredFields) {
            expect(true).toBeTrue();
        }
        for (let rf of this.requiredFields) {
            const omittedBody = omit(fakeBody, rf)
            const response = await this.http.post(omittedBody)
            console.table(response.body);
            expect(response.status).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    patchTest() {

    }

    getTest() { }


    deleteTest() { }


}