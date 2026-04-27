// src/types/index.ts
import type { Role } from '@prisma/client'

export interface UserSession {
  id: string
  name: string
  email: string
  username: string
  role: Role
  xp: number
  level: number
}

export interface SpeciesWithParams {
  id: string
  slug: string
  name: string
  latinName: string
  emoji: string
  imageUrl?: string | null
  parameters: SpeciesParameter[]
  _count?: { favorites: number }
  isFavorite?: boolean
}

export interface SpeciesParameter {
  id: string
  label: string
  value: string
  unit: string
  rangeMin: number
  rangeMax: number
  order: number
}

export interface ModuleWithCards {
  id: string
  slug: string
  title: string
  description: string
  icon: string
  color: string
  order: number
  published: boolean
  cards: ModuleCard[]
  progress?: ModuleProgress | null
}

export interface ModuleCard {
  id: string
  title: string
  content: string
  imageUrl?: string | null
  tips: string[]
  order: number
}

export interface ModuleProgress {
  completed: boolean
  percentage: number
}

export interface QuizQuestion {
  id: string
  text: string
  options: string[]
  correctIndex: number
  explanation: string
  order: number
}

export interface QuizWithQuestions {
  id: string
  title: string
  description?: string | null
  questions: QuizQuestion[]
}

export interface Badge {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  xpReward: number
  earned?: boolean
  earnedAt?: Date
}

export type ParamStatus = 'normal' | 'alto' | 'bajo' | 'nd'

declare module 'next-auth' {
  interface User {
    username: string
    role: string
    xp: number
    level: number
  }
  interface Session {
    user: UserSession
  }
}
