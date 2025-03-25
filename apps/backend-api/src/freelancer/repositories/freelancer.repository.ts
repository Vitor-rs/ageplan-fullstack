// freelancer/repositories/freelancer.repository.ts
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Freelancer, FreelancerDocument} from '../schema/freelancer.schema';

@Injectable()
export class FreelancerRepository {
    constructor(
        @InjectModel(Freelancer.name) private freelancerModel: Model<FreelancerDocument>,
    ) {
    }

    async findAll(): Promise<Freelancer[]> {
        return this.freelancerModel.find().populate('pessoa').exec();
    }

    async findById(id: string): Promise<Freelancer | null> {
        return this.freelancerModel.findById(id).populate('pessoa').exec();
    }

    async findByPessoaId(pessoaId: string): Promise<Freelancer | null> {
        return this.freelancerModel.findOne({pessoa: pessoaId}).exec();
    }

    async create(freelancer: Partial<Freelancer>): Promise<Freelancer> {
        const novoFreelancer = new this.freelancerModel(freelancer);
        return novoFreelancer.save();
    }

    async update(id: string, freelancer: Partial<Freelancer>): Promise<Freelancer | null> {
        return this.freelancerModel.findByIdAndUpdate(id, freelancer, {new: true}).exec();
    }

    async delete(id: string): Promise<Freelancer | null> {
        return this.freelancerModel.findByIdAndDelete(id).exec();
    }

    async findByEspecialidade(especialidade: string): Promise<Freelancer[]> {
        return this.freelancerModel.find({
            especialidades: {$elemMatch: {$eq: especialidade}}
        }).populate('pessoa').exec();
    }
}