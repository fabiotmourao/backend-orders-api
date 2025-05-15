# 📦 Orders & Products API

API RESTful desenvolvida com **NestJS** para gerenciamento de **pedidos** e **produtos**, com autenticação JWT, testes automatizados e ambiente Dockerizado.

## ✅ Funcionalidades

### Produtos
- Criar, listar, editar e deletar produtos.
- Campos:
  - `id`, `nome`, `categoria`, `descricao`, `preco`, `quantidade_estoque`, `created_at`, `updated_at`.

### Pedidos
- Criar e listar pedidos.
- Valida estoque de produtos e atualiza após criação.
- Campos:
  - `id`, `status`, `total_pedido`, `items`, `created_at`, `updated_at`.

### Autenticação
- Login com `username` e `password`.
- Retorna JWT para acesso autenticado às rotas protegidas.

---

## 🐳 Como executar com Docker

### 1. Clonar o repositório

```bash
git clone git@github.com:fabiotmourao/backend-orders-api.git
cd backend-orders-api
```

### 2. Criar arquivo `.env`

```env
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=orders_db
PORT=3000
```

### 3. Subir containers

```bash
docker compose up -d --build
```

---

## 📬 Acesso à API

- **Base URL:** `http://localhost:3000`

### Rotas públicas:

| Método | Rota      | Descrição        |
|--------|-----------|------------------|
| POST   | `/auth/login` | Login e geração do JWT |

### Rotas protegidas (requer token Bearer):

| Método | Rota            | Descrição              |
|--------|-----------------|------------------------|
| POST   | `/products`     | Criar produto          |
| GET    | `/products`     | Listar produtos        |
| GET    | `/products/:id` | Buscar produto por ID  |
| PUT    | `/products/:id` | Atualizar produto      |
| DELETE | `/products/:id` | Remover produto        |
| POST   | `/orders`       | Criar pedido           |
| GET    | `/orders`       | Listar pedidos         |
| GET    | `/orders/:id`   | Buscar pedido por ID   |

---

## 🧪 Testes

### Rodar testes unitários:

```bash
docker compose exec app npm run test
```

---

## 🛠 Tecnologias

- **Node.js**
- **NestJS**
- **PostgreSQL**
- **TypeORM**
- **JWT**
- **Passport**
- **Docker & Docker Compose**
- **Jest (testes unitários)**

---

## 📂 Collection Postman

A collection para testar todos os endpoints está incluída no projeto:

📁 `Orders & Products API.postman_collection.json`

> Importe-a no Postman para validar todos os fluxos da API.

---

## 👤 Credenciais de Teste

```json
{
  "username": "admin",
  "password": "admin"
}
```

---

## 🧾 Licença

Projeto desenvolvido para fins de teste técnico.