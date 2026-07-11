# Sistema de Gestão de Medicamentos

Aplicação Next.js (App Router) para cadastro de usuários e controle de horários de medicamentos, feita para o Biochallenge UFAL/INATEL.

## Funcionalidades

- Cadastro e login de usuários (NextAuth, credenciais + senha com hash via bcrypt).
- Dashboard com lista de medicamentos do usuário logado.
- Adicionar, editar e excluir medicamento (com confirmação antes de excluir).
- Alterar senha (autenticado, exige a senha atual).

## Tecnologias principais

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- NextAuth (estratégia JWT, provider de credenciais)
- Prisma + SQLite (banco local de desenvolvimento)
- Radix UI (diálogos modais)

## Estrutura do projeto

- `src/app/`: páginas e rotas (login, cadastro, dashboard, dashboard/alterar-senha) e as API route handlers em `src/app/api/`.
- `src/components/`: componentes de feature (formulário/lista de medicamentos, cabeçalho do dashboard).
- `src/components/ui/`: componentes de UI reutilizáveis (Button, TextField, Alert, FormCard, EmptyState, ConfirmDialog).
- `src/lib/`: utilitários de servidor: singleton do Prisma (`prisma.ts`), config do NextAuth (`auth.ts`), helper de sessão (`session.ts`) e formatação de datas (`format.ts`).
- `src/types/`: tipos compartilhados.
- `prisma/schema.prisma`: modelos `User` e `Medicine`.

As telas usam componentes controlados com `useState` (sem biblioteca de formulários).

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```text
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="uma-string-aleatoria-qualquer"
NEXTAUTH_URL="http://localhost:3000"
```

- `DATABASE_URL`: caminho do banco SQLite, relativo à pasta `prisma/`.
- `NEXTAUTH_SECRET`: chave usada pelo NextAuth para assinar a sessão (obrigatória em produção).
- `NEXTAUTH_URL`: URL base da aplicação.

## Como executar localmente

```bash
git clone <repo-url>
cd biochallenge-inatel-25

npm install
npx prisma generate
npx prisma migrate dev

npm run dev
```

Abra `http://localhost:3000` no navegador.

## Visualizar o banco de dados

Pra ver o conteúdo das tabelas (`User` e `Medicine`) sem precisar instalar nada extra, use o Prisma Studio, que já vem com o Prisma do projeto:

```bash
npx prisma studio
```

Isso abre `http://localhost:5555` no navegador, com uma tela pra cada tabela, onde dá pra ver, filtrar e até editar/apagar linhas direto pela interface.

## Notas

- Em produção, troque `DATABASE_URL` para um banco gerenciado (Postgres, MySQL, etc.) e rode as migrações no ambiente adequado.
- Ao alterar `prisma/schema.prisma`, rode `npx prisma migrate dev` e `npx prisma generate` novamente.
