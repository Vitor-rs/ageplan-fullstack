import {Body, Controller, Post, UnauthorizedException} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoginDto} from './dto/login.dto';
import {RefreshTokenDto} from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        try {
            const user = await this.authService.validateUser(loginDto.email, loginDto.senha);
            return this.authService.login(user);
        } catch (error) {
            throw new UnauthorizedException('Credenciais inválidas');
        }
    }

    @Post('refresh-token')
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
        try {
            const newToken = await this.authService.refreshToken(refreshTokenDto.refreshToken);
            return newToken;
        } catch (error) {
            throw new UnauthorizedException('Token de atualização inválido');
        }
    }
}
