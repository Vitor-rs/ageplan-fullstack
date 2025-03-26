<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

#          

---

# Implementação do Sistema AgePlan com NestJS e MongoDB

Este relatório apresenta uma arquitetura completa para o sistema AgePlan - uma solução de gestão para freelancers com
integração WhatsApp via WPPConnect.

A estrutura proposta segue uma abordagem modular que facilita a manutenção e a escalabilidade, permitindo a adição de
novos recursos sem comprometer a estabilidade do sistema.

## Estrutura do Projeto

A estrutura de pastas recomendada para o projeto AgePlan organiza o código em módulos funcionais claros:

```
src/
├── auth/
│   ├── dto/
│   ├── strategies/
│   ├── schemas/
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
├── pessoa/
│   ├── dto/
│   ├── schemas/
│   ├── pessoa.controller.ts
│   ├── pessoa.module.ts
│   ├── pessoa.service.ts
├── freelancer/
│   ├── dto/
│   ├── schemas/
│   ├── freelancer.controller.ts
│   ├── freelancer.module.ts
│   ├── freelancer.service.ts
├── usuario/
│   ├── dto/
│   ├── schemas/
│   ├── usuario.controller.ts
│   ├── usuario.module.ts
│   ├── usuario.service.ts
├── whatsapp/
│   ├── dto/
│   ├── schemas/
│   ├── whatsapp.controller.ts
│   ├── whatsapp.module.ts
│   ├── whatsapp.service.ts
├── shared/
│   ├── decorators/
│   ├── filters/
│   ├── interceptors/
│   ├── mappers/
│   ├── utils/
└── app.module.ts
```

Esta estrutura pode ser gerada rapidamente utilizando o CLI do NestJS:

```bash
nest g resource auth --no-spec
nest g resource pessoa --no-spec
nest g resource freelancer --no-spec
nest g resource usuario --no-spec
nest g resource whatsapp --no-spec
```

## Modelagem de Dados com Mongoose

### Schema Pessoa (Modelo Base)

O modelo `Pessoa` serve como base para outros modelos do sistema, implementando a herança via discriminadores do
Mongoose:

```typescript
// src/pessoa/schemas/pessoa.schema.ts
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema({timestamps: true, discriminatorKey: 'kind'})
export class Pessoa extends Document {
    @Prop({required: true})
    nome: string;

    @Prop({unique: true})
    whatsappId: string;

    @Prop()
    tags: string[];

    @Prop()
    dataNascimento: Date;

    @Prop()
    genero: string;

    @Prop()
    cpf: string;

    @Prop()
    endereco: string;
}

export const PessoaSchema = SchemaFactory.createForClass(Pessoa);
```

### Schema Usuario

O modelo `Usuario` estende `Pessoa` e adiciona campos relacionados à autenticação:

```typescript
// src/usuario/schemas/usuario.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Pessoa } from '../../pessoa/schemas/pessoa.schema';

@Schema()
export class Usuario extends Pessoa {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  senha: string;

  @Prop({ type: 'ObjectId', ref: 'Freelancer' })
  freelancerId: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
```

### Schema Freelancer

O modelo `Freelancer` também estende `Pessoa` com informações específicas para prestadores de serviço:

```typescript
// src/freelancer/schemas/freelancer.schema.ts
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Pessoa} from '../../pessoa/schemas/pessoa.schema';

@Schema()
export class Freelancer extends Pessoa {
    @Prop()
    especialidade: string;

    @Prop()
    cnpj: string;

    @Prop()
    portfolioUrl: string;

    @Prop({type: [String], default: []})
    clientes: string[]; // IDs de contatos categorizados como clientes
}

export const FreelancerSchema = SchemaFactory.createForClass(Freelancer);
```

## Implementação dos Repositórios

Seguindo o padrão Repository para acesso a dados:

```typescript
// src/pessoa/repositories/pessoa.repository.ts
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Pessoa} from '../schemas/pessoa.schema';

@Injectable()
export class PessoaRepository {
    constructor(@InjectModel(Pessoa.name) private model: Model<Pessoa>) {
    }

    async findAll(): Promise<Pessoa[]> {
        return this.model.find().exec();
    }

    async findById(id: string): Promise<Pessoa> {
        return this.model.findById(id).exec();
    }

    async findByWhatsappId(whatsappId: string): Promise<Pessoa> {
        return this.model.findOne({whatsappId}).exec();
    }

    async create(entity: Partial<Pessoa>): Promise<Pessoa> {
        const newEntity = new this.model(entity);
        return newEntity.save();
    }

    async update(id: string, entity: Partial<Pessoa>): Promise<Pessoa> {
        return this.model.findByIdAndUpdate(id, entity, {new: true}).exec();
    }

    async delete(id: string): Promise<Pessoa> {
        return this.model.findByIdAndDelete(id).exec();
    }
}
```

## Serviços e Lógica de Negócio

### Serviço de Autenticação

```typescript
// src/auth/auth.service.ts
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import * as bcrypt from 'bcrypt';
import {Usuario} from '../usuario/schemas/usuario.schema';
import {LoginDto} from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
        private jwtService: JwtService
    ) {
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usuarioModel.findOne({email});
        if (user && await bcrypt.compare(pass, user.senha)) {
            const {senha, ...result} = user.toObject();
            return result;
        }
        return null;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.senha);

        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload = {
            email: user.email,
            sub: user._id,
            freelancerId: user.freelancerId
        };

        return {
            access_token: this.jwtService.sign(payload),
            user
        };
    }
}
```

## Integração com WhatsApp via WPPConnect

```typescript
// src/whatsapp/whatsapp.service.ts
import {Injectable, OnModuleInit} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import * as WPPConnect from '@wppconnect-team/wppconnect';
import {Pessoa} from '../pessoa/schemas/pessoa.schema';
import {PessoaRepository} from '../pessoa/repositories/pessoa.repository';

@Injectable()
export class WhatsappService implements OnModuleInit {
    private client: any;
    private connected = false;

    constructor(
        private pessoaRepository: PessoaRepository,
        @InjectModel('WhatsappConfig') private readonly configModel: Model<any>
    ) {
    }

    async onModuleInit() {
        // Inicializar conexão no startup da aplicação
        await this.initialize();
    }

    async initialize() {
        try {
            this.client = await WPPConnect.create({
                session: 'ageplan-session',
                autoClose: false,
                puppeteerOptions: {
                    args: ['--no-sandbox']
                }
            });

            this.connected = true;

            // Registrar event listeners
            this.client.onMessage((message) => this.handleIncomingMessage(message));

            return {status: 'connected', qrCode: null};
        } catch (error) {
            console.error('Erro ao conectar com WhatsApp:', error);
            this.connected = false;
            throw error;
        }
    }

    async getQrCode() {
        if (this.connected) {
            return {status: 'already_connected'};
        }

        return new Promise((resolve) => {
            this.client.onQR((qrCode) => {
                resolve({status: 'qrcode', qrCode});
            });
        });
    }

    private async handleIncomingMessage(message: any) {
        if (message.isGroupMsg) return; // Ignorar mensagens de grupo

        // Verificar se o contato já existe no sistema
        const contact = await this.pessoaRepository.findByWhatsappId(message.from);

        if (!contact) {
            // Obter informações de contato do WhatsApp
            const contactInfo = await this.client.getContact(message.from);

            // Criar novo contato no sistema
            const newContact = await this.pessoaRepository.create({
                nome: contactInfo.name || contactInfo.pushname || 'Sem nome',
                whatsappId: message.from,
                tags: ['novo_contato']
            });

            // Poderia adicionar lógica para notificar o freelancer sobre novo contato
        }

        // Implementar lógica adicional para processamento de mensagens
    }

    async getAllContacts() {
        if (!this.connected) {
            throw new Error('WhatsApp não conectado');
        }

        const contacts = await this.client.getAllContacts();
        return contacts.filter(c => !c.isGroup);
    }

    async sendMessage(to: string, message: string) {
        if (!this.connected) {
            throw new Error('WhatsApp não conectado');
        }

        return this.client.sendText(to, message);
    }
}
```

## Controllers para as APIs

### Controller de Pessoas

```typescript
// src/pessoa/pessoa.controller.ts
import {Controller, Get, Post, Put, Delete, Body, Param, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {PessoaService} from './pessoa.service';
import {CreatePessoaDto} from './dto/create-pessoa.dto';
import {UpdatePessoaDto} from './dto/update-pessoa.dto';

@Controller('pessoas')
@UseGuards(JwtAuthGuard)
export class PessoaController {
    constructor(private readonly pessoaService: PessoaService) {
    }

    @Get()
    findAll() {
        return this.pessoaService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.pessoaService.findById(id);
    }

    @Post()
    create(@Body() createPessoaDto: CreatePessoaDto) {
        return this.pessoaService.create(createPessoaDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatePessoaDto: UpdatePessoaDto) {
        return this.pessoaService.update(id, updatePessoaDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.pessoaService.delete(id);
    }

    @Post(':id/tags')
    addTag(@Param('id') id: string, @Body() body: { tag: string }) {
        return this.pessoaService.addTag(id, body.tag);
    }

    @Delete(':id/tags/:tag')
    removeTag(@Param('id') id: string, @Param('tag') tag: string) {
        return this.pessoaService.removeTag(id, tag);
    }
}
```

### Controller de WhatsApp

```typescript
// src/whatsapp/whatsapp.controller.ts
import {Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {WhatsappService} from './whatsapp.service';

@Controller('whatsapp')
@UseGuards(JwtAuthGuard)
export class WhatsappController {
    constructor(private readonly whatsappService: WhatsappService) {
    }

    @Get('status')
    getStatus() {
        return {connected: this.whatsappService.isConnected()};
    }

    @Get('qrcode')
    getQrCode() {
        return this.whatsappService.getQrCode();
    }

    @Get('contacts')
    getContacts() {
        return this.whatsappService.getAllContacts();
    }

    @Post('send')
    sendMessage(@Body() body: { to: string; message: string }) {
        return this.whatsappService.sendMessage(body.to, body.message);
    }

    @Post('initialize')
    initialize() {
        return this.whatsappService.initialize();
    }
}
```

## Configuração do Módulo Principal

```typescript
// app.module.ts
import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {PessoaModule} from './pessoa/pessoa.module';
import {FreelancerModule} from './freelancer/freelancer.module';
import {UsuarioModule} from './usuario/usuario.module';
import {AuthModule} from './auth/auth.module';
import {WhatsappModule} from './whatsapp/whatsapp.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI'),
            }),
            inject: [ConfigService],
        }),
        PessoaModule,
        FreelancerModule,
        UsuarioModule,
        AuthModule,
        WhatsappModule,
    ],
})
export class AppModule {
}
```

## Configurações de Segurança

### JWT Strategy para Autenticação

```typescript
// src/auth/strategies/jwt.strategies.ts
import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        return {
            userId: payload.sub,
            email: payload.email,
            freelancerId: payload.freelancerId
        };
    }
}
```

## Implementação das DTOs

```typescript
// src/pessoa/dto/create-create-pessoa.dto.ts
import {IsString, IsOptional, IsArray} from 'class-validator';

export class CreatePessoaDto {
    @IsString()
    nome: string;

    @IsString()
    @IsOptional()
    whatsappId?: string;

    @IsArray()
    @IsOptional()
    tags?: string[];

    @IsString()
    @IsOptional()
    dataNascimento?: string;

    @IsString()
    @IsOptional()
    genero?: string;

    @IsString()
    @IsOptional()
    cpf?: string;

    @IsString()
    @IsOptional()
    endereco?: string;
}
```

## Conclusão

Esta arquitetura para o sistema AgePlan oferece uma base sólida para a implementação de um sistema de gestão para
freelancers com integração WhatsApp. A estrutura modular permite fácil manutenção e extensão, enquanto a separação clara
entre camadas (controllers, services, repositories) segue as melhores práticas de desenvolvimento.

A integração com o WhatsApp via WPPConnect permite o gerenciamento eficiente de contatos e mensagens, com
funcionalidades para categorização e acompanhamento de clientes potenciais.

Para implementação inicial, recomenda-se seguir uma abordagem progressiva:

1. Configurar a estrutura base e autenticação
2. Implementar o módulo de pessoas e freelancers
3. Adicionar a integração com WhatsApp
4. Desenvolver recursos mais complexos como o fluxo Kanban para gestão de clientes

Esta implementação atende aos requisitos técnicos descritos, utilizando NestJS no backend, MongoDB para persistência de
dados, e WPPConnect para integração com WhatsApp, seguindo um padrão arquitetural organizado e escalável.

<div style="text-align: center">⁂</div>

[^1_1]: https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/27973891/c268fa98-31b5-4383-b327-e1147351a5b2/Arquiteturas-e-Metodologias-de-Desenvolvimento_-Guiado.md

[^1_2]: https://www.youtube.com/watch?v=eRpBjIKwsrE

