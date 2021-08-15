import { ConfigService } from '@authdare/config';
import { Controller, Get } from '@nestjs/common';

@Controller('some')
export class SomeController {
    constructor(private readonly configService: ConfigService) {}

    @Get('')
    get() {
        return this.configService.find({});
    }
}
