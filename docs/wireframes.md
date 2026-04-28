# Wireframes y Mockups - Clinical Curator Vet

## Objetivo general
Diseñar una plataforma web educativa para estudiantes de veterinaria principiantes, con una experiencia clara, interactiva y basada en tarjetas. El enfoque combina aprendizaje práctico, consulta rápida y gamificación.

---

## Página de inicio (Home)

### Secciones
1. **Hero de bienvenida**
   - Título principal
   - Mensaje motivador
   - Estado de progreso
2. **Búsqueda inteligente**
   - Barra de búsqueda central
   - Etiquetas de búsqueda rápida
3. **Accesos rápidos**
   - Tarjetas a temas clave: agujas, sondas, instrumental
4. **Resumen de progreso**
   - Barra de progreso mensual
   - Logros rápidos
5. **Sección destacada**
   - Módulo recomendado con CTA

### Layout
- Cabecera con navegación superior:
  - Inicio / Módulos / Parámetros / Casos / Perfil
- Diseño en tarjetas con fondo blanco y sombras suaves
- Uso de verde principal, azul y blanco para transmitir salud y claridad

---

## Módulos educativos

### Componentes
- Tarjetas de módulo con:
  - Categoría
  - Título
  - Descripción breve
  - Número de lecciones
  - Etiqueta destacada
- Modo de visualización en grilla 2-3 columnas
- Filtrado por tipo de contenido

### Módulos clave
- Tipos de agujas
- Tipos de sondas
- Instrumental veterinario básico
- Procedimientos básicos paso a paso

---

## Parámetros fisiológicos por especie

### Pantalla de selección
- Tarjetas para species:
  - Perro
  - Gato
  - Vaca
  - Cerdo
  - Pollo
  - Caballo
- Cada tarjeta incluye:
  - Imagen/icono
  - Nombre de especie
  - Nombre científico

### Vista de detalle por especie
- Ficha clínica con valores:
  - Temperatura corporal (°C)
  - Frecuencia cardíaca (lpm)
  - Frecuencia respiratoria (rpm)
  - Peso promedio (opcional)
  - Tiempo de llenado capilar
- Funcionalidades:
  - Comparar parámetros entre especies
  - Marcar como favorito
  - Modo consulta rápida
  - Ingresar valores para obtener retroalimentación normal/anormal

---

## Buscador inteligente

### Características
- Búsqueda por palabras clave
- Autocompletado
- Resultados organizados por categoría:
  - Módulos
  - Parámetros
  - Casos clínicos
  - Definiciones rápidas

### Experiencia
- Input claro en la página principal
- Resultados en lista o tarjetas
- Acceso directo a la sección pertinente
- API local para búsquedas que usa datos de módulos, casos y temas rápidos

---

## Sistema de aprendizaje interactivo

### Elementos
- Quiz de opción múltiple
- Flashcards
- Evaluaciones por módulo
- Indicador de progreso visible

### Flujo
1. Selecciona un módulo
2. Estudia contenido
3. Responde preguntas
4. Recibe retroalimentación inmediata
5. Avanza en tu progreso

---

## Perfil de usuario

### Datos visibles
- Progreso general
- Logros e insignias
- Historial de aprendizaje
- Nivel de avance

### Diseño
- Tarjetas con métricas y resumen de actividad
- Sección de insignias motivadora

---

## Casos clínicos interactivos

### Dinámica
- Presentar escenarios básicos
- Formular preguntas cerradas o de selección
- Permitir elegir instrumento, examen o procedimiento
- Ofrecer retroalimentación educativa

### Ejemplo
- Caso: Golden Retriever con abdomen distendido
- Decisión: diagnóstico inicial, elección de obra y seguimiento

---

## Asistente inteligente

### Funcionalidad
- Chat integrado tipo tutor
- Responde dudas sobre contenidos básicos veterinarios
- Guía al estudiante cuando pregunta por síntomas o instrumentos
- Comunicación backend a través de un endpoint local `/api/tutor`

---

## Flow de usuario

1. Usuario entra → 2. busca o selecciona módulo → 3. estudia contenido → 4. consulta parámetros → 5. realiza quiz → 6. recibe retroalimentación → 7. avanza en su progreso

---

## Notas de diseño

- Estilo limpio y profesional
- Diseño basado en tarjetas
- Navegación clara con navbar superior
- Responsive para móvil y escritorio
- Tipografía legible y amigable
- Paleta: verde, azul, blanco, gris neutro
