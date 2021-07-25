import { AppModules } from './app-modules';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';



@Module({
  imports: [
    ...AppModules()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
