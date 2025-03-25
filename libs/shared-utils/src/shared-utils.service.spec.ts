import {Test, TestingModule} from '@nestjs/testing';
import {SharedUtilsService} from './shared-utils.service';

describe('SharedUtilsService', () => {
    let service: SharedUtilsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SharedUtilsService],
        }).compile();

        service = module.get<SharedUtilsService>(SharedUtilsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
