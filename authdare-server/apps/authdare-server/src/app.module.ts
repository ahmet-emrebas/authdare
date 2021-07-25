import { CommonModules } from './common-modules';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ...CommonModules()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
