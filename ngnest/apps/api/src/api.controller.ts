import { Controller, Get, Session } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) { }

  @Get()
  getHello(@Session() s: any): string {
    s.visit = s.visit ? s.visit++ : 1;
    return this.apiService.getHello();
  }
}
