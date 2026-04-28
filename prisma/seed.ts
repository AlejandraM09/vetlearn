// prisma/seed.ts
import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ── USERS ──────────────────────────────────────────────────────────────────
  const hashedAlejandra = await bcrypt.hash('amontoya', 10)
  const hashedNatalia   = await bcrypt.hash('montonaty', 10)

  const alejandra = await prisma.user.upsert({
    where: { username: 'amontoya' },
    update: {},
    create: {
      username: 'amontoya',
      name: 'Alejandra Montoya',
      email: 'amontoya@vetlearn.co',
      password: hashedAlejandra,
      role: Role.ADMIN,
      xp: 650,
      level: 3,
    },
  })

  const natalia = await prisma.user.upsert({
    where: { username: 'montonaty' },
    update: {},
    create: {
      username: 'montonaty',
      name: 'Natalia Montoya M',
      email: 'montonaty@vetlearn.co',
      password: hashedNatalia,
      role: Role.STUDENT,
      xp: 120,
      level: 1,
    },
  })

  console.log(`✅ Users: ${alejandra.username}, ${natalia.username}`)

  // ── MODULES ────────────────────────────────────────────────────────────────
  const modules = [
    {
      slug: 'tipos-agujas',
      title: 'Tipos de agujas',
      description: 'Clasificación, calibres y usos según vía de administración',
      icon: '💉',
      color: '#0F6E56',
      order: 1,
      cards: [
        {
          title: 'Anatomía de la aguja',
          content: 'Una aguja hipodérmica está compuesta por el bisel (punta cortante), el cañón (cuerpo tubular) y el pabellón (conector con jeringa). El bisel puede ser corto, medio o largo según el uso clínico.',
          tips: ['El bisel largo penetra mejor tejidos densos', 'Siempre verificar la integridad antes de usar'],
          order: 1,
        },
        {
          title: 'Calibres (Gauge)',
          content: 'El calibre se mide en Gauge (G): a mayor número, menor diámetro. Los calibres más usados en veterinaria son: 18G (gruesas, bovinos), 20-21G (intermedias, caninos/felinos), 25-27G (finas, subcutánea, felinos).',
          tips: ['18G = color rosa', '21G = color verde', '23G = color azul', '25G = color naranja'],
          order: 2,
        },
        {
          title: 'Vías de administración',
          content: 'Subcutánea (SC): agujas cortas 23-25G. Intramuscular (IM): 21-23G longitud media. Intravenosa (IV): 18-20G catéter o aguja. Intradérmica (ID): 26-27G bisel corto.',
          tips: ['SC en pliegue de piel', 'IM en cuádriceps o epaxiales', 'IV preferir cáteter sobre aguja'],
          order: 3,
        },
      ],
    },
    {
      slug: 'tipos-sondas',
      title: 'Tipos de sondas',
      description: 'Características, materiales y aplicación clínica veterinaria',
      icon: '🩺',
      color: '#185FA5',
      order: 2,
      cards: [
        {
          title: 'Sonda nasogástrica',
          content: 'Permite acceso al estómago a través de la cavidad nasal. Se mide desde la nariz hasta la última costilla (10-13 costilla). Usos: alimentación forzada, lavado gástrico, administración de medicamentos.',
          tips: ['Verificar colocación antes de administrar', 'Lubricar con gel lidocaínico', 'Fijar a la piel con punto o adhesivo'],
          order: 1,
        },
        {
          title: 'Sonda urinaria',
          content: 'Permite el drenaje de vejiga o administración de medicamentos intravesicales. En machos la uretra es más larga y estrecha. Materiales: PVC, látex o silicona.',
          tips: ['Técnica aséptica obligatoria', 'Lubricar siempre', 'No forzar en obstrucciones'],
          order: 2,
        },
      ],
    },
    {
      slug: 'instrumental-basico',
      title: 'Instrumental básico',
      description: 'Identificación y uso del instrumental quirúrgico esencial',
      icon: '🔧',
      color: '#3B6D11',
      order: 3,
      cards: [
        {
          title: 'Mangos de bisturí',
          content: 'El mango Nº3 acepta hojas del 10 al 15 (cirugía pequeña). El mango Nº4 acepta hojas del 20 al 25 (cirugía de tejidos mayores). La hoja se monta con pinza porta-agujas, nunca con los dedos.',
          tips: ['Hoja 10: incisiones curvas', 'Hoja 11: punciones y cortes en punta', 'Hoja 15: incisiones finas y curvas'],
          order: 1,
        },
        {
          title: 'Pinzas hemostáticas',
          content: 'Mosquito: vasos finos, tejidos delicados. Kelly: vasos medianos. Rochester-Carmalt: vasos grandes, pedículos. La diferencia está en el estriado: transversal total (Mosquito/Kelly) vs parcial (Carmalt).',
          tips: ['Nunca dejar dientes hacia tejido sano', 'Desbloquear con movimiento de presión lateral'],
          order: 2,
        },
      ],
    },
    {
      slug: 'procedimientos-basicos',
      title: 'Procedimientos básicos',
      description: 'Guías paso a paso de procedimientos clínicos esenciales',
      icon: '📋',
      color: '#BA7517',
      order: 4,
      cards: [
        {
          title: 'Venopunción cefálica',
          content: 'Paso 1: Estabilizar el miembro. Paso 2: Aplicar torniquete proximal al codo. Paso 3: Palpar y visualizar la vena. Paso 4: Insertar aguja 21-23G con bisel arriba a 15-30°. Paso 5: Confirmar reflujo de sangre. Paso 6: Retirar torniquete.',
          tips: ['Rasurar si el pelaje es denso', 'Calentar la zona facilita la dilatación', 'Comprimir 30 seg post-extracción'],
          order: 1,
        },
      ],
    },
  ]

  for (const mod of modules) {
    const { cards, ...moduleData } = mod
    const created = await prisma.module.upsert({
      where: { slug: mod.slug },
      update: {},
      create: {
        ...moduleData,
        cards: {
          create: cards,
        },
      },
    })
    console.log(`  📚 Module: ${created.title}`)
  }

  // ── SPECIES ────────────────────────────────────────────────────────────────
  const speciesData = [
    {
      slug: 'perro',
      name: 'Perro',
      latinName: 'Canis lupus familiaris',
      emoji: '🐕',
      params: [
        { label: 'Temperatura corporal', value: '38.5', unit: '°C', rangeMin: 37.5, rangeMax: 39.5, order: 1 },
        { label: 'Frecuencia cardíaca', value: '100', unit: 'lpm', rangeMin: 60, rangeMax: 140, order: 2 },
        { label: 'Frecuencia respiratoria', value: '20', unit: 'rpm', rangeMin: 15, rangeMax: 30, order: 3 },
        { label: 'Tiempo llenado capilar', value: '<2', unit: 'seg', rangeMin: 0, rangeMax: 2, order: 4 },
        { label: 'Peso promedio', value: '25', unit: 'kg', rangeMin: 5, rangeMax: 80, order: 5 },
      ],
    },
    {
      slug: 'gato',
      name: 'Gato',
      latinName: 'Felis catus',
      emoji: '🐈',
      params: [
        { label: 'Temperatura corporal', value: '38.7', unit: '°C', rangeMin: 38, rangeMax: 39.5, order: 1 },
        { label: 'Frecuencia cardíaca', value: '160', unit: 'lpm', rangeMin: 120, rangeMax: 220, order: 2 },
        { label: 'Frecuencia respiratoria', value: '26', unit: 'rpm', rangeMin: 20, rangeMax: 40, order: 3 },
        { label: 'Tiempo llenado capilar', value: '<2', unit: 'seg', rangeMin: 0, rangeMax: 2, order: 4 },
        { label: 'Peso promedio', value: '4', unit: 'kg', rangeMin: 2.5, rangeMax: 6, order: 5 },
      ],
    },
    {
      slug: 'vaca',
      name: 'Vaca',
      latinName: 'Bos taurus',
      emoji: '🐄',
      params: [
        { label: 'Temperatura corporal', value: '38.8', unit: '°C', rangeMin: 38, rangeMax: 39.5, order: 1 },
        { label: 'Frecuencia cardíaca', value: '65', unit: 'lpm', rangeMin: 48, rangeMax: 84, order: 2 },
        { label: 'Frecuencia respiratoria', value: '26', unit: 'rpm', rangeMin: 12, rangeMax: 36, order: 3 },
        { label: 'Movimientos ruminales', value: '2', unit: '/min', rangeMin: 1, rangeMax: 3, order: 4 },
        { label: 'Peso promedio', value: '500', unit: 'kg', rangeMin: 400, rangeMax: 700, order: 5 },
      ],
    },
    {
      slug: 'cerdo',
      name: 'Cerdo',
      latinName: 'Sus scrofa domesticus',
      emoji: '🐖',
      params: [
        { label: 'Temperatura corporal', value: '39', unit: '°C', rangeMin: 38, rangeMax: 40, order: 1 },
        { label: 'Frecuencia cardíaca', value: '80', unit: 'lpm', rangeMin: 60, rangeMax: 120, order: 2 },
        { label: 'Frecuencia respiratoria', value: '18', unit: 'rpm', rangeMin: 10, rangeMax: 24, order: 3 },
        { label: 'Peso promedio', value: '100', unit: 'kg', rangeMin: 80, rangeMax: 150, order: 4 },
      ],
    },
    {
      slug: 'pollo',
      name: 'Pollo',
      latinName: 'Gallus gallus domesticus',
      emoji: '🐔',
      params: [
        { label: 'Temperatura corporal', value: '41.5', unit: '°C', rangeMin: 40.5, rangeMax: 42, order: 1 },
        { label: 'Frecuencia cardíaca', value: '300', unit: 'lpm', rangeMin: 250, rangeMax: 350, order: 2 },
        { label: 'Frecuencia respiratoria', value: '30', unit: 'rpm', rangeMin: 15, rangeMax: 40, order: 3 },
        { label: 'Peso promedio', value: '2.5', unit: 'kg', rangeMin: 1.5, rangeMax: 4, order: 4 },
      ],
    },
    {
      slug: 'caballo',
      name: 'Caballo',
      latinName: 'Equus caballus',
      emoji: '🐴',
      params: [
        { label: 'Temperatura corporal', value: '38', unit: '°C', rangeMin: 37.5, rangeMax: 38.5, order: 1 },
        { label: 'Frecuencia cardíaca', value: '40', unit: 'lpm', rangeMin: 28, rangeMax: 44, order: 2 },
        { label: 'Frecuencia respiratoria', value: '14', unit: 'rpm', rangeMin: 8, rangeMax: 16, order: 3 },
        { label: 'Tiempo llenado capilar', value: '<2', unit: 'seg', rangeMin: 0, rangeMax: 2, order: 4 },
        { label: 'Peso promedio', value: '500', unit: 'kg', rangeMin: 400, rangeMax: 600, order: 5 },
      ],
    },
  ]

  for (const sp of speciesData) {
    const { params, ...spData } = sp
    const created = await prisma.species.upsert({
      where: { slug: sp.slug },
      update: {},
      create: {
        ...spData,
        parameters: { create: params },
      },
    })
    console.log(`  🐾 Species: ${created.name}`)
  }

  // ── BADGES ─────────────────────────────────────────────────────────────────
  const badges = [
    { slug: 'primer-quiz', name: 'Primer quiz', description: 'Completaste tu primer cuestionario', icon: '🏅', condition: 'quiz_count >= 1', xpReward: 50 },
    { slug: 'explorador', name: 'Explorador', description: 'Consultaste las 6 especies', icon: '🔬', condition: 'species_visited >= 6', xpReward: 100 },
    { slug: 'racha-7', name: 'Racha 7 días', description: 'Estudiaste 7 días seguidos', icon: '⭐', condition: 'streak >= 7', xpReward: 150 },
    { slug: 'clinico', name: 'Clínico', description: 'Completaste todos los módulos', icon: '🩺', condition: 'modules_completed >= 4', xpReward: 300 },
  ]

  for (const b of badges) {
    await prisma.badge.upsert({ where: { slug: b.slug }, update: {}, create: b })
  }

  // ── QUIZZES ────────────────────────────────────────────────────────────────
  const quiz = await prisma.quiz.upsert({
    where: { id: 'quiz-parametros-1' },
    update: {},
    create: {
      id: 'quiz-parametros-1',
      title: 'Parámetros fisiológicos',
      description: 'Evalúa tu conocimiento sobre valores normales por especie',
    },
  })

  const quizQuestions = [
    { text: '¿Cuál es la temperatura corporal normal del perro?', options: ['36.5 – 37°C','37.5 – 39.5°C','40 – 41°C','39.5 – 41°C'], correctIndex: 1, explanation: 'En el perro, la temperatura normal oscila entre 37.5 y 39.5°C. Valores superiores a 39.5°C se consideran fiebre (hipertermia).', order: 1 },
    { text: '¿Qué especie tiene la frecuencia cardíaca más alta?', options: ['Perro','Vaca','Pollo','Caballo'], correctIndex: 2, explanation: 'El pollo puede tener hasta 350 lpm, la más alta entre las especies de interés veterinario. Esto es normal por su alto metabolismo.', order: 2 },
    { text: 'El tiempo de llenado capilar normal en perros y gatos es:', options: ['Menor de 5 segundos','Entre 2 y 4 segundos','Menor de 2 segundos','Mayor de 3 segundos'], correctIndex: 2, explanation: 'El TLC normal en pequeños animales es menor de 2 segundos. Un TLC prolongado puede indicar hipoperfusión o shock.', order: 3 },
    { text: '¿Cuál es la frecuencia respiratoria normal del caballo en reposo?', options: ['8 – 16 rpm','20 – 30 rpm','30 – 40 rpm','5 – 8 rpm'], correctIndex: 0, explanation: 'El caballo en reposo respira entre 8 y 16 veces por minuto. El estrés y el ejercicio pueden elevar este valor.', order: 4 },
    { text: 'La temperatura normal del gato es aproximadamente:', options: ['37 – 38°C','38 – 39.5°C','39.5 – 41°C','36 – 37.5°C'], correctIndex: 1, explanation: 'El gato tiene temperatura normal entre 38 y 39.5°C, similar al perro.', order: 5 },
  ]

  const existingQs = await prisma.question.count({ where: { quizId: quiz.id } })
  if (existingQs === 0) {
    await prisma.question.createMany({ data: quizQuestions.map(q => ({ ...q, quizId: quiz.id })) })
    console.log(`  🧠 Quiz: ${quiz.title} (${quizQuestions.length} preguntas)`)
  }

  // Assign badges to Alejandra (admin)
  const badgeRecords = await prisma.badge.findMany({ where: { slug: { in: ['primer-quiz', 'explorador', 'racha-7'] } } })
  for (const badge of badgeRecords) {
    await prisma.userBadge.upsert({
      where: { userId_badgeId: { userId: alejandra.id, badgeId: badge.id } },
      update: {},
      create: { userId: alejandra.id, badgeId: badge.id },
    })
  }

  console.log('✅ Seed completed!')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
