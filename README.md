# 🐆 Escute as Feras

> *"Tudo o que foi outrora censurado, reeducado ou subtraído por opressões morais, patriarcais, positivistas e colonizadoras, no CLEF ress(urge) através do rugir das Feras."*

## Sobre o Projeto

O **Clube de Leitura Escute as Feras (CLEF)** é um encontro de mulheres para ler e conversar sobre livros instigantes e nada óbvios, que nos tiram do lugar-comum por meio de reflexões sobre os diferentes modos de vida e as fronteiras porosas (e às vezes perigosas) entre universos heterogêneos.

Esta aplicação web é o espaço digital do CLEF — uma plataforma para organizar encontros, compartilhar leituras, publicar textos autorais e manter um acervo coletivo de obras literárias.

---

## Funcionalidades

### 📚 Acontecendo
Espaço gerenciado pelo Admin para publicar o livro do mês com descrição, informações do autor, contextos e fotos. Membros podem comentar.

### 📖 Biblioteca Clandestina
Acervo coletivo de obras em formato digital. Membros podem fazer upload, download e busca de livros. Acesso exclusivo para membros cadastrados.

### ✍️ Solte suas Feras
Blog literário com editor de texto embutido onde membros podem publicar textos autorais (identificados ou anônimos). Suporta comentários de outros usuários.

### 🗓️ Eventos
Espaço para divulgação de exposições de arte, shows, eventos literários e culturais.

### 👥 Quem Somos
Perfis dos membros do CLEF com mini bio e foto.

### 🗂️ Arquivo
Acervo de eventos passados do Acontecendo para consulta histórica.

---

## Tecnologias

### Backend
| Tecnologia | Versão | Uso |
|---|---|---|
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
|---|---|---|
| Angular | 19.x | Framework principal |
| TypeScript | 5.x | Linguagem principal |
| Tailwind CSS | 4.x | Estilização utilitária |
| Angular Material | 19.x | Componentes UI |
| RxJS | 7.x | Programação reativa |

---

## Arquitetura

```
escute_as_feras/
├── backend/
│   └── backend/
│       └── src/main/java/com/escuteasferas/backend/
│           ├── config/          # Spring Security, JWT, CORS
│           ├── model/
│           │   ├── users/       # User, UserRole, UserRepository, UserService, AuthService
│           │   ├── happening/   # Livro do mês
│           │   ├── library/     # Biblioteca clandestina
│           │   └── blog/        # Textos autorais
│           ├── payload/         # DTOs de requisição e resposta
│           ├── exception/       # Tratamento de erros
│           └── infra/           # Integrações externas
│
└── frontend/
    └── src/app/
        └── components/
            ├── navbar/          # Navegação principal
            ├── home/            # Página inicial
            ├── happening/       # Livro do mês
            ├── library/         # Biblioteca
            ├── speakup/         # Blog literário
            ├── events/          # Eventos
            ├── about/           # Quem somos
            ├── archive/         # Arquivo
            └── auth/
                ├── login/       # Tela de login
                └── register/    # Tela de cadastro
```

---

## Perfis de Acesso

| Role | Permissões |
|---|---|
| **VISITOR** | Visualiza Home, Acontecendo, Solte suas Feras, Eventos, Quem Somos e Arquivo. Pode comentar. Sem acesso à Biblioteca. |
| **MEMBER** | Tudo do Visitor + upload/download na Biblioteca, publicação de posts no blog, edição dos próprios conteúdos. |
| **ADMIN** | Tudo do Member + gerenciamento de usuários, moderação de conteúdo, publicação do Livro do Mês. |

---

## Identidade Visual

| Nome | Hex | Uso |
|---|---|---|
| Floresta | `#2D5016` | Fundo da navbar, elementos primários |
| Musgo | `#4A7C2F` | Bordas, separadores |
| Onça | `#E8891A` | Hover, links ativos, destaques |
| Fera | `#E8395A` | CTAs principais |
| Creme | `#F5F0E8` | Fundo da página, textos sobre escuro |
| Escuro | `#1A1A1A` | Texto principal |

**Tipografia:**
- Títulos: `Playfair Display`
- Corpo: `Inter`
- Destaques/citações: `Cormorant Garamond`

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
```

Configure o `application.yml` com suas credenciais do MySQL:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/escuteasferas?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
    username: root
    password: SUA_SENHA
```

Rode o projeto:

```bash
./mvnw spring-boot:run
```

A API estará disponível em `http://localhost:8080`.

### Frontend

```bash
cd frontend
npm install
ng serve
```

A aplicação estará disponível em `http://localhost:4200`.

---

## Endpoints da API

### Autenticação
| Método | Rota | Descrição | Acesso |
|---|---|---|---|
| POST | `/api/auth/register` | Cadastro de novo usuário | Público |
| POST | `/api/auth/login` | Login e geração de token JWT | Público |

---

## Contribuição

Este é um projeto privado do Clube de Leitura Escute as Feras (CLEF).

---

*Desenvolvido com 🐆 e muito café.*
