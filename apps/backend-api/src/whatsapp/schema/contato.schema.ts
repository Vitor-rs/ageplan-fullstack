// whatsapp/schemas/contato.schema.ts
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';

export type ContatoDocument = Contato & Document;

@Schema({timestamps: true})
export class Contato {
    @Prop({required: true})
    numeroTelefone: string;

    @Prop()
    nomePerfil: string;

    @Prop()
    fotoPerfil?: string;

    @Prop([String])
    tags?: string[];

    @Prop({type: Types.ObjectId, ref: 'Pessoa'})
    pessoa?: Types.ObjectId;

    @Prop({type: Object})
    dadosWhatsapp?: object; // Dados brutos do WPPConnect

    @Prop()
    ultimoStatus?: string;

    @Prop()
    ultimaVezOnline?: Date;
}

export const ContatoSchema = SchemaFactory.createForClass(Contato);