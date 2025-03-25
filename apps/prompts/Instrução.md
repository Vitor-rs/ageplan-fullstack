# AgePlan - Sistema de Gestão para Freelancers

## Contexto

Sistema de gerenciamento para freelancers com integração WhatsApp (via WPPConnect).

- Gestão de contatos e clientes
- Classificação e categorização em fluxo Kanban
- Gerenciamento de relacionamentos com clientes

## Stack Técnica

- Backend: NestJS + MongoDB/Mongoose
- Frontend: Angular + Material UI
- Estrutura: Monorepo
- Integração: WPPConnect para WhatsApp

## Principais Modelos

- **Pessoa:** Contatos do WhatsApp (nome, número, foto, etc.)
- **Usuario:** Autenticação simples
- **Freelancer:** Extensão de Usuario
- **Auth:** Autenticação JWT
- **whatsapp:** Contatos do WhatsApp (nome, número, foto, etc.)

## Arquitetura Backend

- **Schemas/Entities** com Mongoose
- **DTOs** para validação
- **Repositories** para acesso a dados
- **Services** para lógica de negócio
- **Controllers** para endpoints REST

## Implementação WPPConnect

- Conectar ao WhatsApp Web
- Capturar contatos e metadados
- Permitir categorização via tags
- Exibir QR code para autenticação

## Exemplo de Implementação

```typescript

@Schema({timestamps: true})
export class Pessoa {
    @Prop({required: true})
    nome: string;

    @Prop({unique: true})
    whatsappId: string;

    @Prop()
    tags: string[];
}

// Padrão Repository
@Injectable()
export class PessoaRepository {
    constructor(@InjectModel(Pessoa.name) private model: Model<PessoaDocument>) {
    }

    async findAll(): Promise<Pessoa[]> {
        return this.model.find().exec();
    }
}
```

## Resposta Esperada

- Análise concisa do problema
- Código funcional seguindo padrões
- Explicação de decisões arquiteturais
- Abordagem técnica estruturada
