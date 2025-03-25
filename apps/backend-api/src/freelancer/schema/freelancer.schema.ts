// freelancer/schema/freelancer.schema.ts
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';

export type FreelancerDocument = Freelancer & Document;

@Schema({timestamps: true})
export class Freelancer {
    @Prop({type: Types.ObjectId, ref: 'Pessoa', required: true})
    pessoa!: Types.ObjectId;

    @Prop([String])
    especialidades!: string[];

    @Prop()
    cnpj?: string;

    @Prop()
    biografia?: string;

    @Prop()
    website?: string;

    @Prop({type: Object})
    redesSociais?: {
        instagram?: string;
        facebook?: string;
        linkedin?: string;
        twitter?: string;
    };
}

export const FreelancerSchema = SchemaFactory.createForClass(Freelancer);