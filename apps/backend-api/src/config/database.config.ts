import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (configService: ConfigService): Promise<MongooseModuleOptions> => ({
  uri: configService.get<string>('MONGODB_URI'),
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
