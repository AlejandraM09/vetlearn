// src/app/api/asistente/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

const SYSTEM_PROMPT = `Eres VetBot, un tutor educativo de medicina veterinaria para estudiantes principiantes.
Tu rol es explicar conceptos básicos de veterinaria de forma clara, amigable y pedagógica en español.

Temas que dominas:
- Parámetros fisiológicos por especie (temperatura, FC, FR, TLC)
- Instrumental quirúrgico veterinario básico
- Tipos de agujas (calibres, usos, vías de administración)
- Tipos de sondas (nasogástrica, urinaria, etc.)
- Procedimientos básicos: venopunción, cateterismo, vendajes
- Anatomía básica de animales domésticos

Estilo de respuesta:
- Usa lenguaje claro y pedagógico, sin tecnicismos innecesarios
- Cuando menciones valores numéricos, dales contexto clínico
- Incluye tips prácticos cuando sea útil
- Sé conciso: respuestas de 2-4 párrafos como máximo
- Si el estudiante hace una pregunta fuera de tu área, redirigelo amablemente`

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { messages } = await req.json()

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY ?? '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 600,
        system: SYSTEM_PROMPT,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    })

    const data = await res.json()
    const reply = data.content?.[0]?.text ?? 'No pude generar una respuesta. Intenta de nuevo.'

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('VetBot error:', error)
    return NextResponse.json({ reply: 'Tuve un error técnico. Por favor, intenta de nuevo en un momento.' })
  }
}
