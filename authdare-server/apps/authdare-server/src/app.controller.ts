import { Controller, Get, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('uploadfiles')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'file1', maxCount: 1 },
    { name: 'file2', maxCount: 2 }
  ]))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }
}
