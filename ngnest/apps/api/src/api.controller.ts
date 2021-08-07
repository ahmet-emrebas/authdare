import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';
import { BehaviorSubject, firstValueFrom, lastValueFrom } from 'rxjs';

@ApiTags(ApiController.name)
@Controller()
export class ApiController {
    store = new BehaviorSubject<number[]>([]);
    constructor(private readonly apiService: ApiService) {}

    @Get('add')
    add9() {
        this.store.next([...this.store.getValue(), 1]);
    }

    @Get('read')
    async get() {
        return await firstValueFrom(this.store);
    }

    @Get()
    getHello(): string {
        return this.apiService.getHello();
    }
}
