// usuario/dto/register.dto.ts
import {IsEmail, IsNotEmpty, IsOptional, IsString, MinLength} from 'class-validator';

export class RegisterDto {
    // Dados do Usuário
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

    // Dados da Pessoa
    @IsString()
    @IsNotEmpty()
    nomeCompleto!: string;

    @IsString()
    @IsOptional()
    dataNascimento?: string;

    @IsString()
    @IsOptional()
    genero?: string;

    @IsString()
    @IsOptional()
    cpf?: string;

    @IsString()
    @IsOptional()
    telefone?: string;

    // Dados do Freelancer
    @IsString({each: true})
    @IsNotEmpty()
    especialidades!: string[];

    @IsString()
    @IsOptional()
    cnpj?: string;

    @IsString()
    @IsOptional()
    biografia?: string;
}