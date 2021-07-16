import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';
import { Hello } from '@authdare/hello';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  getHello(): string {
    return this.apiService.getHello();
  }

  @Get('hello')
  anotherHello() {
    return Hello;
  }
}
