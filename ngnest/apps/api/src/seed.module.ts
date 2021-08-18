import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Module({})
export class SeedModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        throw new Error('Method not implemented.');
    }
}
