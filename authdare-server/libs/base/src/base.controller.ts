import { Get } from '@nestjs/common';
import { Repository } from 'typeorm';
export class BaseController {
    constructor(private repo: Repository<any>) { }

    @Get()
    find() {
        this.repo.find()
    }

    findAndCount()

    findOne() { }

    findByIds() {

    }

    save() {


    }

    update() { }
    delete() { }

    deleteHard()
}