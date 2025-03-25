// pessoa/repositories/pessoa.repository.ts
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Pessoa, PessoaDocument} from '../schema/pessoa.schema';

@Injectable()
export class PessoaRepository {
    constructor(
        @InjectModel(Pessoa.name) private pessoaModel: Model<PessoaDocument>,
    ) {
    }

    async findAll(): Promise<Pessoa[]> {
        return this.pessoaModel.find().exec();
    }

    async findById(id: string): Promise<Pessoa | null> {
        return this.pessoaModel.findById(id).exec();
    }

    async findByCpf(cpf: string): Promise<Pessoa | null> {
        return this.pessoaModel.findOne({cpf}).exec();
    }

    async create(pessoa: Partial<Pessoa>): Promise<Pessoa> {
        const novaPessoa = new this.pessoaModel(pessoa);
        return novaPessoa.save();
    }

    async update(id: string, pessoa: Partial<Pessoa>): Promise<Pessoa | null> {
        return this.pessoaModel.findByIdAndUpdate(id, pessoa, {new: true}).exec();
    }

    async delete(id: string): Promise<Pessoa | null> {
        return this.pessoaModel.findByIdAndDelete(id).exec();
    }
}