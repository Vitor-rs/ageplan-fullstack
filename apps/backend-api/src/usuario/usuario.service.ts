// usuario/usuario.service.ts
import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {UsuarioRepository} from './repositories/usuario.repository';
import {CreateUsuarioDto} from './dto/create-usuario.dto';
import {UpdateUsuarioDto} from './dto/update-usuario.dto';
import {RegisterDto} from './dto/register.dto';
import {Types} from 'mongoose';

// Interfaces temporárias para o serviço
interface PessoaService {
    create(data: any): Promise<{ _id: Types.ObjectId }>;
}

interface FreelancerService {
    create(data: any): Promise<{ _id: Types.ObjectId }>;
}

@Injectable()
export class UsuarioService {
    constructor(
        private readonly usuarioRepository: UsuarioRepository,
        private readonly pessoaService: PessoaService,
        private readonly freelancerService: FreelancerService,
    ) {
    }

    async findAll() {
        return this.usuarioRepository.findAll();
    }

    async findById(id: string) {
        const usuario = await this.usuarioRepository.findById(id);
        if (!usuario) {
            throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
        }
        return usuario;
    }

    async findByEmail(email: string) {
        return this.usuarioRepository.findByEmail(email);
    }

    async create(createUsuarioDto: CreateUsuarioDto) {
        const existingUser = await this.usuarioRepository.findByEmail(createUsuarioDto.email);
        if (existingUser) {
            throw new ConflictException('Email já está em uso');
        }

        return this.usuarioRepository.create(createUsuarioDto);
    }

    async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
        await this.findById(id);
        return this.usuarioRepository.update(id, updateUsuarioDto);
    }

    async remove(id: string) {
        await this.findById(id);
        return this.usuarioRepository.delete(id);
    }

    async register(registerDto: RegisterDto) {
        const existingUser = await this.usuarioRepository.findByEmail(registerDto.email);
        if (existingUser) {
            throw new ConflictException('Email já está em uso');
        }

        // Criar pessoa
        const pessoa = await this.pessoaService.create({
            nomeCompleto: registerDto.nomeCompleto,
            dataNascimento: registerDto.dataNascimento,
            genero: registerDto.genero,
            cpf: registerDto.cpf,
            telefone: registerDto.telefone
        });

        // Criar freelancer
        const freelancer = await this.freelancerService.create({
            pessoa: pessoa._id,
            especialidades: registerDto.especialidades,
            cnpj: registerDto.cnpj,
            biografia: registerDto.biografia
        });

        // Criar usuário
        const usuario = await this.create({
            email: registerDto.email,
            senha: registerDto.senha,
            username: registerDto.username,
            freelancer: freelancer._id,
            ativo: true
        });

        // Usando desestruturação para evitar acesso direto à propriedade _id
        const {_id: usuarioId, email, username} = usuario.toObject();

        return {
            usuario: {
                _id: usuarioId,
                email,
                username
            },
            pessoa,
            freelancer
        };
    }
}