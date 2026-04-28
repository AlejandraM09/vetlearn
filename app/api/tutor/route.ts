import { NextResponse } from 'next/server';

const knowledge = {
  agujas: 'Para elegir una aguja, revisa el calibre y longitud según la especie y tipo de inyección. Las agujas más finas son mejores para inyección subcutánea en pequeños animales.',
  sondas: 'Las sondas periodontales se usan para medición de bolsas gingivales, mientras que las sondas de drenaje se utilizan para irrigación o extracción de líquidos.',
  fisiologia: 'Los parámetros vitales varían según la especie. Revisa siempre la temperatura, frecuencia cardíaca y respiratoria para detectar señales de estrés o shock.',
  casos: 'Considera signos clínicos, historia rápida y objetivos de intervención. En urgencias, una evaluación rápida puede orientar el protocolo de estabilización.',
};

function getAnswer(query: string) {
  const normalized = query.toLowerCase();

  for (const key of Object.keys(knowledge)) {
    if (normalized.includes(key)) {
      return knowledge[key as keyof typeof knowledge];
    }
  }

  return 'Es una excelente pregunta. Revisa el módulo correspondiente y, si quieres, amplía tu consulta con el nombre del tema o la especie para obtener una respuesta más precisa.';
}

export async function POST(request: Request) {
  const body = await request.json();
  const query = body?.query?.toString() ?? '';
  const answer = getAnswer(query);

  return NextResponse.json({ answer });
}
