import { ExceptionService } from '@authdare/common/exception';
import { ConfigService } from '@authdare/config';
import { EventService } from '@authdare/event';
import { LogService } from '@authdare/log';
import { MailTemplateService } from '@authdare/mail';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class TestController {
    constructor(
        private config: ConfigService,
        private event: EventService,
        private exception: ExceptionService,
        private mailService: MailTemplateService,
        private logService: LogService,
    ) {}
    @Get('test-config')
    test() {
        return this.config.find();
    }
    @Get('test-event')
    testEvent() {
        return this.event.find();
    }
}
