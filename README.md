# BarberSync 💈✨

Sistema de agendamento para barbearias com painel dedicado para clientes e barbeiros. Desenvolvido como projeto fullstack de portfólio.

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

* React 19 + Vite
* TypeScript
* React Router 7
* React Hook Form
* SCSS (arquitetura 7-1)
* Axios

### ⚙️ Backend

* Node.js + Express 5
* PostgreSQL
* JWT para autenticação
* Bcrypt para hash de senhas

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

## 🚀 Como rodar localmente

**Pré-requisitos:** Node.js e PostgreSQL instalados.

### 🔧 Backend

```bash id="bk1x9a"
cd backend
npm install
```

Crie o arquivo `.env` baseado no `.env.example`:
PORT=3000
DB_USER=seu_usuario
DB_HOST=localhost
DB_NAME=barber_sync
DB_PASSWORD=sua_senha
DB_PORT=5432
JWT_SECRET=sua_chave_secreta

Execute o script SQL em `backend/database/database.sql` para criar as tabelas e popular os serviços iniciais.

```bash id="bk2x9b"
npm run dev
```

### 🖥️ Frontend

```bash id="bk3x9c"
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

Desenvolvido por **Jose Neto** como projeto de portfólio.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge\&logo=linkedin\&logoColor=white)](https://www.linkedin.com/in/jose-hermes-dev/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge\&logo=github\&logoColor=white)](https://github.com/Neto13k)
