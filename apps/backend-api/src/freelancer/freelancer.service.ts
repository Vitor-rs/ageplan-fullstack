import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {FreelancerRepository} from './freelancer.repository';
import {Freelancer} from './schemas/freelancer.schema';
import {CreateFreelancerDto, UpdateFreelancerDto} from './dto';
import {PessoaService} from '../pessoa/pessoa.service';

@Injectable()
export class FreelancerService {
    private readonly logger = new Logger(FreelancerService.name);

    constructor(
        private readonly freelancerRepository: FreelancerRepository,
        private readonly pessoaService: PessoaService,
    ) {
    }

    async findAll(): Promise<Freelancer[]> {
        return this.freelancerRepository.findAll();
    }

    async findById(id: string): Promise<Freelancer> {
        const freelancer = await this.freelancerRepository.findById(id);
        if (!freelancer) {
            throw new NotFoundException(`Freelancer com ID ${id} não encontrado`);
        }
        return freelancer;
    }

    async findByUsuarioId(usuarioId: string): Promise<Freelancer> {
        const freelancer = await this.freelancerRepository.findByUsuarioId(usuarioId);
        if (!freelancer) {
            throw new NotFoundException(`Freelancer com ID de usuário ${usuarioId} não encontrado`);
        }
        return freelancer;
    }

    async create(createFreelancerDto: CreateFreelancerDto): Promise<Freelancer> {
        // Verifica se a pessoa existe
        if (createFreelancerDto.pessoaId) {
            await this.pessoaService.findById(createFreelancerDto.pessoaId);
        }

        return this.freelancerRepository.create(createFreelancerDto);
    }

    async update(id: string, updateFreelancerDto: UpdateFreelancerDto): Promise<Freelancer> {
        // Verifica se a pessoa existe
        if (updateFreelancerDto.pessoaId) {
            await this.pessoaService.findById(updateFreelancerDto.pessoaId);
        }

        return this.freelancerRepository.update(id, updateFreelancerDto);
    }

    async remove(id: string): Promise<void> {
        return this.freelancerRepository.remove(id);
    }

    async adicionarCliente(freelancerId: string, pessoaId: string): Promise<Freelancer> {
        // Verifica se o freelancer existe
        const freelancer = await this.findById(freelancerId);

        // Verifica se a pessoa existe
        await this.pessoaService.findById(pessoaId);

        // Adiciona ao array de clientes se não existir
        if (!freelancer.clientes.includes(pessoaId)) {
            freelancer.clientes.push(pessoaId);
            return this.freelancerRepository.update(freelancerId, {clientes: freelancer.clientes});
        }

        return freelancer;
    }

    async removerCliente(freelancerId: string, pessoaId: string): Promise<Freelancer> {
        // Verifica se o freelancer existe
        const freelancer = await this.findById(freelancerId);

        // Filtra o cliente da lista
        freelancer.clientes = freelancer.clientes.filter(id => id !== pessoaId);
        return this.freelancerRepository.update(freelancerId, {clientes: freelancer.clientes});
    }

    async getDashboardStats(freelancerId: string): Promise<any> {
        const freelancer = await this.findById(freelancerId);

        // Contagem de clientes
        const totalClientes = freelancer.clientes.length;

        // Aqui poderia implementar outras métricas como:
        // - Clientes por categoria
        // - Mensagens trocadas recentemente
        // - Análise de interações

        return {
            totalClientes,
            // Outras métricas...
        };
    }
}