import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiService } from './api.service';

@ApiTags('ApiController')
@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) { }

  @Get()
  getHello(): string {
    return this.apiService.getHello();
  }
}
