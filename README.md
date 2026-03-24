# 🐆 Escute as Feras

> *"Tudo o que foi outrora censurado, reeducado ou subtraído por opressões morais, patriarcais, positivistas e colonizadoras, no CLEF ress(urge) através do rugir das Feras."*

---

## Sobre o Projeto

O **Clube de Leitura Escute as Feras (CLEF)** é um encontro de mulheres para ler e conversar sobre livros instigantes e nada óbvios, que nos tiram do lugar-comum por meio de reflexões sobre os diferentes modos de vida e as fronteiras porosas (e às vezes perigosas) entre universos heterogêneos.

Esta aplicação web é o espaço digital do CLEF — uma plataforma para organizar encontros, compartilhar leituras, publicar textos autorais e manter um acervo coletivo de obras literárias.

---

## Funcionalidades

**📚 Acontecendo**
Espaço gerenciado pelo Admin para publicar o livro do mês com descrição, informações do autor, data do próximo encontro e contexto literário. Membros podem comentar em thread.

**📖 Biblioteca Clandestina**
Acervo coletivo de obras em formato digital `.epub`. Membros podem fazer upload (com capa), download e busca por título, autor, editora, gênero, país e ISBN. Paginação de 10 itens por página. Acesso exclusivo para membros cadastrados.

**✍️ Solte suas Feras**
Blog literário com editor de texto rico (Quill.js) onde membros podem publicar textos autorais identificados ou anônimos. Suporta comentários em thread.

**🗓️ Eventos**
Espaço para divulgação de exposições de arte, shows, eventos literários e culturais. *(em desenvolvimento)*

**👥 Quem Somos**
Perfis dos membros do CLEF com mini bio e foto. *(em desenvolvimento)*

**🗂️ Arquivo**
Acervo histórico dos livros discutidos no Acontecendo. *(em desenvolvimento)*

---

## Tecnologias

### Backend

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| Java | 17 | Linguagem principal |
| Spring Boot | 4.0.3 | Framework principal |
| Spring Security | 7.x | Autenticação e autorização |
| Spring Data JPA | 4.x | Persistência de dados |
| Hibernate | 7.x | ORM |
| MySQL | 8.x | Banco de dados |
| JWT (jjwt) | 0.12.x | Tokens de autenticação |
| Lombok | 1.18.x | Redução de boilerplate |
| Maven | 3.x | Gerenciamento de dependências |

### Frontend

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| Angular | 19.x | Framework principal |
| TypeScript | 5.x | Linguagem principal |
| Tailwind CSS | 4.x | Estilização utilitária |
| Angular Material | 19.x | Componentes UI |
| Quill.js | 2.x | Editor de texto rico |
| RxJS | 7.x | Programação reativa |

---

## Arquitetura

```
escute_as_feras/
├── backend/
│   └── backend/
│       └── src/main/java/com/escuteasferas/backend/
│           ├── config/               # Controllers, Spring Security, JWT, CORS
│           │   ├── AuthController
│           │   ├── BookOfMonthController
│           │   ├── AuthorController
│           │   ├── LibraryBookController
│           │   ├── BlogPostController
│           │   ├── EventController
│           │   ├── ArchiveController
│           │   ├── JwtUtil
│           │   ├── JwtFilter
│           │   └── SecurityConfig
│           ├── model/
│           │   ├── users/            # User, UserRole, UserRepository, UserService, AuthService
│           │   ├── happening/        # BookOfMonth, Author, BookOfMonthComments
│           │   ├── library/          # LibraryBook
│           │   ├── blog/             # BlogPost, BlogPostComments
│           │   ├── events/           # Event
│           │   └── archive/          # ArchiveEntry
│           ├── payload/              # DTOs de requisição e resposta
│           ├── exception/            # Tratamento de erros
│           └── infra/                # Integrações externas
│
└── frontend/
    └── src/app/
        ├── components/
        │   ├── navbar/
        │   ├── home/
        │   ├── happening/
        │   ├── library/
        │   ├── speakup/
        │   ├── post-editor/          # Editor Quill embutido
        │   ├── speakup-post/         # Página do post individual
        │   ├── events/
        │   ├── about/
        │   ├── archive/
        │   └── auth/
        │       ├── login/
        │       └── register/
        ├── services/
        │   ├── auth-service.ts
        │   ├── happening.service.ts
        │   └── blog.service.ts
        ├── guards/
        │   └── auth-guard.ts
        └── interceptors/
            └── auth-interceptor.ts   # Injeta Bearer token automaticamente
```

---

## Perfis de Acesso

| Role | Permissões |
|------|-----------|
| VISITOR | Visualiza Home, Acontecendo, Solte suas Feras, Eventos, Quem Somos e Arquivo. Pode comentar. Sem acesso à Biblioteca. |
| MEMBER | Tudo do Visitor + upload/download na Biblioteca, publicação de posts no blog, edição dos próprios conteúdos. |
| ADMIN | Tudo do Member + gerenciamento de usuários, moderação de conteúdo, publicação do Livro do Mês, cadastro de autores e arquivamento de livros. |

---

## Identidade Visual

| Nome | Hex | Uso |
|------|-----|-----|
| Floresta | `#2D5016` | Fundo da navbar, headers, botões primários |
| Musgo | `#4A7C2F` | Bordas, ícones, separadores |
| Onça | `#E8891A` | Hover, links ativos, destaques, tags |
| Fera | `#E8395A` | CTAs, avatares, detalhes de ação |
| Creme | `#F5F0E8` | Fundo da página, textos sobre escuro |
| Escuro | `#1A1A1A` | Texto principal |

**Tipografia:**
- Títulos: *Playfair Display*
- Corpo: *Inter*
- Destaques/citações: *Cormorant Garamond*

---

## Como Rodar o Projeto

### Pré-requisitos
- Java 17+
- Node.js 18+
- MySQL 8+
- Angular CLI

### Backend

```bash
cd backend/backend
./mvnw spring-boot:run
```

Configure o `application.yml` com suas credenciais do MySQL antes de rodar. A API estará disponível em `http://localhost:8080`.

### Frontend

```bash
cd frontend
npm install
ng serve
```

A aplicação estará disponível em `http://localhost:4200`.

---

## Endpoints da API

### 🔐 Autenticação — `/api/auth`

| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| POST | `/api/auth/register` | Cadastro de novo usuário (retorna JWT) | Público |
| POST | `/api/auth/login` | Login e geração de token JWT | Público |

---

### 📚 Acontecendo — `/api/happening`

| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| GET | `/api/happening` | Retorna o livro do mês ativo | Público |
| POST | `/api/happening` | Cadastra novo livro do mês | Admin |
| GET | `/api/happening/{bookId}/comments` | Lista comentários do livro | Público |
| POST | `/api/happening/{bookId}/comments` | Adiciona comentário ou resposta | Público |
| DELETE | `/api/happening/comments/{commentId}` | Remove comentário | Admin |

---

### 🖊️ Autores — `/api/authors`

| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| GET | `/api/authors` | Lista todos os autores | Público |
| POST | `/api/authors` | Cadastra novo autor | Admin |

---

### 📖 Biblioteca — `/api/library`

| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| GET | `/api/library` | Lista todos os livros | Member/Admin |
| GET | `/api/library/search?query=` | Busca por título, autor, editora, gênero, país ou ISBN | Member/Admin |
| POST | `/api/library` | Cadastra novo livro com capa e epub (`multipart/form-data`) | Member/Admin |
| DELETE | `/api/library/{id}` | Remove livro | Admin |

---

### ✍️ Blog — `/api/blog`

| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| GET | `/api/blog` | Lista todos os posts ativos (mais recente primeiro) | Público |
| GET | `/api/blog/{id}` | Retorna post por ID | Público |
| POST | `/api/blog` | Publica novo texto | Member/Admin |
| DELETE | `/api/blog/{id}` | Desativa post (soft delete) | Member/Admin |
| GET | `/api/blog/{postId}/comments` | Lista comentários do post | Público |
| POST | `/api/blog/{postId}/comments` | Adiciona comentário ou resposta | Público |
| DELETE | `/api/blog/comments/{commentId}` | Remove comentário | Member/Admin |

---

### 🗓️ Eventos — `/api/events`

| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| GET | `/api/events` | Lista eventos ativos ordenados por data | Público |
| GET | `/api/events/{id}` | Retorna evento por ID | Público |
| POST | `/api/events` | Cria novo evento | Admin |
| DELETE | `/api/events/{id}` | Desativa evento | Admin |

---

### 🗂️ Arquivo — `/api/archive`

| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| GET | `/api/archive` | Lista todos os livros arquivados | Público |
| POST | `/api/archive/{bookId}?notes=` | Arquiva o livro do mês atual | Admin |

---

## Autenticação

Todos os endpoints protegidos exigem o header:

```
Authorization: Bearer {token}
```

O token é obtido via `/api/auth/login` ou `/api/auth/register` e expira em 24 horas.

---

*Desenvolvido com 🐆 e muito café.*
