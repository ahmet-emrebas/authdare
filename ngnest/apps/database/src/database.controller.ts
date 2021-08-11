import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DatabaseService } from './database.service';

@ApiTags(DatabaseController.name)
@Controller('dba')
export class DatabaseController {
    constructor(private readonly databaseService: DatabaseService) {}

    @Get()
    getHello(): string {
        return this.databaseService.getHello();
    }
}
