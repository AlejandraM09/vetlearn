// prisma/seed-quiz.ts — Ejecutar después de seed.ts
// Ya incluido en seed.ts principal, este archivo es referencia adicional

// Para agregar más preguntas manualmente:
// npx tsx prisma/seed-quiz.ts

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function addQuizQuestions() {
  const quiz = await prisma.quiz.upsert({
    where: { id: 'quiz-parametros-1' },
    update: {},
    create: {
      id: 'quiz-parametros-1',
      title: 'Parámetros fisiológicos',
      description: 'Evalúa tu conocimiento sobre valores normales por especie',
    },
  })

  const questions = [
    {
      text: '¿Cuál es la temperatura corporal normal del perro?',
      options: ['36.5 – 37°C', '37.5 – 39.5°C', '40 – 41°C', '39.5 – 41°C'],
      correctIndex: 1,
      explanation: 'En el perro, la temperatura normal oscila entre 37.5 y 39.5°C. Valores superiores a 39.5°C se consideran fiebre (hipertermia).',
      order: 1,
    },
    {
      text: '¿Qué especie tiene la frecuencia cardíaca más alta?',
      options: ['Perro', 'Vaca', 'Pollo', 'Caballo'],
      correctIndex: 2,
      explanation: 'El pollo puede tener hasta 350 lpm, la más alta entre las especies de interés veterinario. Esto es normal para aves por su alto metabolismo.',
      order: 2,
    },
    {
      text: 'El tiempo de llenado capilar normal en perros y gatos es:',
      options: ['Menor de 5 segundos', 'Entre 2 y 4 segundos', 'Menor de 2 segundos', 'Mayor de 3 segundos'],
      correctIndex: 2,
      explanation: 'El TLC normal en pequeños animales es menor de 2 segundos. Un TLC prolongado puede indicar hipoperfusión o shock.',
      order: 3,
    },
    {
      text: '¿Cuál es la frecuencia respiratoria normal del caballo en reposo?',
      options: ['8 – 16 rpm', '20 – 30 rpm', '30 – 40 rpm', '5 – 8 rpm'],
      correctIndex: 0,
      explanation: 'El caballo en reposo respira entre 8 y 16 veces por minuto. El estrés, el ejercicio y enfermedades respiratorias pueden elevar este valor.',
      order: 4,
    },
    {
      text: 'La temperatura normal del gato es aproximadamente:',
      options: ['37 – 38°C', '38 – 39.5°C', '39.5 – 41°C', '36 – 37.5°C'],
      correctIndex: 1,
      explanation: 'El gato tiene una temperatura corporal normal entre 38 y 39.5°C, similar al perro. Un gato asustado puede mostrar una elevación transitoria sin estar enfermo.',
      order: 5,
    },
  ]

  for (const q of questions) {
    await prisma.question.create({
      data: { ...q, quizId: quiz.id },
    })
  }

  console.log(`✅ Quiz "${quiz.title}" creado con ${questions.length} preguntas`)
  await prisma.$disconnect()
}

addQuizQuestions().catch(console.error)
