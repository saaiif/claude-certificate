import type { Question, CertId } from '../../types'
import { CCAR_P_QUESTIONS } from './ccar-p'
import { CCAR_F_QUESTIONS } from './ccar-f'
import { CCDV_F_QUESTIONS } from './ccdv-f'

export const ALL_QUESTIONS: Question[] = [
  ...CCAR_P_QUESTIONS,
  ...CCAR_F_QUESTIONS,
  ...CCDV_F_QUESTIONS,
]

export function getQuestionsByCert(cert: CertId): Question[] {
  switch (cert) {
    case 'ccar-p':
      return CCAR_P_QUESTIONS
    case 'ccar-f':
      return CCAR_F_QUESTIONS
    case 'ccdv-f':
      return CCDV_F_QUESTIONS
  }
}

export function getQuestion(id: string): Question | undefined {
  return ALL_QUESTIONS.find((q) => q.id === id)
}
