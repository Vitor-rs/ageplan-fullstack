// whatsapp/dto/create-contato.dto.ts
import {IsArray, IsDateString, IsMongoId, IsNotEmpty, IsObject, IsOptional, IsString} from 'class-validator';
import {Types} from 'mongoose';

export class CreateContatoDto {
    @IsString()
    @IsNotEmpty()
    numeroTelefone: string;

    @IsString()
    nomePerfil: string;

    @IsString()
    @IsOptional()
    fotoPerfil?: string;

    @IsArray()
    @IsString({each: true})
    @IsOptional()
    tags?: string[];

    @IsMongoId()
    @IsOptional()
    pessoa?: Types.ObjectId;

    @IsObject()
    @IsOptional()
    dadosWhatsapp?: object;

    @IsString()
    @IsOptional()
    ultimoStatus?: string;

    @IsDateString()
    @IsOptional()
    ultimaVezOnline?: Date;
}