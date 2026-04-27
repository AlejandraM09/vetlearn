// src/app/login/page.tsx
import LoginForm from '@/components/auth/LoginForm'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const metadata = { title: 'Iniciar sesión — VetLearn' }

export default async function LoginPage() {
  const session = await auth()
  if (session) redirect('/dashboard')

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-600 mb-4">
            <span className="text-white text-2xl font-display font-bold">V</span>
          </div>
          <h1 className="font-display text-2xl font-semibold text-gray-900">VetLearn</h1>
          <p className="text-sm text-gray-500 mt-1">Plataforma educativa veterinaria</p>
        </div>

        {/* Card */}
        <div className="card p-8">
          <h2 className="font-display text-xl font-semibold text-gray-900 mb-1">Bienvenido</h2>
          <p className="text-sm text-gray-500 mb-6">Ingresa con tus credenciales para continuar</p>
          <LoginForm />
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          VetLearn © {new Date().getFullYear()} · Plataforma educativa
        </p>
      </div>
    </main>
  )
}
