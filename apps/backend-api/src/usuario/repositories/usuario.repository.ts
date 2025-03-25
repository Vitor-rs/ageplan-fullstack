// usuario/repositories/usuario.repository.ts
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Usuario, UsuarioDocument} from '../schema/usuario.schema';

@Injectable()
export class UsuarioRepository {
    constructor(
        @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>,
    ) {
    }

    async findAll(): Promise<Usuario[]> {
        return this.usuarioModel.find().exec();
    }

    async findById(id: string): Promise<Usuario | null> {
        return this.usuarioModel.findById(id).exec();
    }

    async findByEmail(email: string): Promise<Usuario | null> {
        return this.usuarioModel.findOne({email}).exec();
    }

    // usuario/repositories/usuario.repository.ts
    async create(usuario: Partial<Usuario>): Promise<UsuarioDocument> {
        const newUsuario = new this.usuarioModel(usuario);
        return newUsuario.save();
    }

    async update(id: string, usuario: Partial<Usuario>): Promise<Usuario | null> {
        return this.usuarioModel.findByIdAndUpdate(id, usuario, {new: true}).exec();
    }

    async delete(id: string): Promise<any> {
        return this.usuarioModel.findByIdAndDelete(id).exec();
    }
}