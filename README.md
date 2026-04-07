# BarberSync 💈✨

**BarberSync** é uma plataforma premium de agendamento de barbearia, desenvolvida para modernizar a conexão entre clientes e barbeiros. O projeto foca em uma experiência de usuário sofisticada, com um design "Premium" (preto e dourado) e um sistema de gerenciamento de agendamentos inspirado no modelo de aceitação do Uber.

---

## 🚀 Propósito e Público-Alvo

O propósito do **BarberSync** é eliminar a fricção no processo de agendamento de serviços de estética masculina. 
- **Para Clientes:** Oferece uma interface intuitiva para visualizar serviços, preços e agendar horários em segundos.
- **Para Barbeiros:** Funciona como um painel de controle completo, permitindo aceitar, recusar e gerenciar a fila de atendimentos em tempo real.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19 & Vite:** Performance e desenvolvimento ágil.
- **TypeScript:** Tipagem estática para maior segurança e manutenibilidade.
- **SASS (SCSS):** Estilização avançada com arquitetura modular.
- **React Router 7:** Gerenciamento de rotas e navegação fluida.
- **React Hook Form:** Manipulação eficiente de formulários.
- **Axios:** Consumo de APIs REST.

### Backend
- **Node.js & Express:** Servidor robusto e escalável.
- **PostgreSQL:** Banco de dados relacional para persistência segura.
- **JWT (JSON Web Token):** Autenticação segura de usuários.
- **Bcrypt:** Criptografia de senhas.

---

## 📂 Estrutura do Projeto

O projeto utiliza uma organização clara e modular para facilitar a escalabilidade.

### Estrutura SASS (Padrão 7-1)
Adotamos o padrão **7-1 pattern** para organizar os estilos de forma escalável:
- `abstracts/`: Variáveis de cores, fontes e mixins reutilizáveis.
- `base/`: Resets e estilos globais.
- `layout/`: Estilos para componentes de layout como o Header.
- `pages/`: Estilos específicos para cada página (Home, Auth, Dashboard).
- `App.scss`: Arquivo central que importa todos os módulos.

---

## ✨ Funcionalidades Implementadas

- **🎨 Design Premium:** Interface sofisticada utilizando paleta de cores Dark Grey e Gold (#D4AF37), com fontes modernas (Inter e Playfair Display).
- **🔒 Autenticação Completa:** Sistema de Login e Cadastro com validação e proteção de rotas.
- **📅 Agendamento Inteligente:** Clientes podem escolher serviços e definir data/hora com campos de observação.
- **🤝 Aceite Estilo Uber:** Barbeiros recebem solicitações pendentes e podem escolher "Aceitar" ou "Recusar" o pedido.
- **📊 Dashboards Distintos:** Visões personalizadas para o perfil de cliente e de barbeiro.
- **📱 Responsividade:** Site totalmente adaptado para dispositivos móveis e desktop.
- **⚡ Feedback Visual:** Badges de status coloridos e efeitos de hover interativos em todos os botões e cards.

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos
- Node.js instalado.
- PostgreSQL configurado e rodando.

### Passo 1: Configurar o Backend
1. Navegue até a pasta `backend`.
2. Instale as dependências: `npm install`.
3. Configure as variáveis de ambiente no arquivo `.env` (use o `.env.example` como base).
4. Execute o script SQL fornecido na pasta `database` para criar as tabelas.
5. Inicie o servidor: `npm run dev`.

### Passo 2: Configurar o Frontend
1. Navegue até a pasta `frontend`.
2. Instale as dependências: `npm install`.
3. Inicie o projeto: `npm run dev`.
4. Acesse o endereço indicado no terminal (geralmente `http://localhost:5173`).

---

## 🧠 Decisões de Design e Arquitetura

- **Modularização:** O uso do SASS 7-1 permite que a manutenção visual seja rápida e isolada, evitando conflitos de CSS global.
- **Snake Case no Banco:** Padronizamos o banco de dados com `snake_case` para garantir compatibilidade total com o PostgreSQL, evitando erros de sensibilidade a maiúsculas/minúsculas.
- **UX de Agendamento:** A lógica de "Aceitar Pedido" foi implementada para dar controle total ao profissional, garantindo que o barbeiro só atenda o que realmente pode cumprir.

---

## 🤖 Nota sobre a Contribuição da IA

Este projeto contou com o auxílio de Inteligência Artificial (IA) como ferramenta de suporte no desenvolvimento. A IA foi utilizada para:
- Sugestão de refatoração de código.
- Auxílio na estruturação inicial da arquitetura SASS.
- Geração de mensagens de commit padronizadas.
- Apoio na escrita desta documentação.

**Importante:** Todas as decisões de arquitetura, escolha de layout, lógica de negócio e implementação final foram revisadas, ajustadas e validadas pelo desenvolvedor humano, garantindo a integridade e qualidade do software.

---

## 👨‍💻 Autor

Desenvolvido por **Jose** como parte do portfólio de engenharia de software.

---

## 📄 Licença

Este projeto está sob a licença ISC.
