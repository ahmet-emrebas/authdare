import { AuthModule } from './../../auth/src/auth.module';
import { MessageModule } from './../../message/src/message.module';
import { DatabaseModule } from './../../database/src/database.module';

export const modules = [DatabaseModule, MessageModule, AuthModule];
