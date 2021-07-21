import { Public } from '@auth';
import { SampleInterceptor } from '@interceptors';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';

@UseInterceptors(SampleInterceptor)
@Controller()
export class AppController {
  public somedata = '  somedata';
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('hello')
  public async getHello(): Promise<string> {
    return (await this.appService.getHello()) + this.somedata;
  }
}
