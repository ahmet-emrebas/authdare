import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessageService } from './message.service';

@ApiTags(MessageController.name)
@Controller()
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Get()
    getHello(): string {
        return this.messageService.getHello();
    }
}
