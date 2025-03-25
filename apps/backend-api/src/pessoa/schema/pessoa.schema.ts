// pessoa/schemas/pessoa.schema.ts
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type PessoaDocument = Pessoa & Document;

@Schema({timestamps: true})
export class Pessoa {
    @Prop({required: true})
    nomeCompleto!: string;

    @Prop()
    dataNascimento?: Date;

    @Prop({enum: ['M', 'F', 'Outro']})
    genero?: string;

    @Prop({unique: true, sparse: true})
    cpf?: string;

    @Prop()
    telefone?: string;

    @Prop()
    celular?: string;

    @Prop({type: Object})
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

export const PessoaSchema = SchemaFactory.createForClass(Pessoa);