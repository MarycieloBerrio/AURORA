# AURORA

**AURORA** es una aplicación web de orientación vocacional gamificada para estudiantes hispanohablantes. Combina tests psicométricos validados (RIASEC, HEXACO) con evaluaciones de aptitudes cognitivas en un recorrido interactivo por pisos.

---

## Características principales

- 🏠 **4 pisos interactivos** — cada piso contiene 3-4 pruebas de tipos distintos, distribuidas visualmente sobre la ilustración del entorno
- 🎨 **Tests diferenciados por color** — Intereses (índigo), Personalidad (ámbar), Aptitudes (esmeralda)
- 📋 **Cuestionario paginado** — preguntas agrupadas con tarjetas clickeables (escala Likert de 5 opciones)
- 📊 **Barras de progreso global** — widget flotante con avance en Intereses, Personalidad y Aptitudes
- 🔐 **Autenticación** — Credentials + Google OAuth (NextAuth.js)
- 👤 **Perfil de usuario** — nombre, género, fecha de nacimiento, nivel educativo
- 🧮 **Resultados persistidos** — 15 campos JSON en BD (4 RIASEC + 3 HEXACO + 8 aptitudes)

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + Tailwind CSS 4 |
| Lenguaje | TypeScript 5 |
| Autenticación | NextAuth.js 4 (Credentials + Google OAuth) |
| ORM | Prisma 6 |
| Base de datos | PostgreSQL |
| Validación | Zod 4 |
| Formularios | React Hook Form 7 |

---

## Estructura del proyecto

```
aurora/
├── app/                        # Rutas y API handlers (App Router)
│   ├── api/
│   │   ├── auth/               # register, [...nextauth]
│   │   ├── assessment/         # [testId]/submit
│   │   └── profile/            # complete
│   └── app/
│       ├── floor/[floorId]/    # Página del piso
│       │   └── test/[testId]/  # Cuestionario + completado
│       └── welcome/
├── components/                 # Atomic Design
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── constants/
│   ├── floors.ts               # Configuración de 4 pisos con tests embebidos
│   └── questions/              # riasec.ts, hexaco.ts
├── features/
│   ├── assessment/             # Cuestionario paginado, tarjetas Likert
│   ├── auth/                   # Login, registro
│   └── profile/                # Formulario de perfil
├── lib/
│   ├── auth.ts                 # NextAuth config
│   └── prisma.ts               # Cliente Prisma singleton
├── repositories/
│   └── test-repository.ts      # Acceso a datos de tests
├── services/
│   └── test-service.ts         # Lógica de negocio: guardar, calcular, progreso
├── types/
│   ├── next-auth.d.ts
│   └── test-results.ts         # RiasecTestResult, HexacoTestResult, SkillTestResult
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── public/
    └── assets/                 # Imágenes de Aurora y pisos
```

---

## Modelo de datos

La tabla `User` almacena los 15 resultados de tests como columnas JSON independientes (modelo denormalizado):

| Campos | Tipo | Descripción |
|---|---|---|
| `testRiasec1..4` | `Json?` | Tests de intereses vocacionales (RIASEC) |
| `testHexaco1..3` | `Json?` | Tests de personalidad (HEXACO) |
| `testReadingComprehension` | `Json?` | Comprensión lectora |
| `testDeductiveReasoning` | `Json?` | Razonamiento deductivo |
| `testInductiveReasoning` | `Json?` | Razonamiento inductivo |
| `testMathematicalReasoning` | `Json?` | Razonamiento matemático |
| `testMemorization` | `Json?` | Memorización |
| `testPerceptualSpeed` | `Json?` | Velocidad perceptual |
| `testSpatialReasoning` | `Json?` | Razonamiento espacial |
| `testSelectiveAttention` | `Json?` | Atención selectiva |

El campo `profileCompleted` es **computado** (no almacenado) a partir de `name`, `birthdate` y `educationalLevel`.

---

## Variables de entorno

Copia `.env.example` a `.env.local` y completa los valores:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/aurora_db?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="un-secreto-largo-y-aleatorio"
AUTH_SECRET="un-secreto-largo-y-aleatorio"
AUTH_GOOGLE_ID="tu-google-oauth-client-id"
AUTH_GOOGLE_SECRET="tu-google-oauth-client-secret"
```

> `AUTH_SECRET` es el secreto principal de Auth.js. `NEXTAUTH_SECRET` se mantiene por compatibilidad.

---

## Configuración local

```bash
# 1. Instalar dependencias
npm install

# 2. Generar el cliente Prisma
npm run prisma:generate

# 3. Aplicar migraciones
npm run prisma:migrate -- --name init

# 4. Poblar con datos de prueba
npm run prisma:seed

# 5. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## Credenciales demo

| Campo | Valor |
|---|---|
| Email | `demo@aurora.app` |
| Contraseña | `Demo12345!` |

---

## Flujo principal

```
/login
  └─► /register              (nuevo usuario)
  └─► /welcome/complete-profile (perfil incompleto)
        └─► /welcome
              └─► /app/floor/floor-1
                    └─► /app/floor/floor-1/test/riasec-1
                          └─► /app/floor/floor-1/test/riasec-1/completed
```

---

## Pisos y pruebas

| Piso | Intereses | Personalidad | Aptitudes |
|---|---|---|---|
| Piso 1 | Intereses I | Personalidad I | Comprensión Lectora, Razonamiento Deductivo |
| Piso 2 | Intereses II | Personalidad II | Razonamiento Inductivo, Razonamiento Matemático |
| Piso 3 | Intereses III | Personalidad III | Memorización, Velocidad Perceptual |
| Piso 4 | Intereses IV | — | Razonamiento Espacial, Atención Selectiva |

---

## Google OAuth — configuración

Añade el URI de redirección en la consola de Google Cloud:

```
http://localhost:3000/api/auth/callback/google
```

Para producción, reemplaza con la URL del dominio desplegado.
