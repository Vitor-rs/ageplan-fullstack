# AgePlan - Sistema de Gestão para Freelancers

Sistema de gerenciamento para freelancers com integração WhatsApp (via WPPConnect).

## Funcionalidades

- Gestão de contatos e clientes
- Classificação e categorização em fluxo Kanban
- Gerenciamento de relacionamentos com clientes
- Integração com WhatsApp via WPPConnect

## Stack Técnica

- **Backend**: NestJS + MongoDB/Mongoose
- **Frontend**: Angular + Material UI
- **Estrutura**: Monorepo
- **Integração**: WPPConnect para WhatsApp

## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

- Node.js (v16+)
- npm ou yarn
- MongoDB Atlas (conta configurada)

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-username/ageplan.git
cd ageplan
```

Instale as dependências:

npm install
Configure as variáveis de ambiente:

Copie o arquivo .env.example para .env
Preencha com suas credenciais
Inicie o backend:

npm run start:api
Inicie o frontend:

npm run start:web
Deploy
GitHub Codespace
Este projeto está configurado para desenvolvimento em GitHub Codespace. Basta abrir em um codespace e o ambiente será
automaticamente configurado.
Deploy no Vercel
Conecte seu repositório GitHub ao Vercel
Configure as variáveis de ambiente no dashboard do Vercel
Use as configurações de build do arquivo vercel.json
Estrutura do Projeto

```txt
ageplan/
├── apps/
│   ├── api/           # Backend NestJS
│   └── web/           # Frontend Angular
├── libs/              # Bibliotecas compartilhadas
├── .env.example       # Exemplo de variáveis de ambiente
├── vercel.json        # Configuração para deploy no Vercel
└── README.md
```

Contribuições
Contribuições são bem-vindas! Por favor, crie um issue antes de enviar um pull request.

## 7. Workflow para GitHub Actions

Crie um arquivo `.github/workflows/ci.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Lint
        run: npm run lint
      - name: Test
        run: npm run test
        env:
          MONGODB_URI: ${{ secrets.MONGODB_URI }}
          JWT_SECRET: ${{ secrets.JWT_SECRET }}