# 🗂️ Workshop Tracker

Sistema web para gerenciamento e acompanhamento de workshops, participantes e colaboradores.

O projeto é dividido em duas aplicações principais que se comunicam via API REST:

- **Backend:** .NET 8 + ASP.NET Core + Entity Framework Core
- **Frontend:** React + Vite
- **Banco de dados:** MySQL

---

## 🚀 Início rápido

Quer só rodar o projeto e ver funcionando? Siga os passos abaixo.

### Pré-requisitos

Certifique-se de ter instalado: **.NET 8**, **Node.js**, **NPM** e um servidor **MySQL** em execução.

```bash
dotnet --version
node --version
npm --version
```

### 1. Backend

```bash
cd Server
dotnet run
```

➡️ API disponível em **http://localhost:5000**
➡️ Documentação Swagger em **http://localhost:5000/swagger**

### 2. Frontend

Em um segundo terminal:

```bash
cd Client
npm install
npm run dev
```

➡️ Aplicação disponível em **http://localhost:5173**

### 3. Acessar a plataforma

Abra **http://localhost:5173** no navegador e faça login com o usuário administrativo de desenvolvimento:

| Campo  | Valor              |
|--------|---------------------|
| E-mail | flowup@admin.com    |
| Senha  | Admin@2026           |

> ⚠️ Credenciais válidas apenas para ambiente de desenvolvimento/testes.

### 📌 Resumo das URLs

| Serviço  | URL                            |
|----------|----------------------------------|
| Frontend | http://localhost:5173          |
| Backend  | http://localhost:5000          |
| Swagger  | http://localhost:5000/swagger  |

---

## 📋 Sumário

- [Sobre o projeto](#-sobre-o-projeto)
- [Tecnologias](#️-tecnologias)
- [Arquitetura](#️-arquitetura)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Fluxo de execução detalhado](#-fluxo-de-execução-detalhado)
- [Docker](#-docker)
- [Configuração](#️-configuração)
- [Testando a API](#-testando-a-api)

---

## 📌 Sobre o projeto

O **Workshop Tracker** é uma plataforma web para gerenciamento e acompanhamento de workshops.

A aplicação possui uma arquitetura separada entre frontend e backend, permitindo que a interface web se comunique com a API através de requisições HTTP.

---

## 🛠️ Tecnologias

### Backend

- .NET 8
- C#
- ASP.NET Core
- Entity Framework Core
- MySQL
- Swagger / OpenAPI

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS
- NPM

### Banco de dados

- MySQL

---

## 🏗️ Arquitetura

```text
                    ┌─────────────────────┐
                    │       Usuário       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Frontend       │
                    │   React + Vite      │
                    │   localhost:5173    │
                    └──────────┬──────────┘
                               │
                            HTTP/API
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Backend       │
                    │    ASP.NET Core     │
                    │    localhost:5000   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │        MySQL        │
                    └─────────────────────┘
```

---

## 📁 Estrutura do projeto

```text
workshop-tracker/
│
├── Client/
│   ├── src/
│   │   ├── components/
│   │   ├── Pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── ...
│
├── Server/
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   ├── Services/
│   ├── Program.cs
│   ├── appsettings.json
│   ├── *.csproj
│   └── ...
│
└── README.md
```

### Client

A pasta `Client` contém o frontend da aplicação.

Principais diretórios:

- `src/components/` — componentes reutilizáveis da interface.
- `src/Pages/` — páginas da aplicação.
- `src/services/` — serviços responsáveis pela comunicação com a API.

Principais arquivos:

- `package.json` — dependências e scripts do frontend.
- `vite.config.js` — configuração do Vite.

### Server

A pasta `Server` contém o backend da aplicação.

Principais diretórios:

- `Controllers/` — endpoints da API.
- `Models/` — entidades e modelos da aplicação.
- `Data/` — configuração e acesso ao banco de dados.
- `Services/` — serviços e regras auxiliares.

Principais arquivos:

- `Program.cs` — configuração e inicialização da API.
- `appsettings.json` — configurações da aplicação.
- `*.csproj` — configuração do projeto .NET e suas dependências.

---

## 🔄 Fluxo de execução detalhado

### 1. Iniciar o MySQL

Certifique-se de que o MySQL esteja em execução.

### 2. Iniciar o Backend

```bash
cd Server
dotnet run
```

- Backend: `http://localhost:5000`
- Swagger: `http://localhost:5000/swagger`

### 3. Iniciar o Frontend

Em outro terminal:

```bash
cd Client
npm install
npm run dev
```

- Frontend: `http://localhost:5173`

### 4. Acessar a plataforma

Abra no navegador:

```
http://localhost:5173
```

---

## 🐳 Docker

O projeto anteriormente possuía configurações para execução utilizando Docker.

A execução atual do projeto **não depende** do Docker.

O backend deve ser executado diretamente através do .NET (`dotnet run`) e o frontend através do NPM (`npm run dev`). O banco de dados MySQL também deve estar disponível localmente.

---

## ⚙️ Configuração

As configurações do backend estão localizadas em:

```
Server/appsettings.json
```

As configurações relacionadas ao banco de dados devem estar de acordo com o ambiente local.

> ⚠️ Evite versionar senhas, tokens, chaves de API ou outras informações sensíveis no repositório.

---

## 🧪 Testando a API

Com o backend em execução, acesse o Swagger em `http://localhost:5000/swagger` para visualizar os endpoints disponíveis, consultar métodos HTTP, enviar requisições e testar diretamente pela interface.
