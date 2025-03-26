import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {PessoaModule} from './pessoa/pessoa.module'
import {UsuarioModule} from './usuario/usuario.module';
import {FreelancerModule} from './freelancer/freelancer.module';
import {WhatsappModule} from './whatsapp/whatsapp.module';
import {getMongoConfig} from './config/database.config';
import jwtConfig from './config/jwt.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [jwtConfig],
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoConfig,
        }),
        AuthModule,
        PessoaModule,
        UsuarioModule,
        FreelancerModule,
        WhatsappModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
