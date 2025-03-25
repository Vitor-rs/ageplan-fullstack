import {Module} from '@nestjs/common';
import {SharedTypesService} from './shared-types.service';

@Module({
    providers: [SharedTypesService],
    exports: [SharedTypesService],
})
export class SharedTypesModule {
}
