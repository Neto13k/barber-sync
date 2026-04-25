# 🧪 Testes — BarberSync Backend

## Estrutura

```
tests/
├── setup.js                          # Configuração global (roda antes de todos os testes)
├── unit/
│   └── authMiddleware.test.js        # Testa o middleware de autenticação de forma isolada
└── integration/
    ├── users.test.js                 # Testa as rotas de cadastro e login
    └── appointments.test.js          # Testa todas as rotas de agendamento
```

## Como rodar

```bash
# Instalar as dependências de teste (só precisa fazer uma vez)
npm install

# Rodar todos os testes uma vez
npm test

# Rodar em modo watch (re-executa ao salvar um arquivo)
npm run test:watch

# Ver a cobertura de código
npm run test:coverage
```

## O que cada arquivo testa

### `unit/authMiddleware.test.js`
Testa o middleware de autenticação de forma **isolada**, sem subir o servidor.
- Requisição sem token → retorna 401
- Token inválido (string aleatória) → retorna 403
- Token expirado → retorna 403
- Token válido → chama `next()` e popula `req.user`

### `integration/users.test.js`
Testa o fluxo completo de autenticação passando pelo Express.
- Cadastro com sucesso → retorna 201
- Cadastro com e-mail duplicado → retorna 409
- Login com sucesso → retorna token JWT
- Login com e-mail inexistente → retorna 404
- Login com senha errada → retorna 401

### `integration/appointments.test.js`
Testa todas as regras de negócio dos agendamentos.
- Listar serviços sem token → funciona (rota pública)
- Criar agendamento sem token → retorna 401
- Criar agendamento com data passada → retorna 400
- Criar agendamento com conflito de horário → retorna 409
- Criar agendamento válido → retorna 201
- Cliente tenta mudar status → retorna 403
- Barbeiro confirma/recusa agendamento → retorna 200
- Cancelar agendamento inexistente → retorna 404

## Por que mockamos o banco?

Os testes usam `jest.mock()` para simular o PostgreSQL.
Isso significa que você **não precisa de um banco rodando** para executar os testes.

O mock intercepta as chamadas ao `pool.query()` e retorna dados que controlamos —
tornando os testes rápidos, previsíveis e independentes de infraestrutura.
