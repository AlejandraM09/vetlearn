// src/lib/auth.ts
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        username: { label: 'Usuario', type: 'text' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const { username, password } = parsed.data

        const user = await prisma.user.findUnique({
          where: { username },
        })

        if (!user) return null

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email ?? '',
          username: user.username,
          role: user.role,
          xp: user.xp,
          level: user.level,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id       = user.id
        token.username = (user as any).username
        token.role     = (user as any).role
        token.xp       = (user as any).xp
        token.level    = (user as any).level
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id       = token.id as string
        session.user.username = token.username as string
        session.user.role     = token.role as string
        session.user.xp       = token.xp as number
        session.user.level    = token.level as number
      }
      return session
    },
  },
})
