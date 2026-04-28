export const featuredTopics = ['Protocolos de anestesia', 'Técnicas de sutura', 'Test de radiología', 'Parámetros vitales'];

export const quickModules = [
  {
    slug: 'agujas',
    category: 'Agujas',
    title: 'Tipos de agujas y calibres',
    description: 'Clasificación, usos y selección del calibre adecuado.',
    href: '/modules/agujas',
  },
  {
    slug: 'sondas',
    category: 'Sondas',
    title: 'Sondas veterinarias',
    description: 'Características y aplicaciones para pequeños y grandes animales.',
    href: '/modules/sondas',
  },
];

export const recommendedModules = [
  {
    slug: 'agujas',
    category: 'Agujas',
    title: 'Tipos de agujas y calibres',
    description: 'Aprende a elegir la aguja correcta según el procedimiento.',
    lessons: 8,
    highlight: 'Material reciclable',
  },
  {
    slug: 'sondas',
    category: 'Sondas',
    title: 'Sondas periodontales y de drenaje',
    description: 'Guía básica de sondas para evaluación oral y cuidado postoperatorio.',
    lessons: 6,
    highlight: 'Fácil de memorizar',
  },
  {
    slug: 'instrumental',
    category: 'Instrumental',
    title: 'Instrumental básico',
    description: 'Conoce pinzas, tijeras y portagujas esenciales.',
    lessons: 10,
    highlight: 'Paso a paso',
  },
];

export const moduleDetails = {
  agujas: {
    overview: 'Este módulo te enseña a identificar tipos de agujas, calibres y sus aplicaciones en anestesia local y veterinaria general.',
    cards: [
      { title: 'Calibres comunes', description: '20G a 27G para pequeños animales y 18G a 20G para grandes animales.' },
      { title: 'Uso clínico', description: 'Las agujas de menor calibre son menos traumáticas; las más gruesas son mejores para soluciones viscosas.' },
    ],
  },
  sondas: {
    overview: 'Aprende la anatomía de sondas y su empleo en procedimientos dentales, nasales y de drenaje en animales.',
    cards: [
      { title: 'Sondas periodontales', description: 'Utilizadas para medir profundidad de bolsas y evaluar salud dental.' },
      { title: 'Sondas de drenaje', description: 'Se emplean para controlar fluidos en heridas y abscesos.' },
    ],
  },
  instrumental: {
    overview: 'Revisa las herramientas básicas de cirugía y su uso seguro en procedimientos veterinarios.',
    cards: [
      { title: 'Pinzas hemostáticas', description: 'Claves para controlar sangrado y manipular tejidos con precisión.' },
      { title: 'Portagujas', description: 'Permiten un paso firme en suturas y cierre de tejidos.' },
    ],
  },
};

export const speciesList = [
  { slug: 'perro', name: 'Perro', subtitle: 'Canis familiaris', image: '/images/dog.png' },
  { slug: 'gato', name: 'Gato', subtitle: 'Felis catus', image: '/images/cat.png' },
  { slug: 'vaca', name: 'Vaca', subtitle: 'Bos taurus', image: '/images/cow.png' },
  { slug: 'cerdo', name: 'Cerdo', subtitle: 'Sus scrofa', image: '/images/pig.png' },
  { slug: 'pollo', name: 'Pollo', subtitle: 'Gallus gallus', image: '/images/chicken.png' },
  { slug: 'caballo', name: 'Caballo', subtitle: 'Equus ferus caballus', image: '/images/horse.png' },
];

export const speciesDetails = {
  perro: {
    temperature: '38.3 - 39.2°C',
    heartRate: '70 - 120 lpm',
    respiratoryRate: '18 - 34 rpm',
    weightRange: '5 - 45 kg',
    capillaryRefill: '≤ 2 segundos',
  },
  gato: {
    temperature: '38.0 - 39.0°C',
    heartRate: '150 - 200 lpm',
    respiratoryRate: '20 - 30 rpm',
    weightRange: '3 - 7 kg',
    capillaryRefill: '≤ 2 segundos',
  },
  vaca: {
    temperature: '38.0 - 39.0°C',
    heartRate: '48 - 84 lpm',
    respiratoryRate: '10 - 30 rpm',
    weightRange: '450 - 800 kg',
    capillaryRefill: '≤ 3 segundos',
  },
  cerdo: {
    temperature: '38.7 - 39.8°C',
    heartRate: '60 - 100 lpm',
    respiratoryRate: '8 - 18 rpm',
    weightRange: '30 - 250 kg',
    capillaryRefill: '≤ 2 segundos',
  },
  pollo: {
    temperature: '40.0 - 42.0°C',
    heartRate: '250 - 300 lpm',
    respiratoryRate: '15 - 30 rpm',
    weightRange: '1.5 - 4 kg',
    capillaryRefill: '≤ 2 segundos',
  },
  caballo: {
    temperature: '37.5 - 38.5°C',
    heartRate: '28 - 44 lpm',
    respiratoryRate: '8 - 16 rpm',
    weightRange: '350 - 600 kg',
    capillaryRefill: '≤ 2 segundos',
  },
};

export const caseStudies = [
  {
    slug: 'cooper-abdomen',
    title: 'Golden Retriever con abdomen distendido',
    category: 'Urgencias',
    summary: 'Paciente de 7 años con distensión abdominal, arcadas y taquipnea.',
    scenario: 'Cooper llega con dolor abdominal, mucosas pálidas y dificultad para respirar. Elige el examen y el instrumento correcto para orientar tu diagnóstico.',
    decisions: [
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
  {
    slug: 'luna-gato',
    title: 'Gata con vómitos y letargo',
    category: 'Clínica',
    summary: 'Luna, una gata adulta, presenta vómitos intermitentes y disminución del apetito.',
    scenario: 'Observa los signos y elige el mejor examen inicial para determinar si se trata de un problema gastrointestinal o metabólico.',
    decisions: [
      {
        label: 'Panel de sangre completo',
        description: 'Evalúa electrolitos, función hepática y renal para identificar alteraciones sistémicas.',
        feedback: 'Excelente. El panel sanguíneo es clave para descartar causas metabólicas y cuidar de la estabilidad del paciente.',
        correct: true,
      },
      {
        label: 'Sutura de emergencia',
        description: 'Realiza una sutura para tratar una posible herida interna.',
        feedback: 'La sutura no es apropiada sin un diagnóstico definitivo. Primero se requieren exámenes clínicos.',
        correct: false,
      },
      {
        label: 'Aceite mineral',
        description: 'Administrar aceite para ayudar a la digestión.',
        feedback: 'No es recomendable sin confirmar la causa, ya que podría empeorar ciertas obstrucciones.',
        correct: false,
      },
    ],
  },
];
