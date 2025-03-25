// auth/auth.module.ts
import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {JwtStrategy} from './strategies/jwt.strategy';
import {UsuarioModule} from '../usuario/usuario.module';

@Module({
    imports: [
        UsuarioModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {expiresIn: '12h'},
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {
}