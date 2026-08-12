export type CertId = 'ccar-p' | 'ccar-f' | 'ccdv-f'

export interface DomainWeight {
  name: string
  weight: number
}

export interface Certification {
  id: CertId
  code: string
  name: string
  short: string
  level: 'Foundations' | 'Professional'
  price: number
  questions: number
  minutes: number
  passScore: number
  passScale: number
  domains: DomainWeight[]
  summary: string
  whoFor: string
  examFormat: string[]
  blurb: string
  accent: 'clay' | 'moss'
}

export type QuestionType = 'single' | 'multiple'

export interface Question {
  id: string
  cert: CertId
  domain: string
  scenario?: string
  prompt: string
  options: string[]
  correct: number[]
  explanation: string
  tip?: string
}

export interface Resource {
  id: string
  title: string
  url: string
  cert: CertId | 'general'
  category: string
  description: string
  tags: string[]
  official?: boolean
}

export type TipCategory = 'Study' | 'Exam Day' | 'Strategy' | 'Gotchas'

export interface Tip {
  id: string
  cert: CertId | 'general'
  category: TipCategory
  title: string
  body: string
}

export interface DomainResult {
  correct: number
  total: number
}

export interface QuizAttempt {
  id: string
  cert: CertId
  date: string
  total: number
  correct: number
  timeSeconds: number
  byDomain: Record<string, DomainResult>
}
