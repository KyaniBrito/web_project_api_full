# 🌍 Tripleten Web Project API Full

Around é uma aplicação web full-stack que permite aos usuários criar perfis, compartilhar imagens através de cards, curtir conteúdos de outros usuários e gerenciar suas próprias publicações. O projeto foi desenvolvido com foco em segurança, performance e experiência do usuário, implementando autenticação completa com JWT, proteção de rotas e validações robustas tanto no frontend quanto no backend.

---

## Principais Funcionalidades

- **Autenticação Completa**: Registro e login de usuários com JWT
- **Rotas Protegidas**: Acesso restrito apenas para usuários autenticados
- **Gerenciamento de Perfil**: Edição de nome, descrição e avatar
- **CRUD de Cards**: Criação, visualização e exclusão de publicações
- **Interações Sociais**: Sistema de curtidas em tempo real
- **Design Responsivo**: Interface adaptável para todos os dispositivos
- **Validação de Dados**: Validação em tempo real nos formulários
- **Feedback Visual**: Tooltips de sucesso/erro para todas as ações
- **Segurança**: Hashing de senhas, proteção contra CORS, validação de tokens

---

## 🎯 Experiência do Usuário

- **Interface Intuitiva**: Design minimalista inspirado em redes sociais modernas
- **Feedback Imediato**: Confirmações visuais para todas as interações
- **Popups Acessíveis**: Modais centralizados com fechamento via ESC ou overlay
- **Performance Otimizada**: Carregamento rápido e transições suaves
- **Responsividade Total**: Funciona perfeitamente em desktop, tablet e mobile
- **Tratamento de Erros**: Mensagens claras e orientadas ao usuário

---

## 🛠️ Tecnologias e Técnicas

- **Frontend**

React 18 - Biblioteca JavaScript para construção de interfaces
React Router DOM - Gerenciamento de rotas e navegação
Context API - Gerenciamento de estado global
Vite - Build tool moderna e rápida
CSS3 - Estilização com metodologia BEM
JavaScript ES6+ - Funcionalidades modernas do JavaScript

- **Backend**

Node.js - Ambiente de execução JavaScript
Express.js - Framework web minimalista
MongoDB Atlas - Banco de dados NoSQL na nuvem
Mongoose - ODM para modelagem de dados
JWT (jsonwebtoken) - Autenticação via tokens
bcryptjs - Hashing de senhas
Celebrate/Joi - Validação de requisições
winston - Sistema de logs

---

## DevOps e Deploy

- **Google Cloud Platform** - Hospedagem do servidor
- **Nginx** - Servidor web e proxy reverso
- **PM2** - Gerenciador de processos Node.js
- **Certbot** - Certificados SSL gratuitos
- **FreeDNS** - Gerenciamento de domínios

---

## Boas Práticas Implementadas

✅ Arquitetura MVC no backend
✅ Componentização e reutilização de código
✅ Tratamento centralizado de erros
✅ Validação de dados em ambas as camadas
✅ Segurança com HTTPS e tokens JWT
✅ Logs de requisições e erros
✅ Código limpo e bem documentado
✅ Separação de concerns (frontend/backend)

---

## 🚀 Estrutura do Projeto

web_project_api_full/
├── frontend/ # Aplicação React
│ ├── src/
│ │ ├── components/ # Componentes React
│ │ ├── contexts/ # Context API
│ │ ├── utils/ # Funções utilitárias e API
│ │ └── images/ # Recursos visuais
│ └── dist/ # Build de produção
│
├── backend/ # API Node.js
│ ├── controllers/ # Lógica de negócio
│ ├── models/ # Schemas do Mongoose
│ ├── routes/ # Rotas da API
│ ├── middleware/ # Auth, validação, logs, erros
│ ├── utils/ # Funções auxiliares
│ ├── logs/ # Arquivos de log
│ └── app.js # Ponto de entrada
│
└── README.md

---

## 🔗 Links do Projeto

🌐 Aplicação Frontend: https://around.twilightparadox.com
🔌 API Backend: https://api.around.twilightparadox.com
📦 Repositório GitHub: https://github.com/KyaniBrito/web_project_api_full
📚 Documentação da API: https://api.around.twilightparadox.com/api-docs

---

## 💻 Instalação e Execução Local

**Pré-requisitos**

Node.js (versão 18 ou superior)
npm ou yarn
Conta no MongoDB Atlas (ou MongoDB local)

**Instalação**

**Clone o repositório**

bashgit clone https://github.com/KyaniBrito/web_project_api_full.git
cd web_project_api_full

**Configure o Backend**

bashcd backend
npm install

**Crie o arquivo .env**

cat > .env << EOL
NODE_ENV=development
JWT_SECRET=sua-chave-secreta-aqui
MONGODB_URI=sua-connection-string-do-mongodb-atlas
EOL

**Configure o Frontend**

bashcd ../frontend
npm install

**Execute em modo de desenvolvimento**

Em um terminal (backend):
bashcd backend
npm start
Em outro terminal (frontend):
bashcd frontend
npm run preview

Acesse a aplicação

Frontend: http://localhost:3000
Backend: http://localhost:3001

---

## 📦 Deploy em Produção

**Backend**

Configure o servidor (Ubuntu/Debian)
Instale Node.js, PM2 e Nginx
Clone o repositório e instale dependências
Configure variáveis de ambiente
Inicie com PM2: pm2 start app.js --name around-api

**Frontend**

Build de produção: npm run build
Transfira a pasta dist/ para o servidor
Configure Nginx como servidor estático
Configure SSL com Certbot

---

👨‍💻 Desenvolvedor
Kyani Brito
Desenvolvido como projeto final do bootcamp de Desenvolvimento Web da TripleTen.

⭐ Se este projeto foi útil para você, considere dar uma estrela no GitHub!
Última atualização: Novembro 2024
