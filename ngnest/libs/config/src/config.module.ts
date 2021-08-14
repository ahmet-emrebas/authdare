import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import { v4 } from 'uuid';
import { ConfigEntity } from 'apps/api/src/config/config.entity';
import { ConfigController } from './config.controller';

@Global()
@Module({
    controllers: [ConfigController],
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => {
                return {
                    name: v4(),
                    type: 'sqlite',
                    cache: {
                        duration: 1000 * 30,
                    },
                    database: './config/config.sqlite',
                    entities: [ConfigEntity],
                };
            },
        }),
        TypeOrmModule.forFeature([ConfigEntity]),
    ],
    providers: [ConfigService],
    exports: [ConfigService],
})
export class ConfigModule {}
