import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UsuarioService} from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import {UsuarioDocument} from "../usuario/schema/usuario.schema";

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
    ) {
    }

    async validateUser(email: string, senha: string): Promise<any> {
        const usuario = await this.usuarioService.findByEmail(email);

        if (!usuario) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const isMatch = await bcrypt.compare(senha, usuario.senha);

        if (!isMatch) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        // Solução 1: Converter para documento Mongoose (se possível)
        const usuarioDoc = usuario as unknown as UsuarioDocument;
        const {senha: _, ...result} = usuarioDoc.toObject();

        // OU Solução 2: Trabalhar diretamente com o objeto
        // const {senha: _, ...result} = usuario as any;

        return result;
    }

    async login(user: any) {
        const payload = {
            email: user.email,
            sub: user._id,
            freelancerId: user.freelancer
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user._id,
                email: user.email,
                freelancerId: user.freelancer
            }
        };
    }

    async refreshToken(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken);
            const user = await this.usuarioService.findById(payload.sub);

            if (!user) {
                throw new UnauthorizedException('Token de atualização inválido');
            }

            const newPayload = {
                email: user.email,
                sub: user._id,
                freelancerId: user.freelancer
            };

            return {
                access_token: this.jwtService.sign(newPayload),
                user: {
                    id: user._id,
                    email: user.email,
                    freelancerId: user.freelancer
                }
            };
        } catch (error) {
            throw new UnauthorizedException('Token de atualização inválido');
        }
    }
}
