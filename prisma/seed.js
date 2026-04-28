const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seed iniciando...');

  await prisma.user.upsert({
    where: { email: 'estudiante@vet.edu' },
    update: {},
    create: {
      email: 'estudiante@vet.edu',
      name: 'Estudiante Veterinario',
    },
  });

  await prisma.module.upsert({
    where: { slug: 'agujas' },
    update: {},
    create: {
      slug: 'agujas',
      title: 'Tipos de agujas y calibres',
      description: 'Aprende a elegir la aguja correcta según el procedimiento.',
      category: 'Agujas',
      lessons: 8,
    },
  });

  await prisma.module.upsert({
    where: { slug: 'sondas' },
    update: {},
    create: {
      slug: 'sondas',
      title: 'Sondas periodontales y de drenaje',
      description: 'Guía básica de sondas para evaluación oral y cuidado postoperatorio.',
      category: 'Sondas',
      lessons: 6,
    },
  });

  await prisma.module.upsert({
    where: { slug: 'instrumental' },
    update: {},
    create: {
      slug: 'instrumental',
      title: 'Instrumental básico',
      description: 'Conoce pinzas, tijeras y portagujas esenciales.',
      category: 'Instrumental',
      lessons: 10,
    },
  });

  const species = [
    {
      slug: 'perro',
      name: 'Perro',
      reference: 'Canis familiaris',
      temperature: '38.3 - 39.2°C',
      heartRate: '70 - 120 lpm',
      respiratoryRate: '18 - 34 rpm',
      weightRange: '5 - 45 kg',
      notes: '≤ 2 segundos de llenado capilar',
    },
    {
      slug: 'gato',
      name: 'Gato',
      reference: 'Felis catus',
      temperature: '38.0 - 39.0°C',
      heartRate: '150 - 200 lpm',
      respiratoryRate: '20 - 30 rpm',
      weightRange: '3 - 7 kg',
      notes: '≤ 2 segundos de llenado capilar',
    },
    {
      slug: 'vaca',
      name: 'Vaca',
      reference: 'Bos taurus',
      temperature: '38.0 - 39.0°C',
      heartRate: '48 - 84 lpm',
      respiratoryRate: '10 - 30 rpm',
      weightRange: '450 - 800 kg',
      notes: '≤ 3 segundos de llenado capilar',
    },
    {
      slug: 'cerdo',
      name: 'Cerdo',
      reference: 'Sus scrofa',
      temperature: '38.7 - 39.8°C',
      heartRate: '60 - 100 lpm',
      respiratoryRate: '8 - 18 rpm',
      weightRange: '30 - 250 kg',
      notes: '≤ 2 segundos de llenado capilar',
    },
    {
      slug: 'pollo',
      name: 'Pollo',
      reference: 'Gallus gallus',
      temperature: '40.0 - 42.0°C',
      heartRate: '250 - 300 lpm',
      respiratoryRate: '15 - 30 rpm',
      weightRange: '1.5 - 4 kg',
      notes: '≤ 2 segundos de llenado capilar',
    },
    {
      slug: 'caballo',
      name: 'Caballo',
      reference: 'Equus ferus caballus',
      temperature: '37.5 - 38.5°C',
      heartRate: '28 - 44 lpm',
      respiratoryRate: '8 - 16 rpm',
      weightRange: '350 - 600 kg',
      notes: '≤ 2 segundos de llenado capilar',
    },
  ];

  for (const item of species) {
    await prisma.species.upsert({
      where: { slug: item.slug },
      update: {},
      create: item,
    });
  }

  await prisma.caseStudy.upsert({
    where: { slug: 'cooper-abdomen' },
    update: {},
    create: {
      slug: 'cooper-abdomen',
      title: 'Golden Retriever con abdomen distendido',
      category: 'Urgencias',
      summary: 'Paciente de 7 años con distensión abdominal, arcadas y taquipnea.',
      scenario: 'Cooper llega con dolor abdominal, mucosas pálidas y dificultad para respirar. Elige el examen y el instrumento correcto para orientar tu diagnóstico.',
      decisions: {
        create: [
          {
            label: 'Radiografía abdominal lateral',
            description: 'Solicita imágenes para verificar la presencia de líquido libre, gases y líneas intestinales distendidas.',
            feedback: 'Correcto. La radiografía es útil para identificar obstrucciones y aire libre en cavidad abdominal.',
            correct: true,
          },
          {
            label: 'Aspiración con aguja',
            description: 'Usa una aguja para extraer líquido y confirmar si hay ascitis o perforación.',
            feedback: 'Buen enfoque, pero primero debes obtener imágenes para guiar la punción y reducir riesgos.',
            correct: false,
          },
          {
            label: 'Sonda nasogástrica',
            description: 'Introducción de sonda para descomprimir el estómago y evaluar contenido gástrico.',
            feedback: 'Puede ser útil en algunos casos, pero la prioridad inicial es confirmar la causa con diagnóstico por imagen.',
            correct: false,
          },
        ],
      },
    },
  });

  console.log('Seed completado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
