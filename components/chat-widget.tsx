'use client';

import { useMemo, useState } from 'react';

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    { role: 'assistant', text: 'Hola, soy tu tutor clínico. ¿En qué tema de veterinaria básica necesitas ayuda?' },
  ]);
  const [loading, setLoading] = useState(false);

  const lastMessage = useMemo(() => messages[messages.length - 1], [messages]);

  const handleSend = async () => {
    if (!query.trim()) return;

    const question = query.trim();
    setMessages((prev) => [...prev, { role: 'user', text: question }]);
    setQuery('');
    setLoading(true);

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: question }),
      });
      const data = await response.json();

      setMessages((prev) => [...prev, { role: 'assistant', text: data.answer }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Perdón, no pude responder ahora. Intenta nuevamente más tarde.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[320px] md:w-[360px]">
      <div className="rounded-3xl bg-white shadow-soft ring-1 ring-slate-200">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between rounded-3xl bg-primary px-5 py-4 text-white transition hover:bg-[#125835]"
        >
          <span>Asistente clínico</span>
          <span>{open ? '✕' : '💬'}</span>
        </button>
        {open && (
          <div className="space-y-4 p-4">
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`max-w-[90%] rounded-3xl px-4 py-3 text-sm ${message.role === 'assistant' ? 'bg-slate-100 text-slate-800 self-start' : 'bg-primary/10 text-slate-900 self-end'}`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Pregunta</label>
              <div className="flex items-center gap-2">
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Escribe tu duda..."
                  className="flex-1 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={loading}
                  className="rounded-3xl bg-primary px-4 py-3 text-white transition hover:bg-[#125835] disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {loading ? 'Escribiendo...' : 'Enviar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
