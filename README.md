# 🐾 VetLearn — Plataforma Educativa Veterinaria

Plataforma web educativa para estudiantes de medicina veterinaria. Construida con **Next.js 14**, **PostgreSQL** vía Prisma, **Auth.js v5** y desplegable en **Vercel** con un clic.

---

## 🚀 Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 14 (App Router) + Tailwind CSS |
| Backend | Next.js API Routes + Server Actions |
| Auth | Auth.js v5 (NextAuth) + JWT |
| Base de datos | PostgreSQL + Prisma ORM |
| Deploy | Vercel + Vercel Postgres |
| IA Asistente | Anthropic Claude API |

---

## 👥 Usuarios iniciales

| Nombre | Usuario | Rol |
|---|---|---|
| Alejandra Montoya | `amontoya` | Admin |
| Natalia Montoya M | `montonaty` | Estudiante |

> Las contraseñas son iguales al usuario (ejemplo: usuario `amontoya`, clave `amontoya`). **Cámbialas en producción.**

---

## ⚙️ Instalación local

### 1. Clonar y preparar

```bash
git clone <tu-repo>
cd vetlearn
npm install
```

### 2. Variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con tus valores:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/vetlearn?sslmode=require"
AUTH_SECRET="genera-con: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
ANTHROPIC_API_KEY="sk-ant-..."   # Opcional: para el asistente VetBot
```

### 3. Base de datos

```bash
# Crear tablas
npx prisma migrate dev --name init

# Poblar con datos iniciales (usuarios, especies, módulos, quizzes)
npm run db:seed
```

### 4. Ejecutar

```bash
npm run dev
# → http://localhost:3000
```

---

## 🌐 Deploy en Vercel

### Opción A — Vercel CLI (recomendado)

```bash
npm i -g vercel
vercel login
vercel
```

### Opción B — GitHub + Vercel Dashboard

1. Sube el proyecto a GitHub
2. Ve a [vercel.com/new](https://vercel.com/new) e importa el repo
3. En **Storage**, añade una base de datos **Vercel Postgres**
4. En **Environment Variables**, agrega:
   - `AUTH_SECRET` → `openssl rand -base64 32`
   - `ANTHROPIC_API_KEY` → tu API key de Anthropic
5. El `DATABASE_URL` se autoconfigura con Vercel Postgres

### Post-deploy: ejecutar seed en producción

```bash
# Con la DATABASE_URL de producción en tu .env
npx prisma migrate deploy
npm run db:seed
```

---

## 📁 Estructura del proyecto

```
vetlearn/
├── prisma/
│   ├── schema.prisma        # Modelos de base de datos
│   └── seed.ts              # Datos iniciales
├── src/
│   ├── app/
│   │   ├── login/           # Página de login
│   │   ├── dashboard/       # Home del usuario
│   │   ├── modulos/         # Módulos educativos
│   │   │   └── [slug]/      # Detalle de módulo
│   │   ├── especies/        # Parámetros fisiológicos
│   │   │   └── [slug]/      # Detalle por especie
│   │   ├── quiz/            # Quiz interactivo
│   │   ├── asistente/       # Chat VetBot
│   │   ├── perfil/          # Perfil y logros
│   │   └── api/
│   │       ├── auth/        # NextAuth handlers
│   │       ├── species/     # CRUD especies
│   │       ├── quiz/        # Intentos de quiz
│   │       ├── users/       # Admin users
│   │       └── asistente/   # IA Claude
│   ├── components/
│   │   ├── auth/            # LoginForm
│   │   ├── layout/          # Navbar, Sidebar
│   │   ├── species/         # SpeciesChecker
│   │   └── quiz/            # QuizClient
│   ├── lib/
│   │   ├── auth.ts          # Auth.js config
│   │   └── prisma.ts        # Prisma client
│   ├── middleware.ts         # Protección de rutas
│   └── types/               # TypeScript types
└── vercel.json              # Configuración Vercel
```

---

## 🧩 Módulos educativos incluidos

- 💉 **Tipos de agujas** — Calibres (Gauge), bisel, vías de administración
- 🩺 **Tipos de sondas** — Nasogástrica, urinaria, características
- 🔧 **Instrumental básico** — Mangos, pinzas hemostáticas, tijeras
- 📋 **Procedimientos básicos** — Venopunción cefálica paso a paso

---

## 🐾 Especies con parámetros

| Especie | Temp. | FC | FR |
|---|---|---|---|
| 🐕 Perro | 37.5–39.5°C | 60–140 lpm | 15–30 rpm |
| 🐈 Gato | 38–39.5°C | 120–220 lpm | 20–40 rpm |
| 🐄 Vaca | 38–39.5°C | 48–84 lpm | 12–36 rpm |
| 🐖 Cerdo | 38–40°C | 60–120 lpm | 10–24 rpm |
| 🐔 Pollo | 40.5–42°C | 250–350 lpm | 15–40 rpm |
| 🐴 Caballo | 37.5–38.5°C | 28–44 lpm | 8–16 rpm |

---

## 🔐 Seguridad

- Contraseñas hasheadas con **bcrypt** (10 rounds)
- Sesiones JWT firmadas con `AUTH_SECRET`
- Rutas protegidas por middleware
- Role-based access: ADMIN vs STUDENT
- Validación de inputs con **Zod**

---

## 📄 Licencia

MIT — Uso educativo libre.
