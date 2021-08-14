import { Test, TestingModule } from '@nestjs/testing';
import { I18nValueService } from './i18n.service';

describe('I18nService', () => {
    let service: I18nValueService;
    let repo = class A {};
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [I18nValueService],
        }).compile();

        service = module.get<I18nValueService>(I18nValueService);
    });
});
