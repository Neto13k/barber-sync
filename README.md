# BarberSync 💈✨

Sistema fullstack de agendamento para barbearias com painel dedicado para clientes e barbeiros.

![Demo Cliente](.github/assets/demo1.gif)
![Demo Barbeiro](.github/assets/demo2.gif)

---

## 🎯 Sobre o projeto

O BarberSync resolve um problema real: a fricção no agendamento de serviços de barbearia. Clientes escolhem o serviço, definem data e hora, e acompanham o status do pedido. Barbeiros recebem as solicitações e decidem aceitar ou recusar cada atendimento — inspirado no modelo de aceitação do Uber.

**Fluxo principal:**

1. 👤 Cliente se cadastra e realiza login
2. 📅 Escolhe o serviço, data e hora
3. 🔔 Barbeiro recebe o pedido como "Pendente"
4. ✅ Barbeiro aceita ou recusa
5. 📊 Cliente acompanha o status em tempo real no dashboard

---

## 🛠️ Tecnologias

### 🖥️ Frontend

| Tecnologia | Uso |
|---|---|
| React 19 + Vite | Interface e build |
| TypeScript | Tipagem estática |
| React Router 7 | Navegação e rotas protegidas |
| React Hook Form | Formulários com validação |
| SCSS (arquitetura 7-1) | Estilização modular |
| Axios | Consumo da API |

### ⚙️ Backend

| Tecnologia | Uso |
|---|---|
| Node.js + Express 5 | Servidor e rotas |
| PostgreSQL | Banco relacional com índices e constraints |
| JWT | Autenticação e controle de acesso por perfil |
| Bcrypt | Hash seguro de senhas |
| Jest + Supertest | Testes de integração |

---

## ✨ Funcionalidades

* 🔒 Cadastro e login com autenticação JWT
* 🛡️ Proteção de rotas por perfil (cliente / barbeiro)
* 📅 Agendamento com validação de data retroativa
* ⚡ Verificação de conflito de horário (double booking)
* 👤 Dashboard do cliente: criar e cancelar agendamentos
* 💈 Dashboard do barbeiro: aceitar, recusar e concluir pedidos
* 🏷️ Badges de status: Pendente, Confirmado, Concluído, Cancelado
* 📱 Design responsivo com paleta premium (preto e dourado)

---

## 🧪 Testes

O projeto possui testes de integração cobrindo os fluxos críticos:

* Registro e login de usuários
* Autenticação e validação de token JWT
* Criação de agendamento com validação de data e conflito de horário
* Controle de acesso por perfil (cliente vs barbeiro)
* Cancelamento e atualização de agendamentos

```bash
cd backend/tests
npm install
npm test
```

---

## 🚀 Como rodar localmente

**Pré-requisitos:** Node.js e PostgreSQL instalados.

### 🔧 Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` baseado no `.env.example`:

```env
PORT=3000
DB_USER=seu_usuario
DB_HOST=localhost
DB_NAME=barber_sync
DB_PASSWORD=sua_senha
DB_PORT=5432
JWT_SECRET=sua_chave_secreta
```

Execute o script SQL para criar as tabelas e popular os serviços iniciais:

```bash
psql -U seu_usuario -d barber_sync -f backend/database/database.sql
```

Inicie o servidor:

```bash
npm run dev
```

### 🖥️ Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse `http://localhost:5173`

---

## 🎨 Arquitetura SCSS

Organização baseada no padrão 7-1:

```
styles/
├── abstracts/    # Variáveis e mixins
├── base/         # Reset e globais
├── layout/       # Header e estrutura
├── pages/        # Home, Auth, Dashboard
└── App.scss      # Ponto de entrada
```

---

## 🤖 Sobre o uso de IA

Este projeto foi desenvolvido com auxílio do Claude (Anthropic) como ferramenta de aprendizado e produtividade. A IA foi usada para revisão de código, sugestão de padrões e apoio na documentação.

Todas as decisões de arquitetura, lógica de negócio e implementação foram tomadas e validadas pelo desenvolvedor. O objetivo foi aprender fazendo — entendendo cada linha, não apenas copiando soluções.

---

## 👨‍💻 Autor

Desenvolvido por **Jose Neto**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jose-hermes-dev/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Neto13k)