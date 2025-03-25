import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {ConfigService} from '@nestjs/config';
import {firstValueFrom} from 'rxjs';
import {PessoaRepository} from './pessoa.repository';
import {Pessoa} from './schemas/pessoa.schema';
import {CreatePessoaDto, UpdatePessoaDto} from './dto';

@Injectable()
export class PessoaService {
    private readonly logger = new Logger(PessoaService.name);
    private readonly wppConnectUrl: string;
    private readonly sessionName: string;

    constructor(
        private readonly pessoaRepository: PessoaRepository,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.wppConnectUrl = this.configService.get<string>('WPPCONNECT_URL');
        this.sessionName = this.configService.get<string>('WPPCONNECT_SESSION', 'AGEPLAN_SESSION');
    }

    async findAll(): Promise<Pessoa[]> {
        return this.pessoaRepository.findAll();
    }

    async findById(id: string): Promise<Pessoa> {
        const pessoa = await this.pessoaRepository.findById(id);
        if (!pessoa) {
            throw new NotFoundException(`Pessoa com ID ${id} não encontrada`);
        }
        return pessoa;
    }

    async findByWhatsappId(whatsappId: string): Promise<Pessoa> {
        const pessoa = await this.pessoaRepository.findByWhatsappId(whatsappId);
        if (!pessoa) {
            throw new NotFoundException(`Pessoa com WhatsApp ID ${whatsappId} não encontrada`);
        }
        return pessoa;
    }

    async create(createPessoaDto: CreatePessoaDto): Promise<Pessoa> {
        return this.pessoaRepository.create(createPessoaDto);
    }

    async update(id: string, updatePessoaDto: UpdatePessoaDto): Promise<Pessoa> {
        return this.pessoaRepository.update(id, updatePessoaDto);
    }

    async remove(id: string): Promise<void> {
        return this.pessoaRepository.remove(id);
    }

    async sincronizarContatosWhatsApp(): Promise<any> {
        try {
            // Buscar contatos do WhatsApp
            const {data: contatos} = await firstValueFrom(
                this.httpService.get(`${this.wppConnectUrl}/api/${this.sessionName}/all-contacts`),
            );

            // Processar e salvar contatos
            const pessoasSalvas = [];
            for (const contato of contatos) {
                if (contato.id && contato.id.user && contato.name) {
                    const whatsappId = `${contato.id.user}@${contato.id.server}`;
                    let pessoa = await this.pessoaRepository.findByWhatsappId(whatsappId);

                    if (!pessoa) {
                        // Criar nova pessoa
                        pessoa = await this.pessoaRepository.create({
                            nome: contato.name,
                            whatsappId,
                            tags: [],
                        });
                    } else {
                        // Atualizar informações se necessário
                        if (pessoa.nome !== contato.name) {
                            pessoa = await this.pessoaRepository.update(pessoa._id, {
                                nome: contato.name,
                            });
                        }
                    }
                    pessoasSalvas.push(pessoa);
                }
            }

            return {
                total: pessoasSalvas.length,
                pessoas: pessoasSalvas,
            };
        } catch (error) {
            this.logger.error(`Erro ao sincronizar contatos: ${error.message}`);
            throw error;
        }
    }

    async adicionarTag(id: string, tag: string): Promise<Pessoa> {
        const pessoa = await this.findById(id);

        if (!pessoa.tags.includes(tag)) {
            pessoa.tags.push(tag);
            return this.pessoaRepository.update(id, {tags: pessoa.tags});
        }

        return pessoa;
    }

    async removerTag(id: string, tag: string): Promise<Pessoa> {
        const pessoa = await this.findById(id);

        pessoa.tags = pessoa.tags.filter(t => t !== tag);
        return this.pessoaRepository.update(id, {tags: pessoa.tags});
    }
}