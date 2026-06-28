# BarberSync 💈✨

> **Sistema fullstack de agendamento para barbearias** com painel dedicado para clientes e barbeiros, desenvolvido com React 19, Node.js, PostgreSQL e TypeScript.

> **Sobre o projeto:** Este projeto foi desenvolvido de forma independente por José Hermes. Durante o processo, foram utilizadas ferramentas de IA como assistentes de apoio — Claude (Anthropic) para orientação arquitetural e revisão de código. Todo o planejamento, decisões técnicas e implementação foram conduzidos pelo autor.

---

## Veja o projeto rodando ao vivo

[![Acessar aplicação](https://img.shields.io/badge/Acessar%20aplicação-barber--sync--nu.vercel.app-blue?style=for-the-badge)](https://barber-sync-nu.vercel.app)

---

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen?style=flat-square)

---

## 📋 Sumário

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Deploy](#deploy)
- [Testes](#testes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Documentação da API](#documentação-da-api)
- [Contribuindo](#contribuindo)

---

## Visão Geral

O **BarberSync** resolve o problema de fricção no agendamento de serviços de barbearia:

- 👤 **Clientes** escolhem o serviço, data e hora, e acompanham o status em tempo real
- 💈 **Barbeiros** recebem agendamentos, confirmam/recusam e marcam como concluído
- 🔔 Sistema de notificação e validação para evitar conflitos de horário
- 🛡️ Autenticação JWT com roles (cliente/barbeiro)

### Fluxo Principal

```
1. Cliente se cadastra e realiza login
   ↓
2. Cliente escolhe serviço, data e hora
   ↓
3. Sistema valida data retroativa e conflito de horário
   ↓
4. Barbeiro recebe o agendamento como "Pendente"
   ↓
5. Barbeiro aceita/recusa ou marca como concluído
   ↓
6. Cliente acompanha status em tempo real no dashboard
```

---

## Tecnologias

### Frontend
| Tecnologia | Versão | Uso |
|---|---|---|
| **React** | 19.2.4 | UI moderna e reativa |
| **React Router** | 7.12.0 | Navegação e rotas protegidas |
| **TypeScript** | 5.9.2 | Tipagem estática |
| **React Hook Form** | 7.71.2 | Gerenciamento de formulários |
| **SCSS** | (Embedded) | Estilização modular (padrão 7-1) |
| **Axios** | 1.13.6 | Cliente HTTP |
| **Tailwind CSS** | 4.1.13 | Utility-first CSS |

### Backend
| Tecnologia | Versão | Uso |
|---|---|---|
| **Node.js** | ≥18 | Runtime JavaScript |
| **Express** | 5.2.1 | Framework web |
| **PostgreSQL** | 12+ | Banco relacional |
| **JWT** | 9.0.3 | Autenticação |
| **Bcrypt** | 6.0.0 | Hash seguro de senhas |
| **Joi** | latest | Validação de schemas |
| **Jest** | 30.3.0 | Framework de testes |
| **Supertest** | 7.2.2 | Testes de integração HTTP |

---

## Funcionalidades

### 🔐 Autenticação & Autorização
- ✅ Cadastro e login com validação de email
- ✅ Autenticação JWT com expiração configurável
- ✅ Proteção de rotas por perfil (cliente/barbeiro)
- ✅ Hash seguro de senhas com bcrypt (10 rounds)

### 📅 Agendamento
- ✅ Criação de agendamentos com validação de data retroativa
- ✅ Verificação de conflito de horário (double booking)
- ✅ Seleção de serviço com preço e duração
- ✅ Adição de notas/observações

### 💼 Dashboard do Cliente
- ✅ Listar todos seus agendamentos
- ✅ Ver detalhes: serviço, data, status, preço
- ✅ Cancelar agendamentos (soft delete)
- ✅ Acompanhar status em tempo real

### 💈 Dashboard do Barbeiro
- ✅ Listar todos os agendamentos do dia
- ✅ Ver informações do cliente (nome, email)
- ✅ Aceitar, recusar ou marcar como concluído
- ✅ Filtrar por status (pendente, confirmado, etc)

### 🏷️ Status de Agendamento
- `pending` → Aguardando confirmação do barbeiro
- `confirmed` → Barbeiro confirmou o agendamento
- `completed` → Serviço realizado
- `cancelled` → Agendamento cancelado

---

## Requisitos

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0 ou **yarn** ≥ 3.0.0
- **PostgreSQL** ≥ 12.0
- Git

Verifique suas versões:
```bash
node --version
npm --version
psql --version
```

---

## Instalação

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/Neto13k/barber-sync.git
cd barber-sync
```

### 2️⃣ Configurar Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` baseado em `.env.example`:

```env
# Servidor
PORT=3000
NODE_ENV=development

# Banco de Dados
DB_USER=seu_usuario
DB_HOST=localhost
DB_NAME=barber_sync
DB_PASSWORD=sua_senha
DB_PORT=5432

# JWT
JWT_SECRET=sua_chave_secreta_muito_segura_aqui
JWT_EXPIRE=1h
```

**⚠️ IMPORTANTE:** Nunca faça commit do `.env`. Use `.env.example` como template.

Crie o banco de dados e as tabelas:

```bash
# Conectar ao PostgreSQL e criar database
psql -U seu_usuario -h localhost

# No prompt psql:
CREATE DATABASE barber_sync;
\q

# Executar script SQL
psql -U seu_usuario -d barber_sync -f backend/database/database.sql
```

Inicie o servidor:

```bash
npm run dev
```

✅ Server rodando em: `http://localhost:3000`

### 3️⃣ Configurar Frontend

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend rodando em: `http://localhost:5173`

---

## Deploy

O projeto está em produção e pode ser acessado em:

**🔗 https://barber-sync-nu.vercel.app/**

### Infraestrutura

| Camada | Plataforma | Observação |
|--------|------------|------------|
| Frontend | [Vercel](https://vercel.com) | Build automático a cada push na `main` |
| Backend | [Render](https://render.com) | Serviço Web com Node.js |
| Banco de Dados | Render PostgreSQL | Instância gerenciada pelo Render |

### Variáveis de Ambiente em Produção

**Vercel (Frontend)**

| Variável | Valor |
|----------|-------|
| `VITE_API_URL` | `https://barber-sync.onrender.com` |

**Render (Backend)**

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | String de conexão interna do PostgreSQL (gerada pelo Render) |
| `JWT_SECRET` | Chave secreta para assinatura dos tokens JWT |
| `NODE_ENV` | `production` |
| `PORT` | Injetado automaticamente pelo Render |

### Start Command (Render)

```
node backend/server/server.js
```

### Observações

- O plano gratuito do Render suspende o serviço após 15 minutos de inatividade. A primeira requisição pode levar até 60 segundos.
- Variáveis de ambiente adicionadas no Vercel só são aplicadas após um novo deploy.

---

## Testes

O projeto inclui testes de integração cobrindo os fluxos críticos:

### Rodar todos os testes

```bash
cd backend
npm test
```

### Rodar em modo watch (re-executa ao salvar)

```bash
npm run test:watch
```

### Ver cobertura de código

```bash
npm run test:coverage
```

### O que é testado?

✅ **Autenticação**
- Registro com sucesso
- Email duplicado (erro 409)
- Login válido com token
- Email inexistente (erro 404)
- Senha incorreta (erro 401)

✅ **Agendamentos**
- Listar serviços (rota pública)
- Criar agendamento sem token (erro 401)
- Data retroativa (erro 400)
- Conflito de horário (erro 409)
- Criar agendamento válido
- Acesso negado para cliente alterar status
- Barbeiro confirmar/recusar/concluir

✅ **Autorização**
- Apenas barbeiros podem ver todos os agendamentos
- Cliente só vê seus próprios agendamentos

---

## Estrutura do Projeto

```
barber-sync/
├── backend/
│   ├── server/
│   │   └── server.js              # Configuração principal do Express
│   ├── routes/
│   │   ├── user.routes.js         # Rotas de autenticação
│   │   └── appointment.routes.js  # Rotas de agendamento
│   ├── controllers/
│   │   ├── userController.js      # Lógica de autenticação
│   │   └── appointmentController.js # Lógica de agendamento
│   ├── middleware/
│   │   ├── authMiddleware.js      # Validação JWT
│   │   ├── validateRequest.js     # Validação de entrada
│   │   └── errorHandler.js        # Tratamento de erros global
│   ├── validators/
│   │   ├── userValidator.js       # Schemas Joi para usuários
│   │   └── appointmentValidator.js # Schemas Joi para agendamentos
│   ├── database/
│   │   ├── barber_sync.js         # Pool de conexão PostgreSQL
│   │   └── database.sql           # Schema e seed do banco
│   ├── tests/
│   │   ├── setup.js               # Configuração de testes
│   │   ├── unit/
│   │   │   └── authMiddleware.test.js
│   │   └── integration/
│   │       ├── users.test.js
│   │       └── appointments.test.js
│   ├── .env.example               # Template de variáveis
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── routes/                # Páginas e rotas
│   │   ├── components/            # Componentes reutilizáveis
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── services/              # Chamadas à API
│   │   ├── styles/                # SCSS (padrão 7-1)
│   │   └── App.tsx
│   ├── public/                    # Assets estáticos
│   └── package.json
│
└── README.md
```

---

## Documentação da API

### Base URL
```
http://localhost:3000
```

### Autenticação

Todas as rotas autenticadas requerem header:
```
Authorization: Bearer <seu_token_jwt>
```

### Endpoints

#### Usuários

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------| 
| POST | `/users/register` | Cadastro de novo usuário | ❌ Não |
| POST | `/users/login` | Login e gerar token JWT | ❌ Não |

**POST /users/register**
```json
{
  "firstName": "Jose",
  "lastName": "Silva",
  "email": "jose@example.com",
  "password": "senha123456",
  "isBarber": false
}
```

**POST /users/login**
```json
{
  "email": "jose@example.com",
  "password": "senha123456"
}
```

Resposta (201):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "firstName": "Jose",
    "lastName": "Silva",
    "email": "jose@example.com",
    "isBarber": false
  }
}
```

#### Agendamentos

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------| 
| GET | `/appointments/services` | Listar serviços | ❌ Não |
| POST | `/appointments` | Criar agendamento | ✅ Sim |
| GET | `/appointments` | Meus agendamentos | ✅ Sim |
| GET | `/appointments/all` | Todos (apenas barbeiro) | ✅ Sim |
| PUT | `/appointments/:id` | Atualizar status | ✅ Sim |
| DELETE | `/appointments/:id` | Cancelar agendamento | ✅ Sim |

**POST /appointments**
```json
{
  "serviceId": 1,
  "appointmentDate": "2026-06-25T10:30:00Z",
  "notes": "Gostaria de um acabamento especial"
}
```

**GET /appointments/services** — Resposta (200):
```json
[
  {
    "id": 1,
    "title": "Corte na máquina",
    "description": "Serviço rápido e preciso",
    "price": "10.00",
    "duration_minutes": 20
  }
]
```

---

## Banco de Dados

### Diagrama ER

```
┌──────────────────┐
│     USERS        │
├──────────────────┤
│ id (PK)          │
│ first_name       │
│ last_name        │
│ email (UNIQUE)   │
│ password         │
│ is_barber        │
│ created_at       │
└────────┬─────────┘
         │ 1
         │ N
    ┌────▼──────────────────┐
    │   APPOINTMENTS        │
    ├───────────────────────┤
    │ id (PK)               │
    │ client_id (FK)        │
    │ service_id (FK)       │
    │ appointment_date      │
    │ notes                 │
    │ status                │
    │ created_at            │
    └────┬──────────┬───────┘
         │          │ 1
         │      ┌───▼──────────────┐
         │      │    SERVICES      │
         │      ├──────────────────┤
         │      │ id (PK)          │
         │      │ title            │
         │      │ description      │
         │      │ price            │
         │      │ duration_minutes │
         │      │ created_at       │
         │      └──────────────────┘
         │ N
```

### Índices de Performance

```sql
CREATE INDEX idx_appointments_client_id ON appointments(client_id);
CREATE INDEX idx_appointments_appointment_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
```

---

## Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrão de Commits

```
feat: adiciona nova funcionalidade
fix: corrige bug existente
docs: atualiza documentação
refactor: refatora código sem alterar funcionalidade
test: adiciona ou atualiza testes
style: mudanças de formatação (não afeta lógica)
chore: tarefas de manutenção
```

---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

## Autor

**Jose Neto** | Desenvolvedor Full Stack

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jose-hermes-dev/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Neto13k)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:jose.hermes.dev@gmail.com)

---

## Suporte

Encontrou um bug? Abra uma [issue no GitHub](https://github.com/Neto13k/barber-sync/issues).

---

**Última atualização:** Junho 2026