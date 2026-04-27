'use client'
// src/app/asistente/page.tsx — Client component for chat
import { useState, useRef, useEffect } from 'react'
import { Send, Bot, Loader2 } from 'lucide-react'

interface Message { role: 'user' | 'assistant'; content: string }

const SUGGESTIONS = [
  '¿Cuál es la temperatura normal del perro?',
  '¿Para qué sirve una aguja 21G?',
  '¿Cómo se coloca una sonda nasogástrica?',
  '¿Cuál es la frecuencia cardíaca normal del gato?',
]

export default function AsistentePage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '¡Hola! Soy VetBot, tu tutor de veterinaria. Puedo ayudarte con conceptos básicos, parámetros fisiológicos, instrumental quirúrgico y procedimientos. ¿En qué te ayudo hoy?' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text?: string) => {
    const msg = text ?? input.trim()
    if (!msg || loading) return
    setInput('')

    const newMessages: Message[] = [...messages, { role: 'user', content: msg }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/asistente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Lo siento, tuve un error al procesar tu pregunta. Intenta de nuevo.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 max-w-2xl h-[calc(100vh-9rem)] animate-slide-up">
      <div>
        <h1 className="font-display text-2xl font-semibold text-gray-900">Asistente VetBot</h1>
        <p className="text-gray-500 text-sm mt-1">Tutor inteligente de veterinaria — responde tus dudas al instante.</p>
      </div>

      {/* Chat window */}
      <div className="card flex flex-col flex-1 overflow-hidden">
        {/* Chat header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
          <div>
            <p className="font-display font-semibold text-sm text-gray-900">VetBot</p>
            <p className="text-xs text-teal-600">Tutor de veterinaria · En línea</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed
                  ${m.role === 'user'
                    ? 'bg-teal-600 text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
                <Loader2 size={14} className="animate-spin text-gray-400" />
                <span className="text-sm text-gray-500">Pensando...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div className="px-5 pb-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs bg-teal-50 text-teal-700 border border-teal-100 rounded-full px-3 py-1.5 hover:bg-teal-100 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-4 py-3 border-t border-gray-100 flex gap-2">
          <input
            className="input-field"
            placeholder="Escribe tu pregunta..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            disabled={loading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="btn-primary px-4 disabled:opacity-50"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
