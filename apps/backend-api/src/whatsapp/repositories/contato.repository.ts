// whatsapp/repositories/contato.repository.ts
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Contato, ContatoDocument} from '../schema/contato.schema';

@Injectable()
export class ContatoRepository {
    constructor(
        @InjectModel(Contato.name) private contatoModel: Model<ContatoDocument>,
    ) {
    }

    async findAll(): Promise<Contato[]> {
        return this.contatoModel.find().populate('pessoa').exec();
    }

    async findById(id: string): Promise<Contato> {
        return this.contatoModel.findById(id).populate('pessoa').exec();
    }

    async findByNumero(numeroTelefone: string): Promise<Contato> {
        return this.contatoModel.findOne({numeroTelefone}).populate('pessoa').exec();
    }

    async findByPessoaId(pessoaId: string): Promise<Contato[]> {
        return this.contatoModel.find({pessoa: pessoaId}).exec();
    }

    async create(contato: Partial<Contato>): Promise<Contato> {
        const novoContato = new this.contatoModel(contato);
        return novoContato.save();
    }

    async update(id: string, contato: Partial<Contato>): Promise<Contato> {
        return this.contatoModel.findByIdAndUpdate(id, contato, {new: true}).exec();
    }

    async delete(id: string): Promise<any> {
        return this.contatoModel.findByIdAndDelete(id).exec();
    }

    async findByTag(tag: string): Promise<Contato[]> {
        return this.contatoModel.find({
            tags: {$elemMatch: {$eq: tag}}
        }).exec();
    }
}