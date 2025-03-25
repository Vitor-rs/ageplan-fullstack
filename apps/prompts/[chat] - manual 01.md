<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

#       

---

# Implementando WPPConnect para Coleta de Dados do WhatsApp e IntegraÃ§Ã£o com MongoDB

Antes de comeÃ§ar com as configuraÃ§Ãµes especÃ­ficas, vou apresentar uma anÃ¡lise dos projetos WPPConnect disponÃ­veis,
ajudar a escolher o mais adequado para o seu caso, e detalhar a implementaÃ§Ã£o em um ambiente monorepo com NestJS,
Angular e MongoDB.

## AnÃ¡lise dos Projetos WPPConnect

Existem trÃªs projetos principais na suÃ­te WPPConnect que podem ser utilizados:

### 1. WA-JS

- **DescriÃ§Ã£o**: Projeto de baixo nÃ­vel que extrai funÃ§Ãµes diretamente do WhatsApp Web atravÃ©s de webpack[^1_1]
- **Vantagens**: Acesso direto Ã s funÃ§Ãµes internas do WhatsApp Web, maior flexibilidade
- **Desvantagens**: Requer injeÃ§Ã£o do script no navegador, mais complexo para configurar

### 2. WPPConnect Library (wppconnect)

- **DescriÃ§Ã£o**: Biblioteca Node.js que encapsula as funÃ§Ãµes do WhatsApp Web para uso em aplicaÃ§Ãµes backend[^1_2]
- **Vantagens**: API mais simples, suporte para mÃºltiplas sessÃµes, funÃ§Ãµes para envio e recebimento de mensagens
- **Desvantagens**: Menos flexÃ­vel que WA-JS em alguns aspectos

### 3. WPPConnect Server

- **Desvantagens**: Como vocÃª mencionou, Ã© outro backend completo, o que pode causar redundÃ¢ncias na sua arquitetura

## RecomendaÃ§Ã£o para o Seu Caso

Com base na sua descriÃ§Ã£o, **WPPConnect Library (wppconnect)** Ã© a opÃ§Ã£o mais adequada pois:

1. Permite integraÃ§Ã£o direta com seu backend NestJS
2. Oferece suporte para mÃºltiplas sessÃµes (Ãºtil para mÃºltiplos freelancers)
3. Tem API simples para capturar e processar dados de contatos
4. Pode ser combinado com Puppeteer para a questÃ£o da autenticaÃ§Ã£o via QR Code na interface

## ConfiguraÃ§Ã£o do Ambiente de Desenvolvimento

Vamos configurar o projeto usando Turborepo para gerenciar o monorepo:

```bash
# Criar diretÃ³rio do projeto
mkdir -p C:\Users\vitor\Documents\whatsapp-data-collector
cd C:\Users\vitor\Documents\whatsapp-data-collector

# Inicializar o projeto com Turborepo
npx create-turbo@latest

# Selecionar as opÃ§Ãµes:
# - Package manager: npm
# - Monorepo structure: apps and packages
```

### Estrutura do Monorepo

```
whatsapp-data-collector/
â”œâ”€â”€ apps/
â”‚   â”œâ”€â”€ backend-api/     # Backend NestJS
â”‚   â””â”€â”€ frontend-app/    # Frontend Angular
â”œâ”€â”€ packages/
â”‚   â”œâ”€â”€ shared-types/    # Tipos compartilhados
â”‚   â””â”€â”€ config/          # ConfiguraÃ§Ãµes compartilhadas
â””â”€â”€ package.json         # ConfiguraÃ§Ã£o do monorepo
```

## ImplementaÃ§Ã£o do Backend com NestJS

```bash
# Navegar para o diretÃ³rio de apps
cd apps

# Criar novo projeto NestJS
npx @nestjs/cli new backend-api

# Navegar para o diretÃ³rio do backend
cd backend-api

# Instalar as dependÃªncias necessÃ¡rias
npm install @wppconnect-team/wppconnect puppeteer mongoose @nestjs/mongoose @nestjs/config @nestjs/swagger @nestjs/jwt passport-jwt passport @nestjs/passport class-validator class-transformer
```

### Estrutura do Backend

Vamos criar os recursos necessÃ¡rios usando o CLI do NestJS:

```bash
# Criar recursos principais
nest g resource pessoa
nest g resource usuario
nest g resource freelancer
nest g resource auth
nest g resource whatsapp
```

### ConfiguraÃ§Ã£o da ConexÃ£o com MongoDB

Crie um arquivo `.env` na raiz do diretÃ³rio backend-api:

```
MONGODB_URI=mongodb://localhost:27017/whatsapp-collector
JWT_SECRET=sua_chave_secreta_aqui
JWT_EXPIRATION=7d
```

Modifique o `app.module.ts` para incluir as configuraÃ§Ãµes:

```typescript
import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {PessoaModule} from './pessoa/pessoa.module';
import {UsuarioModule} from './usuario/usuario.module';
import {FreelancerModule} from './freelancer/freelancer.module';
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
        UsuarioModule,
        FreelancerModule,
        AuthModule,
        WhatsappModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
```

## IntegraÃ§Ã£o com WPPConnect

Vamos criar um serviÃ§o para gerenciar a integraÃ§Ã£o com o WPPConnect. Primeiro, defina o modelo de dados para os
contatos do WhatsApp:

### DefiniÃ§Ã£o do Schema para Pessoa (Contato do WhatsApp)

```typescript
// src/pessoa/schema/pessoa.schema.ts
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type PessoaDocument = Pessoa & Document;

@Schema({timestamps: true})
export class Pessoa {
    @Prop({required: true})
    nome: string;

    @Prop()
    sobrenome: string;

    @Prop({unique: true})
    numeroWhatsapp: string;

    @Prop()
    fotoPerfil: string;

    @Prop()
    status: string;

    @Prop({type: Object})
    dadosWhatsapp: Record<string, any>;

    @Prop({type: [String]})
    grupos: string[];

    @Prop({type: [{type: Object}]})
    mensagens: Record<string, any>[];

    @Prop({default: new Date()})
    ultimaAtualizacao: Date;
}

export const PessoaSchema = SchemaFactory.createForClass(Pessoa);
```

### ImplementaÃ§Ã£o do ServiÃ§o WhatsApp

```typescript
// src/whatsapp/whatsapp.service.ts
import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import * as wppconnect from '@wppconnect-team/wppconnect';
import * as fs from 'fs';
import * as path from 'path';
import {Pessoa, PessoaDocument} from '../pessoa/schema/pessoa.schema';

@Injectable()
export class WhatsappService implements OnModuleInit {
    private client: any;
    private readonly logger = new Logger(WhatsappService.name);
    private readonly sessionDir = path.resolve(__dirname, '../../whatsapp-sessions');

    constructor(
        @InjectModel(Pessoa.name) private pessoaModel: Model<PessoaDocument>,
    ) {
        // Verificar se o diretÃ³rio de sessÃµes existe, caso contrÃ¡rio, criar
        if (!fs.existsSync(this.sessionDir)) {
            fs.mkdirSync(this.sessionDir, {recursive: true});
        }
    }

    async onModuleInit() {
        // Iniciar a sessÃ£o do WhatsApp na inicializaÃ§Ã£o do mÃ³dulo
        await this.iniciarSessao();
    }

    async iniciarSessao(sessionName = 'default-session') {
        try {
            this.logger.log(`Iniciando sessÃ£o do WhatsApp: ${sessionName}`);

            this.client = await wppconnect.create({
                session: sessionName,
                autoClose: false,
                puppeteerOptions: {
                    headless: false, // Definir como false para mostrar a interface
                    args: ['--no-sandbox', '--disable-setuid-sandbox'],
                },
                logQR: true, // Exibir QR code no terminal
                catchQR: (base64Qr, asciiQR, attempts, urlCode) => {
                    // Salvar o QR code como imagem para ser exibido na interface
                    const qrCodePath = path.join(this.sessionDir, `${sessionName}-qr.png`);
                    const qrCodeBase64 = base64Qr.replace('data:image/png;base64,', '');
                    fs.writeFileSync(qrCodePath, Buffer.from(qrCodeBase64, 'base64'));
                    this.logger.log(`QR Code salvo em: ${qrCodePath}`);
                },
                statusFind: (statusSession, session) => {
                    this.logger.log(`Status da SessÃ£o: ${statusSession}`);
                },
            });

            this.logger.log('Cliente WhatsApp inicializado com sucesso');

            // Configurar listeners de eventos
            this.configurarEventos();

            return true;
        } catch (error) {
            this.logger.error(`Erro ao iniciar sessÃ£o do WhatsApp: ${error.message}`);
            return false;
        }
    }

    private configurarEventos() {
        // Ouvir mensagens recebidas
        this.client.onMessage(async (message) => {
            this.logger.log(`Mensagem recebida: ${message.body}`);
            await this.salvarMensagem(message);
        });

        // Atualizar contatos quando disponÃ­veis
        this.client.onStateChange(async (state) => {
            if (state === 'CONNECTED') {
                this.logger.log('Cliente conectado. Sincronizando contatos...');
                await this.sincronizarContatos();
            }
        });
    }

    async sincronizarContatos() {
        try {
            const contatos = await this.client.getAllContacts();
            this.logger.log(`Sincronizando ${contatos.length} contatos`);

            // Processar contatos e salvar no banco de dados
            for (const contato of contatos) {
                if (contato.isMyContact && !contato.isGroup) {
                    const pessoaData = {
                        nome: contato.name || contato.pushname || 'Sem Nome',
                        numeroWhatsapp: contato.id.user,
                        fotoPerfil: await this.obterFotoPerfil(contato.id._serialized),
                        status: await this.obterStatus(contato.id._serialized),
                        dadosWhatsapp: contato,
                        ultimaAtualizacao: new Date(),
                    };

                    // Usar upsert para atualizar se existir ou criar se nÃ£o existir
                    await this.pessoaModel.findOneAndUpdate(
                        {numeroWhatsapp: pessoaData.numeroWhatsapp},
                        pessoaData,
                        {upsert: true, new: true},
                    );
                }
            }

            // Salvar uma cÃ³pia local em JSON para backup
            this.salvarDadosLocalJSON(contatos, 'contatos');

            return true;
        } catch (error) {
            this.logger.error(`Erro ao sincronizar contatos: ${error.message}`);
            return false;
        }
    }

    async obterFotoPerfil(contato: string) {
        try {
            const fotoPerfil = await this.client.getProfilePicFromServer(contato);
            return fotoPerfil?.imgFull || fotoPerfil?.img || null;
        } catch (error) {
            this.logger.error(`Erro ao obter foto de perfil: ${error.message}`);
            return null;
        }
    }

    async obterStatus(contato: string) {
        try {
            const status = await this.client.getStatus(contato);
            return status?.status || null;
        } catch (error) {
            this.logger.error(`Erro ao obter status: ${error.message}`);
            return null;
        }
    }

    async salvarMensagem(mensagem: any) {
        try {
            // Extrair o nÃºmero do remetente
            const numeroWhatsapp = mensagem.from.split('@')[ ^ 1_0
        ]
            ;

            // Buscar ou criar a pessoa
            let pessoa = await this.pessoaModel.findOne({numeroWhatsapp});

            if (!pessoa) {
                pessoa = new this.pessoaModel({
                    nome: mensagem.sender.pushname || 'Contato Desconhecido',
                    numeroWhatsapp,
                    mensagens: [],
                });
            }

            // Adicionar a mensagem ao array de mensagens
            pessoa.mensagens.push(mensagem);

            // Atualizar a data da Ãºltima atualizaÃ§Ã£o
            pessoa.ultimaAtualizacao = new Date();

            // Salvar no banco de dados
            await pessoa.save();

            // Salvar uma cÃ³pia local em JSON para backup
            this.salvarDadosLocalJSON([mensagem], `mensagem-${numeroWhatsapp}`);

            return true;
        } catch (error) {
            this.logger.error(`Erro ao salvar mensagem: ${error.message}`);
            return false;
        }
    }

    private salvarDadosLocalJSON(dados: any, prefixo: string) {
        try {
            const dataAtual = new Date().toISOString().replace(/:/g, '-');
            const nomeArquivo = `${prefixo}-${dataAtual}.json`;
            const caminhoArquivo = path.join(this.sessionDir, nomeArquivo);

            fs.writeFileSync(caminhoArquivo, JSON.stringify(dados, null, 2));
            this.logger.log(`Dados salvos em: ${caminhoArquivo}`);

            return true;
        } catch (error) {
            this.logger.error(`Erro ao salvar dados localmente: ${error.message}`);
            return false;
        }
    }

    // MÃ©todos para o controlador utilizar
    async getClient() {
        return this.client;
    }

    async fecharSessao() {
        if (this.client) {
            await this.client.close();
            this.logger.log('SessÃ£o do WhatsApp fechada');
            return true;
        }
        return false;
    }
}
```

### ImplementaÃ§Ã£o do Controlador WhatsApp

```typescript
// src/whatsapp/whatsapp.controller.ts
import {Controller, Get, Post, Delete, Param, Body, UseGuards} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiBearerAuth} from '@nestjs/swagger';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {WhatsappService} from './whatsapp.service';

@ApiTags('whatsapp')
@Controller('whatsapp')
export class WhatsappController {
    constructor(private readonly whatsappService: WhatsappService) {
    }

    @Post('session/:name')
    @ApiOperation({summary: 'Iniciar uma nova sessÃ£o do WhatsApp'})
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async iniciarSessao(@Param('name') name: string) {
        return {
            success: await this.whatsappService.iniciarSessao(name),
            message: `SessÃ£o ${name} iniciada. Escaneie o QR code para autenticar.`,
        };
    }

    @Get('sync-contacts')
    @ApiOperation({summary: 'Sincronizar contatos do WhatsApp'})
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async sincronizarContatos() {
        return {
            success: await this.whatsappService.sincronizarContatos(),
            message: 'Contatos sincronizados com sucesso.',
        };
    }

    @Delete('session')
    @ApiOperation({summary: 'Fechar a sessÃ£o atual do WhatsApp'})
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async fecharSessao() {
        return {
            success: await this.whatsappService.fecharSessao(),
            message: 'SessÃ£o do WhatsApp fechada com sucesso.',
        };
    }
}
```

### MÃ³dulo WhatsApp

```typescript
// src/whatsapp/whatsapp.module.ts
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {WhatsappService} from './whatsapp.service';
import {WhatsappController} from './whatsapp.controller';
import {Pessoa, PessoaSchema} from '../pessoa/schema/pessoa.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Pessoa.name, schema: PessoaSchema},
        ]),
    ],
    controllers: [WhatsappController],
    providers: [WhatsappService],
    exports: [WhatsappService],
})
export class WhatsappModule {
}
```

## ImplementaÃ§Ã£o da AutenticaÃ§Ã£o JWT

### ConfiguraÃ§Ã£o do MÃ³dulo Auth

```typescript
// src/auth/auth.module.ts
import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtStrategy} from './strategies/jwt.strategies';
import {UsuarioModule} from '../usuario/usuario.module';

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRATION', '7d'),
                },
            }),
            inject: [ConfigService],
        }),
        UsuarioModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService, JwtStrategy],
})
export class AuthModule {
}
```

### ImplementaÃ§Ã£o da EstratÃ©gia JWT

```typescript
// src/auth/strategies/jwt.strategies.ts
import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        return {userId: payload.sub, email: payload.email};
    }
}
```

## ConfiguraÃ§Ã£o do Frontend Angular

```bash
# Navegar para o diretÃ³rio de apps
cd apps

# Criar novo projeto Angular
ng new frontend-app --routing --style scss

# Navegar para o diretÃ³rio do frontend
cd frontend-app

# Instalar dependÃªncias
npm install @angular/material @angular/cdk @angular/flex-layout ngx-socket-io
```

### CriaÃ§Ã£o do Componente para Exibir o QR Code

```typescript
// src/app/components/whatsapp-qr/whatsapp-qr.component.ts
import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {interval} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-whatsapp-qr',
    templateUrl: './whatsapp-qr.component.html',
    styleUrls: ['./whatsapp-qr.component.scss']
})
export class WhatsappQrComponent implements OnInit {
    qrCodeUrl: string | null = null;
    sessionName: string = 'default-session';
    isConnected: boolean = false;
    errorMessage: string | null = null;

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
        // Verificar status da conexÃ£o
        this.checkConnectionStatus();
    }

    checkConnectionStatus() {
        this.http.get<any>(`${environment.apiUrl}/whatsapp/status`)
            .subscribe(
                response => {
                    this.isConnected = response.connected;
                    if (!this.isConnected) {
                        this.loadQrCode();
                    }
                },
                error => {
                    this.errorMessage = 'NÃ£o foi possÃ­vel verificar o status da conexÃ£o';
                    console.error('Erro ao verificar status:', error);
                }
            );
    }

    loadQrCode() {
        // Iniciar uma sessÃ£o
        this.http.post<any>(`${environment.apiUrl}/whatsapp/session/${this.sessionName}`, {})
            .subscribe(
                response => {
                    // Iniciar polling para obter o QR code atualizado
                    interval(2000)
                        .pipe(
                            switchMap(() => this.http.get<any>(`${environment.apiUrl}/whatsapp/qrcode/${this.sessionName}`))
                        )
                        .subscribe(
                            qrResponse => {
                                if (qrResponse.qrcode) {
                                    this.qrCodeUrl = qrResponse.qrcode;
                                }
                                if (qrResponse.connected) {
                                    this.isConnected = true;
                                    this.qrCodeUrl = null;
                                }
                            },
                            error => {
                                this.errorMessage = 'Erro ao obter QR code';
                                console.error('Erro ao obter QR code:', error);
                            }
                        );
                },
                error => {
                    this.errorMessage = 'NÃ£o foi possÃ­vel iniciar a sessÃ£o';
                    console.error('Erro ao iniciar sessÃ£o:', error);
                }
            );
    }

    syncContacts() {
        this.http.get<any>(`${environment.apiUrl}/whatsapp/sync-contacts`)
            .subscribe(
                response => {
                    alert(response.message);
                },
                error => {
                    this.errorMessage = 'Erro ao sincronizar contatos';
                    console.error('Erro ao sincronizar contatos:', error);
                }
            );
    }

    disconnectSession() {
        this.http.delete<any>(`${environment.apiUrl}/whatsapp/session`)
            .subscribe(
                response => {
                    this.isConnected = false;
                    alert(response.message);
                },
                error => {
                    this.errorMessage = 'Erro ao desconectar sessÃ£o';
                    console.error('Erro ao desconectar sessÃ£o:', error);
                }
            );
    }
}
```

### Template HTML para o Componente QR Code

```html
<!-- src/app/components/whatsapp-qr/whatsapp-qr.component.html -->
<div class="whatsapp-qr-container">
    <h2>ConexÃ£o com WhatsApp</h2>

    <div *ngIf="errorMessage" class="error-message">
        {{ errorMessage }}
    </div>

    <div *ngIf="!isConnected" class="qr-code-area">
        <h3>Escaneie o QR code para se conectar</h3>
        <div *ngIf="qrCodeUrl" class="qr-code">
            <img [src]="qrCodeUrl" alt="QR Code WhatsApp">
        </div>
        <div *ngIf="!qrCodeUrl" class="loading">
            Gerando QR Code...
        </div>
    </div>

    <div *ngIf="isConnected" class="connected-status">
        <p>WhatsApp conectado com sucesso!</p>
        <button mat-raised-button color="primary" (click)="syncContacts()">
            Sincronizar Contatos
        </button>
        <button mat-raised-button color="warn" (click)="disconnectSession()">
            Desconectar
        </button>
    </div>
</div>
```

## SoluÃ§Ã£o para o Problema do QR Code na Interface

Para resolver o problema de exibir o QR Code na interface do sistema, precisamos:

1. Modificar o serviÃ§o WhatsApp no backend para salvar o QR Code como imagem
2. Criar um endpoint para buscar a imagem do QR Code
3. Exibir o QR Code na interface do frontend

### Endpoint para Obter o QR Code no Backend

Adicione este mÃ©todo ao WhatsappController:

```typescript
// Adicionar ao src/whatsapp/whatsapp.controller.ts
@Get('qrcode/:name')
@ApiOperation({summary: 'Obter o QR code para autenticaÃ§Ã£o'})
async
obterQrCode(@Param('name')
name: string, @Res()
res
)
{
    const qrCodePath = path.join(this.whatsappService.getSessionDir(), `${name}-qr.png`);

    if (fs.existsSync(qrCodePath)) {
        const qrCodeBase64 = fs.readFileSync(qrCodePath, {encoding: 'base64'});
        return res.json({
            qrcode: `data:image/png;base64,${qrCodeBase64}`,
            connected: await this.whatsappService.isConnected(),
        });
    }

    return res.json({
        qrcode: null,
        connected: await this.whatsappService.isConnected(),
    });
}

@Get('status')
@ApiOperation({summary: 'Verificar status da conexÃ£o'})
async
statusConexao()
{
    return {
        connected: await this.whatsappService.isConnected(),
    };
}
```

Adicione estes mÃ©todos ao WhatsappService:

```typescript
// Adicionar ao src/whatsapp/whatsapp.service.ts
getSessionDir()
{
    return this.sessionDir;
}

async
isConnected()
{
    return this.client && this.client.isConnected();
}
```

## ConfiguraÃ§Ã£o do MongoDB

### ConexÃ£o Local vs Atlas

Para desenvolvimento local:

```
MONGODB_URI=mongodb://localhost:27017/whatsapp-collector
```

Para produÃ§Ã£o com MongoDB Atlas:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/whatsapp-collector?retryWrites=true&w=majority
```

## Deploy da AplicaÃ§Ã£o

### Backend no Render

1. Crie um arquivo `render.yaml` na raiz do projeto:

```yaml
services:
  - type: web
    name: whatsapp-collector-api
    env: node
    buildCommand: cd apps/backend-api && npm install && npm run build
    startCommand: cd apps/backend-api && npm run start:prod
    envVars:
      - key: MONGODB_URI
        sync: false
      - key: JWT_SECRET
        sync: false
      - key: JWT_EXPIRATION
        value: 7d
```

### Frontend no Vercel

Crie um arquivo `vercel.json` na pasta do frontend:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "apps/frontend-app",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/frontend-app"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/apps/frontend-app/dist/frontend-app/index.html"
    }
  ]
}
```

## ConsideraÃ§Ãµes Finais

Esta implementaÃ§Ã£o oferece:

1. Uma integraÃ§Ã£o robusta do WPPConnect com seu backend NestJS
2. Captura e armazenamento de dados de contatos do WhatsApp em MongoDB
3. AutenticaÃ§Ã£o via QR Code na interface do usuÃ¡rio
4. Estrutura completa para um monorepo com NestJS e Angular

Para melhorar a seguranÃ§a e escalabilidade:

1. Considere implementar filas com Redis ou RabbitMQ para processamento assÃ­ncrono de mensagens
2. Implemente cache para dados frequentemente acessados
3. Adicione testes unitÃ¡rios e de integraÃ§Ã£o
4. Configure logs detalhados para monitoramento
5. Implemente sistemas de backup regulares para os dados do MongoDB

Este projeto proporciona uma base sÃ³lida para vocÃª construir um sistema completo de coleta e anÃ¡lise de dados do
WhatsApp, integrando-o com seu sistema de negÃ³cios para freelancers.

## PrÃ³ximos Passos

1. Implementar a visualizaÃ§Ã£o de contatos e mensagens no frontend
2. Adicionar recursos de anÃ¡lise de dados e relatÃ³rios
3. Desenvolver funcionalidades especÃ­ficas para o domÃ­nio de negÃ³cio de freelancers
4. Expandir a API para suportar mais operaÃ§Ãµes do WhatsApp, como envio de mensagens automatizadas

<div style="text-align: center">â‚</div>

[^1_1]: https://wppconnect.io/pt-BR/docs/projects/wa-js/

[^1_2]: https://wppconnect.io/pt-BR/docs/projects/wppconnect-lib/
