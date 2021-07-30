import { Test, TestingModule } from '@nestjs/testing';
import { ClientauthController } from './clientauth.controller';
import { ClientauthService } from './clientauth.service';

describe('ClientauthController', () => {
  let controller: ClientauthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientauthController],
      providers: [ClientauthService],
    }).compile();

    controller = module.get<ClientauthController>(ClientauthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
