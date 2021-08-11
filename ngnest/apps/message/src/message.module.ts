import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
    imports: [],
    controllers: [MessageController],
    providers: [MessageService],
})
export class MessageModule {
    static readonly title = 'Message Service';
    static readonly description =
        'Message Service provide message services like email and text messaging';
    static readonly path = 'msg';
}
