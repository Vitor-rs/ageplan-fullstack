// freelancer/dto/create-freelancer.dto.ts
import {IsArray, IsMongoId, IsObject, IsOptional, IsString} from 'class-validator';
import {Types} from 'mongoose';

export class CreateFreelancerDto {
    @IsMongoId()
    pessoa!: Types.ObjectId;

    @IsArray()
    @IsString({each: true})
    especialidades!: string[];

    @IsString()
    @IsOptional()
    cnpj?: string;

    @IsString()
    @IsOptional()
    biografia?: string;

    @IsString()
    @IsOptional()
    website?: string;

    @IsObject()
    @IsOptional()
    redesSociais?: {
        instagram?: string;
        facebook?: string;
        linkedin?: string;
        twitter?: string;
    };
}