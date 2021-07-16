import { Module } from '@nestjs/common';
import { SamplelibService } from './samplelib.service';

@Module({
  providers: [SamplelibService],
  exports: [SamplelibService],
})
export class SamplelibModule {}
