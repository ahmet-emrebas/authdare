import { Module } from '@nestjs/common';

@Module({
    imports: [
        // Client Template used for creating client database.
        // TypeOrmModule.forRootAsync({
        //     inject: [ConfigService],
        //     useFactory: async (config: ConfigService) => {
        //         await waitFor(4000);
        //         return {
        //             ...commonConnectionOptions,
        //             name: '<noConnection>',
        //             database: TEMPLATE_DATABASE_NAME,
        //             entities: [ClientUserEntity],
        //             synchronize: true,
        //             dropSchema: true,
        //             keepConnectionAlive: false,
        //         } as TypeOrmModuleOptions;
        //     },
        // }),
    ],
    providers: [],
})
export class ClientDatabaseModule {}
