'use client'
// src/components/species/SpeciesChecker.tsx
import { useState } from 'react'
import type { SpeciesParameter, ParamStatus } from '@/types'

function evalStatus(value: string, min: number, max: number): ParamStatus {
  const v = parseFloat(value)
  if (isNaN(v)) return 'nd'
  if (v >= min && v <= max) return 'normal'
  if (v < min) return 'bajo'
  return 'alto'
}

const STATUS_STYLES: Record<ParamStatus, string> = {
  normal: 'bg-green-50 text-green-700 border-green-200',
  alto:   'bg-red-50 text-red-700 border-red-200',
  bajo:   'bg-amber-50 text-amber-700 border-amber-200',
  nd:     'bg-gray-50 text-gray-400 border-gray-200',
}

const STATUS_LABELS: Record<ParamStatus, string> = {
  normal: 'Normal',
  alto:   'Elevado',
  bajo:   'Bajo',
  nd:     '—',
}

export default function SpeciesChecker({ parameters }: { parameters: SpeciesParameter[] }) {
  const [values, setValues] = useState<Record<string, string>>({})

  const handleChange = (id: string, val: string) => {
    setValues(prev => ({ ...prev, [id]: val }))
  }

  const hasValues = Object.values(values).some(v => v !== '')

  return (
    <div className="card p-6">
      <h2 className="font-display text-base font-semibold text-gray-900 mb-1">Verificar mis mediciones</h2>
      <p className="text-sm text-gray-500 mb-5">Ingresa los valores que mediste y te diremos si están dentro del rango normal.</p>

      <div className="flex flex-col divide-y divide-gray-100">
        {parameters.map(p => {
          const status = evalStatus(values[p.id] ?? '', p.rangeMin, p.rangeMax)
          return (
            <div key={p.id} className="flex items-center gap-3 py-3">
              <span className="flex-1 text-sm text-gray-700">{p.label} <span className="text-gray-400">({p.unit})</span></span>
              <input
                type="number"
                step="0.1"
                className="w-24 text-center rounded-lg border border-gray-200 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400 transition-all"
                placeholder="—"
                value={values[p.id] ?? ''}
                onChange={e => handleChange(p.id, e.target.value)}
              />
              <span className={`badge-tag border text-xs min-w-[72px] justify-center ${STATUS_STYLES[status]}`}>
                {STATUS_LABELS[status]}
              </span>
            </div>
          )
        })}
      </div>

      {hasValues && (
        <div className="mt-4 p-3 bg-teal-50 rounded-xl text-sm text-teal-700">
          <strong>Tip:</strong> Los valores marcados como "Elevado" o "Bajo" no siempre indican patología — considera el contexto clínico del paciente.
        </div>
      )}
    </div>
  )
}
