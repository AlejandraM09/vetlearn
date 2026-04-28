# Clinical Curator Vet

Plataforma educativa de veterinaria construida con Next.js y PostgreSQL. El proyecto está diseñado para estudiantes principiantes y combina contenido estructurado, tarjetas visuales y herramientas interactivas.

## Características principales

- Página de inicio con búsqueda rápida, módulos recomendados y progreso del usuario
- Módulos educativos de agujas, sondas, instrumental y procedimientos básicos
- Sección de parámetros fisiológicos por especie
- Casos clínicos interactivos con toma de decisiones
- Perfil de usuario con progreso e insignias
- Diseño responsive, limpio y profesional con enfoque educativo

## Tecnologías sugeridas

- Frontend: Next.js, React, Tailwind CSS
- Backend: API Routes de Next.js y Prisma
- Base de datos: PostgreSQL
- ORM: Prisma

## Cómo iniciar

1. Instala dependencias:

```bash
npm install
```

2. Copia `.env.example` a `.env` y actualiza la variable `DATABASE_URL` con tus credenciales:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/vetplatform"
```

3. Genera el cliente de Prisma y aplica migraciones:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Si deseas poblar la base de datos con datos iniciales, ejecuta:

```bash
npm run seed
```

5. Ejecuta el servidor:

```bash
npm run dev
```

## Estructura del sitio

- `/` - Home
- `/modules` - Biblioteca educativa
- `/modules/[slug]` - Detalle de módulo
- `/physiology` - Parámetros fisiológicos por especie
- `/physiology/[slug]` - Detalle de especie
- `/cases` - Casos clínicos interactivos
- `/cases/[slug]` - Caso clínico detallado
- `/quiz` - Quiz interactivo
- `/flashcards` - Flashcards educativas
- `/search` - Buscador inteligente
- `/profile` - Perfil de usuario

## API local

- `GET /api/search?q=...` — búsqueda por palabras clave
- `POST /api/tutor` — asistente inteligente tipo tutor

## Documentación de diseño

Revisa `docs/wireframes.md` para la descripción visual de cada sección y el flujo de usuario.
