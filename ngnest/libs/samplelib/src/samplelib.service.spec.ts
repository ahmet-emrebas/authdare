import { Test, TestingModule } from '@nestjs/testing';
import { SamplelibService } from './samplelib.service';

describe('SamplelibService', () => {
  let service: SamplelibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SamplelibService],
    }).compile();

    service = module.get<SamplelibService>(SamplelibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
