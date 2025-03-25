import {Module} from '@nestjs/common';
import {SharedUtilsService} from './shared-utils.service';

@Module({
    providers: [SharedUtilsService],
    exports: [SharedUtilsService],
})
export class SharedUtilsModule {
}
