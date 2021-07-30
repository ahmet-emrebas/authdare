import { Test, TestingModule } from '@nestjs/testing';
import { ClientauthService } from './clientauth.service';

describe('ClientauthService', () => {
  let service: ClientauthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientauthService],
    }).compile();

    service = module.get<ClientauthService>(ClientauthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
