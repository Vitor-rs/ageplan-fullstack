// usuario/schemas/usuario.schema.ts
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {CallbackError, Document, Types} from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UsuarioDocument = Usuario & Document;

@Schema({timestamps: true})
export class Usuario {
    @Prop({required: true, unique: true})
    email!: string;

    @Prop({required: true})
    senha!: string;

    @Prop({required: true, unique: true})
    username!: string;

    @Prop({type: Types.ObjectId, ref: 'Freelancer', required: true})
    freelancer!: Types.ObjectId;

    @Prop({default: true})
    ativo: boolean = true;

    @Prop()
    ultimoAcesso?: Date;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);

// Middleware para criptografar senha
UsuarioSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(this.senha, salt);
        next();
    } catch (error) {
        // Converta o erro para o tipo esperado
        next(error as CallbackError);
    }
});