import { createContext, useContext, useMemo, type ReactNode } from 'react'
import type { QuizAttempt } from '../types'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface ProgressContextValue {
  attempts: QuizAttempt[]
  addAttempt: (attempt: QuizAttempt) => void
  clearHistory: () => void
  bookmarks: string[]
  toggleBookmark: (questionId: string) => void
  isBookmarked: (questionId: string) => boolean
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [attempts, setAttempts] = useLocalStorage<QuizAttempt[]>('ccp-attempts', [])
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>('ccp-bookmarks', [])

  const value = useMemo<ProgressContextValue>(
    () => ({
      attempts,
      addAttempt: (attempt) => setAttempts((prev) => [attempt, ...prev].slice(0, 50)),
      clearHistory: () => setAttempts([]),
      bookmarks,
      toggleBookmark: (questionId) =>
        setBookmarks((prev) =>
          prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId],
        ),
      isBookmarked: (questionId) => bookmarks.includes(questionId),
    }),
    [attempts, bookmarks, setAttempts, setBookmarks],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

// eslint-disable-next-line react/only-export-components
export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
