import {Test, TestingModule} from '@nestjs/testing';
import {SharedTypesService} from './shared-types.service';

describe('SharedTypesService', () => {
    let service: SharedTypesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SharedTypesService],
        }).compile();

        service = module.get<SharedTypesService>(SharedTypesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
