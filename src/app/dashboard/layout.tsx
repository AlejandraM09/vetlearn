// src/app/dashboard/layout.tsx
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={session.user} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  )
}
