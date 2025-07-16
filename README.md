# Todo-List

Um sistema de gerenciamento de tarefas desenvolvido com Node.js, TypeScript e Fastify.

**Desenvolvido por:** Tico1606

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Fastify** - Framework web rápido e eficiente
- **Prisma** - ORM para gerenciamento do banco de dados
- **PostgreSQL** - Banco de dados relacional
- **Zod** - Validação de schemas TypeScript-first

### Ferramentas de Desenvolvimento
- **Biome** - Linter e formatter de código
- **Vitest** - Framework de testes
- **TSX** - Executor TypeScript para desenvolvimento
- **Docker** - Containerização

### Utilitários
- **Day.js** - Manipulação de datas
- **Dotenv** - Gerenciamento de variáveis de ambiente

## 🏗️ Padrões de Projeto

- **Clean Architecture** - Separação clara de responsabilidades em camadas
- **Repository Pattern** - Abstração da camada de dados
- **Use Cases** - Encapsulamento da lógica de negócio
- **DTOs** - Data Transfer Objects para validação de entrada
- **Dependency Injection** - Inversão de dependências

## ⚙️ Configuração e Setup

### Pré-requisitos
- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- npm ou yarn

### 1. Clonar o repositório
```bash
git clone <url-do-repositorio>
cd todolist
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
DATABASE_URL="postgresql://docker:docker@localhost:5432/todolist"
```

### 4. Iniciar o banco de dados
```bash
docker-compose up -d
```

### 5. Executar migrações do Prisma
```bash
npx prisma migrate dev
```

### 6. Gerar o cliente Prisma
```bash
npx prisma generate
```

## 🚀 Scripts Disponíveis

```bash
npm run dev

npm run start

npm run test
npm run test:watch
npm run test:ui
```

## 📊 Banco de Dados

O projeto utiliza PostgreSQL com Prisma ORM. O schema inclui:

- **Task** - Entidade principal para gerenciamento de tarefas
  - ID único (UUID)
  - Nome e descrição
  - Status de conclusão
  - Data de criação e vencimento
  - Prioridade (LOW, MEDIUM, HIGH)

## 🔧 Desenvolvimento

O projeto está estruturado seguindo os princípios de Clean Architecture:

- `src/app/` - Configuração da aplicação Fastify
- `src/controllers/` - Controllers HTTP
- `src/use-cases/` - Regras de negócio
- `src/repositories/` - Camada de dados
- `src/database/` - Configuração do Prisma
- `src/dtos/` - Objetos de transferência de dados
- `src/interfaces/` - Contratos e interfaces
- `src/types/` - Definições de tipos TypeScript
