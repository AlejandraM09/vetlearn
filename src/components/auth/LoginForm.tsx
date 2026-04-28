'use client'
// src/components/auth/LoginForm.tsx
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ username: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await signIn('credentials', {
      username: form.username,
      password: form.password,
      redirect: false,
    })

    setLoading(false)

    if (res?.error) {
      toast.error('Usuario o contraseña incorrectos')
    } else {
      toast.success('¡Bienvenido!')
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">Usuario</label>
        <input
          type="text"
          className="input-field"
          placeholder="amontoya"
          value={form.username}
          onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
          required
          autoComplete="username"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">Contraseña</label>
        <div className="relative">
          <input
            type={showPass ? 'text' : 'password'}
            className="input-field pr-10"
            placeholder="••••••••"
            value={form.password}
            onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
            required
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <button type="submit" className="btn-primary w-full justify-center mt-2" disabled={loading}>
        {loading ? <Loader2 size={16} className="animate-spin" /> : null}
        {loading ? 'Ingresando...' : 'Iniciar sesión'}
      </button>
    </form>
  )
}
