# Sistema de Login Moderno

## 📋 Visão Geral

Este é um sistema de autenticação moderno desenvolvido com **Next.js 15**, **TypeScript**, **Prisma** e **PostgreSQL**. O projeto oferece uma interface de login/registro elegante com animações avançadas e um design contemporâneo.

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 15.5.3** - Framework React com App Router
- **React 19.1.0** - Biblioteca para interfaces de usuário
- **TypeScript 5** - Tipagem estática
- **Tailwind CSS 4** - Framework CSS utilitário
- **GSAP 3.13.0** - Animações avançadas
- **React Hook Form 7.62.0** - Gerenciamento de formulários
- **Zod 4.1.8** - Validação de schemas
- **Lucide React** - Ícones

### Backend & Banco de Dados
- **Prisma 6.16.1** - ORM para banco de dados
- **PostgreSQL** - Sistema de gerenciamento de banco de dados
- **Better Auth 1.3.9** - Sistema de autenticação

### UI/UX
- **Radix UI** - Componentes acessíveis
- **Class Variance Authority** - Variantes de componentes
- **Recharts 3.2.0** - Gráficos e visualizações
- **OGL 1.0.11** - Gráficos WebGL

## 🏗️ Arquitetura do Sistema

### Estrutura de Pastas
```
src/
├── app/                    # App Router do Next.js
│   ├── api/               # Rotas da API
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes reutilizáveis
│   ├── AnimatedContent/   # Animações de conteúdo
│   ├── AnimatedForm/      # Formulários animados
│   ├── LoginForm/         # Formulário de login
│   ├── RegisterForm/      # Formulário de registro
│   └── ui/               # Componentes base da UI
├── lib/                   # Utilitários e configurações
│   ├── auth.ts           # Configuração de autenticação
│   ├── auth-client.ts    # Cliente de autenticação
│   ├── prisma.ts         # Cliente Prisma
│   └── validations/      # Schemas de validação
├── types/                 # Definições de tipos TypeScript (auth)
└── generated/            # Código gerado pelo Prisma
```

## 🔐 Funcionalidades de Autenticação

### **Sistema de Login/Registro**
- Autenticação com email e senha usando Better Auth
- Formulários animados com validação em tempo real
- Gerenciamento seguro de sessões
- Verificação de email (configurável)
- Interface responsiva e moderna

## 🎨 Interface do Usuário

### Design System
- **Tema**: Interface moderna com fundo de vídeo animado
- **Componentes**: Formulários com efeitos glass morphism
- **Animações**: Transições suaves com GSAP
- **Responsividade**: Layout adaptável para diferentes dispositivos

### Componentes Principais
- `LoginForm`: Formulário de autenticação com validação
- `RegisterForm`: Cadastro de novos usuários
- `AnimatedForm`: Wrapper para formulários com animações
- `TextPressure`: Efeitos de texto interativos
- `GlassSurface`: Superfícies com efeito vidro

## 🗄️ Banco de Dados

### Schema de Autenticação
```sql
-- Tabelas do Better Auth
users          # Dados dos usuários
sessions       # Sessões ativas
accounts       # Contas de autenticação
verifications  # Verificações de email
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- pnpm (recomendado)

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd login
```

2. **Instale as dependências**
```bash
pnpm install
```

3. **Configure o banco de dados**
```bash
# Copie o arquivo de exemplo
cp .example.env .env

# Configure a URL do PostgreSQL no .env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/oficina"
```

4. **Execute as migrações**
```bash
px prisma migrate dev
```

5. **Gere o cliente Prisma**
```bash
px prisma generate
```

6. **Inicie o servidor de desenvolvimento**
```bash
pnpm dev
```

7. **Acesse a aplicação**
```
http://localhost:3000
```

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento com Turbopack
pnpm dev

# Build para produção
pnpm build

# Iniciar em produção
pnpm start

# Comandos do Prisma
px prisma studio          # Interface visual do banco
px prisma migrate dev     # Executar migrações
px prisma generate        # Gerar cliente
px prisma db seed         # Popular banco com dados iniciais
```

## 🔧 Configuração

### Variáveis de Ambiente
```env
# Banco de Dados
DATABASE_URL="postgresql://..."

# Autenticação
BETTER_AUTH_SECRET="seu-secret-aqui"
BETTER_AUTH_URL="http://localhost:3000"

# Email (opcional)
SMTP_HOST=""
SMTP_PORT=""
SMTP_USER=""
SMTP_PASS=""
```

## 🎯 Funcionalidades Principais

### ✅ Implementadas
- [x] Sistema de autenticação com Better Auth
- [x] Interface de login/registro com animações GSAP
- [x] Formulários com validação usando React Hook Form + Zod
- [x] Design moderno com efeitos glass morphism
- [x] Fundo de vídeo animado do YouTube
- [x] Configuração completa Prisma + PostgreSQL
- [x] Componentes reutilizáveis e animados

### 🚧 Possíveis Expansões
- [ ] Dashboard pós-login
- [ ] Perfil de usuário
- [ ] Recuperação de senha
- [ ] Autenticação social (Google, GitHub)
- [ ] Autenticação de dois fatores

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através dos issues do GitHub.

---

**Desenvolvido com ❤️ para experiências de login modernas**
