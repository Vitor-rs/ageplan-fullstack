// pessoa/dto/create-pessoa.dto.ts
import {IsDateString, IsEnum, IsObject, IsOptional, IsString} from 'class-validator';

export class CreatePessoaDto {
    @IsString()
    nomeCompleto: string = '';

    @IsDateString()
    @IsOptional()
    dataNascimento?: string;

    @IsEnum(['M', 'F', 'Outro'])
    @IsOptional()
    genero?: string;

    @IsString()
    @IsOptional()
    cpf?: string;

    @IsString()
    @IsOptional()
    telefone?: string;

    @IsString()
    @IsOptional()
    celular?: string;

    @IsObject()
    @IsOptional()
    endereco?: {
        cep?: string;
        logradouro?: string;
        numero?: string;
        complemento?: string;
        bairro?: string;
        cidade?: string;
        estado?: string;
    };
}