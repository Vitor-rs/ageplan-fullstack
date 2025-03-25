// usuario/dto/update-usuario.dto.ts
import {IsBoolean, IsOptional, IsString, MinLength} from 'class-validator';

export class UpdateUsuarioDto {
    @IsString()
    @IsOptional()
    @MinLength(6)
    senha?: string;

    @IsString()
    @IsOptional()
    username?: string;

    @IsBoolean()
    @IsOptional()
    ativo?: boolean;
}