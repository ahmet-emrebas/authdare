import { ConfigService } from '@authdare/config';
import { EventService } from '@authdare/event';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class TestController {
    constructor(private config: ConfigService, private event: EventService) {}
    @Get('test-config')
    test() {
        return this.config.find();
    }
    @Get('test-event')
    testEvent() {
        return this.event.find();
    }
}
