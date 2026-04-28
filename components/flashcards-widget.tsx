'use client';

import { useState } from 'react';

const flashcards = [
  {
    term: 'Aguja hipodérmica',
    definition: 'Instrumento para inyecciones subcutáneas e intramusculares, disponible en varios calibres.',
  },
  {
    term: 'Sonda periodontal',
    definition: 'Herramienta para medir la profundidad de bolsas gingivales en odontología veterinaria.',
  },
  {
    term: 'Tiempo de llenado capilar',
    definition: 'Indicador de perfusión periférica normal que debe ser ≤ 2 segundos en pequeños animales.',
  },
];

export function FlashcardsWidget() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = flashcards[index];

  return (
    <div className="rounded-3xl bg-white p-8 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-secondary">Flashcards</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">Revisión rápida</h2>
        </div>
        <div className="text-sm text-slate-500">{index + 1} / {flashcards.length}</div>
      </div>

      <div className="mt-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-slate-900 shadow-sm">
        <p className="text-lg font-semibold">{flipped ? card.definition : card.term}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setFlipped((value) => !value)}
          className="rounded-3xl bg-primary px-5 py-3 text-white transition hover:bg-[#125835]"
        >
          {flipped ? 'Ver término' : 'Ver definición'}
        </button>
        <button
          type="button"
          onClick={() => {
            setIndex((value) => (value + 1) % flashcards.length);
            setFlipped(false);
          }}
          className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-slate-700 transition hover:border-primary"
        >
          Siguiente tarjeta
        </button>
      </div>
    </div>
  );
}
