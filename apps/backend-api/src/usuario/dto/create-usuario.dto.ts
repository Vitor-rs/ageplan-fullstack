// usuario/dto/create-usuario.dto.ts
import {IsBoolean, IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength} from 'class-validator';
import {Types} from 'mongoose';

export class CreateUsuarioDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    senha!: string;

    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsMongoId()
    freelancer!: Types.ObjectId;

    @IsBoolean()
    @IsOptional()
    ativo?: boolean = true;
}