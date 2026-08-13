import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getCertification } from '../data/certs'
import { getQuestionsByCert } from '../data/questions'
import type { Question } from '../types'
import { useProgress } from '../context/ProgressContext'
import { SectionHeading, CertChip, DomainWeightBar } from '../components/ui'
import { accentStyles } from '../lib/accent'

type Phase = 'intro' | 'running' | 'results'

function shuffle<T>(list: T[]): T[] {
  const arr = [...list]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function prepareQuestion(q: Question): Question {
  const order = shuffle(q.options.map((_, i) => i))
  return {
    ...q,
    options: order.map((i) => q.options[i]),
    correct: order
      .map((origIdx, newIdx) => (q.correct.includes(origIdx) ? newIdx : -1))
      .filter((idx) => idx >= 0)
      .sort((a, b) => a - b),
  }
}

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
  const s = Math.round(totalSeconds % 60)
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

function isCorrectSet(question: Question, selected: number[] | undefined): boolean {
  if (!selected || selected.length === 0) return false
  const a = [...question.correct].sort().join(',')
  const b = [...selected].sort().join(',')
  return a === b
}

export function MockExam() {
  const { certId } = useParams<{ certId: string }>()
  const cert = getCertification(certId)

  const [phase, setPhase] = useState<Phase>('intro')
  const [questions, setQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number[]>>({})
  const [revealed, setRevealed] = useState<string[]>([])
  const [elapsed, setElapsed] = useState(0)
  const [submitAlert, setSubmitAlert] = useState<{ required: number; selected: number } | null>(null)
  const startRef = useRef(0)
  const finishedRef = useRef(false)

  const { addAttempt } = useProgress()

  useEffect(() => {
    if (phase !== 'running') return
    const timer = window.setInterval(() => setElapsed(Math.floor((Date.now() - startRef.current) / 1000)), 1000)
    return () => window.clearInterval(timer)
  }, [phase])

  const currentQuestion = questions[current]

  const results = useMemo(() => {
    if (questions.length === 0) return null
    const correct = questions.filter((q) => isCorrectSet(q, answers[q.id])).length
    const byDomain: Record<string, { correct: number; total: number }> = {}
    for (const q of questions) {
      byDomain[q.domain] ??= { correct: 0, total: 0 }
      byDomain[q.domain].total += 1
      if (isCorrectSet(q, answers[q.id])) byDomain[q.domain].correct += 1
    }
    return { correct, total: questions.length, byDomain }
  }, [questions, answers])

  // keyboard shortcuts
  useEffect(() => {
    if (phase !== 'running' || !currentQuestion) return
    const onKey = (e: KeyboardEvent) => {
      const isTyping = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement
      if (isTyping) return
      if (e.key >= '1' && e.key <= '9') {
        const idx = Number(e.key) - 1
        if (idx < currentQuestion.options.length) toggleOption(idx)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const revealedNow = revealed.includes(currentQuestion.id)
        if (!revealedNow) {
          submit()
        } else {
          goNext()
        }
      } else if (e.key === 'Escape') {
        setSubmitAlert(null)
      } else if (e.key === 'n' || e.key === 'N') {
        if (revealed.includes(currentQuestion.id)) goNext()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!cert || !certId) return <Navigate to="/mock-exams" replace />

  const start = (shuffleOrder: boolean) => {
    const base = getQuestionsByCert(cert.id).map(prepareQuestion)
    setQuestions(shuffleOrder ? shuffle(base) : base)
    setAnswers({})
    setRevealed([])
    setCurrent(0)
    setElapsed(0)
    finishedRef.current = false
    startRef.current = Date.now()
    setPhase('running')
  }

  const toggleOption = (idx: number) => {
    if (!currentQuestion) return
    const multi = currentQuestion.correct.length > 1
    setAnswers((prev) => {
      const selected = prev[currentQuestion.id] ?? []
      if (multi) {
        const next = selected.includes(idx) ? selected.filter((i) => i !== idx) : [...selected, idx]
        return { ...prev, [currentQuestion.id]: next.sort((a, b) => a - b) }
      }
      return { ...prev, [currentQuestion.id]: [idx] }
    })
  }

  const submit = () => {
    if (!currentQuestion) return
    const selected = answers[currentQuestion.id] ?? []
    const required = currentQuestion.correct.length
    if (selected.length === 0) {
      setSubmitAlert({ required, selected: 0 })
      return
    }
    if (required > 1 && selected.length !== required) {
      setSubmitAlert({ required, selected: selected.length })
      return
    }
    if (!revealed.includes(currentQuestion.id)) {
      setRevealed((r) => [...r, currentQuestion.id])
    }
  }

  const goNext = () => {
    if (!currentQuestion) return
    const isLast = current === questions.length - 1
    if (isLast) {
      finish()
    } else {
      setCurrent((c) => c + 1)
    }
  }

  const finish = () => {
    if (!results || finishedRef.current) return
    finishedRef.current = true
    setElapsed(Math.floor((Date.now() - startRef.current) / 1000))
    addAttempt({
      id: `${Date.now()}`,
      cert: cert.id,
      date: new Date().toISOString(),
      total: results.total,
      correct: results.correct,
      timeSeconds: Math.floor((Date.now() - startRef.current) / 1000),
      byDomain: results.byDomain,
    })
    setPhase('results')
  }

  return (
    <div className="container-page py-10 sm:py-14">
      {phase === 'intro' && (
        <Intro
          cert={cert}
          questionCount={getQuestionsByCert(cert.id).length}
          onStart={start}
        />
      )}

      {phase === 'running' && currentQuestion && (
        <QuestionPanel
          cert={cert}
          question={currentQuestion}
          index={current}
          total={questions.length}
          elapsed={elapsed}
          selected={answers[currentQuestion.id] ?? []}
          revealed={revealed.includes(currentQuestion.id)}
          score={questions.filter((q, i) => i < current && isCorrectSet(q, answers[q.id])).length}
          answeredCount={revealed.length}
          onToggleOption={toggleOption}
          onSubmit={submit}
          onNext={goNext}
        />
      )}

      {phase === 'results' && results && (
        <Results
          cert={cert}
          correct={results.correct}
          total={results.total}
          byDomain={results.byDomain}
          elapsed={elapsed}
          questions={questions}
          answers={answers}
          onRetry={() => start(true)}
          onBackToAll={() => setPhase('intro')}
        />
      )}

      {submitAlert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/60 p-4"
          onClick={() => setSubmitAlert(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={submitAlert.selected === 0 ? 'Select an answer first' : 'Selection incomplete'}
            className="card w-full max-w-sm animate-pop-in p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-clay-100 text-clay-600 dark:bg-clay-900/40 dark:text-clay-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" />
              </svg>
            </span>
            <h3 className="mt-4 font-serif text-lg font-bold text-ink-900 dark:text-cream-50">
              {submitAlert.selected === 0 ? 'Select an answer first' : 'Selection incomplete'}
            </h3>
            {submitAlert.selected === 0 ? (
              submitAlert.required > 1 ? (
                <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  This question asks you to select {submitAlert.required} answers. Pick them before submitting.
                </p>
              ) : (
                <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  Pick at least one option before submitting this question.
                </p>
              )
            ) : (
              <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                This question asks you to select exactly {submitAlert.required} answers — you&apos;ve selected{' '}
                {submitAlert.selected}. Submit anyway?
              </p>
            )}
            {submitAlert.selected === 0 ? (
              <button onClick={() => setSubmitAlert(null)} className="btn-primary mt-5 w-full">
                Got it
              </button>
            ) : (
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <button onClick={() => setSubmitAlert(null)} className="btn-ghost flex-1">
                  Keep answering
                </button>
                <button
                  onClick={() => {
                    if (currentQuestion && !revealed.includes(currentQuestion.id)) {
                      setRevealed((r) => [...r, currentQuestion.id])
                    }
                    setSubmitAlert(null)
                  }}
                  className="btn-accent flex-1"
                >
                  Submit anyway
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Intro({
  cert,
  questionCount,
  onStart,
}: {
  cert: ReturnType<typeof getCertification>
  questionCount: number
  onStart: (shuffle: boolean) => void
}) {
  const [shuffleOrder, setShuffleOrder] = useState(true)
  if (!cert) return null
  const accent = accentStyles[cert.accent]

  return (
    <div className="animate-fade-up">
      <Link
        to="/mock-exams"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900 dark:text-ink-300 dark:hover:text-cream-50"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m6-6-6 6 6 6" />
        </svg>
        All mocks
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <SectionHeading
            eyebrow={`${cert.code} · ${cert.level}`}
            title={cert.name}
            subtitle={cert.summary}
          />
          <p className="mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{cert.blurb}</p>

          <div className="mt-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-ink-400">Exam shape</h3>
            <ul className="mt-3 space-y-2">
              {cert.examFormat.map((line) => (
                <li key={line} className="flex gap-2.5 text-sm text-ink-600 dark:text-ink-300">
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accent.solid}`} />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button onClick={() => onStart(shuffleOrder)} className={`btn ${accent.solid} ${accent.hover} text-white`}>
              Start the {questionCount}-question mock
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </button>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-600 dark:text-ink-300">
              <input
                type="checkbox"
                checked={shuffleOrder}
                onChange={(e) => setShuffleOrder(e.target.checked)}
                className="h-4 w-4 accent-clay-500"
              />
              Shuffle question order
            </label>
          </div>
          <p className="mt-4 text-xs text-ink-400 dark:text-ink-400">
            This is a shortened sample covering every domain — the real {cert.code} exam has {cert.questions}{' '}
            items in {cert.minutes} minutes.
          </p>
        </div>

        <div className="card p-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-ink-400">Domain weights</h3>
          <div className="mt-4">
            <DomainWeightBar domains={cert.domains} accent={cert.accent} />
          </div>
          <p className="mt-5 border-t border-ink-100 pt-4 text-xs leading-relaxed text-ink-500 dark:border-ink-800 dark:text-ink-300">
            Weighting follows the published exam guide (v1.0). Spend your study time proportionally.
          </p>
        </div>
      </div>
    </div>
  )
}

function QuestionPanel({
  cert,
  question,
  index,
  total,
  elapsed,
  selected,
  revealed,
  score,
  answeredCount,
  onToggleOption,
  onSubmit,
  onNext,
}: {
  cert: ReturnType<typeof getCertification>
  question: Question
  index: number
  total: number
  elapsed: number
  selected: number[]
  revealed: boolean
  score: number
  answeredCount: number
  onToggleOption: (idx: number) => void
  onSubmit: () => void
  onNext: () => void
}) {
  const { toggleBookmark, isBookmarked } = useProgress()
  if (!cert) return null
  const bookmarked = isBookmarked(question.id)
  const multi = question.correct.length > 1
  const isCorrect = isCorrectSet(question, selected)
  const isLast = index === total - 1
  const pct = Math.round((answeredCount / total) * 100)

  const optionClass = (idx: number): string => {
    const base =
      'flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors'
    if (!revealed) {
      return selected.includes(idx)
        ? `${base} border-clay-400 bg-clay-50 ring-1 ring-clay-400 dark:border-clay-500 dark:bg-clay-900/30`
        : `${base} border-ink-200 bg-white hover:border-clay-300 hover:bg-cream-50 dark:border-ink-700 dark:bg-ink-900 dark:hover:bg-ink-800`
    }
    const isCorrectOption = question.correct.includes(idx)
    if (isCorrectOption) {
      return `${base} border-emerald-400 bg-emerald-50 text-emerald-800 dark:border-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-200`
    }
    if (selected.includes(idx)) {
      return `${base} border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-700 dark:bg-rose-900/30 dark:text-rose-200`
    }
    return `${base} border-ink-200 opacity-55 dark:border-ink-700`
  }

  return (
    <div key={question.id} className="mx-auto max-w-3xl animate-pop-in">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Link
          to="/mock-exams"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900 dark:text-ink-300 dark:hover:text-cream-50"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m6-6-6 6 6 6" />
          </svg>
          Exit mock
        </Link>
        <div className="flex items-center gap-2">
          <span className="chip bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-200">
            {formatTime(elapsed)}
          </span>
          <button
            onClick={() => toggleBookmark(question.id)}
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark question'}
            className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
              bookmarked
                ? 'border-amber-300 bg-amber-50 text-amber-500 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                : 'border-ink-200 bg-white text-ink-400 hover:text-amber-500 dark:border-ink-700 dark:bg-ink-900'
            }`}
          >
            <svg viewBox="0 0 24 24" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.5 6.5 20l1.2-6.2L3.4 9.6l6.3-.7L12 3l2.3 5.9 6.3.7-4.3 4.2 1.2 6.2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between text-xs text-ink-500 dark:text-ink-300">
          <span>
            Question {index + 1} of {total}
          </span>
          <span>
            Answered {answeredCount} · {score} correct so far
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800">
          <div
            className="h-full rounded-full bg-clay-500 transition-all duration-300"
            style={{ width: `${Math.max(pct, index > 0 ? 2 : 0)}%` }}
          />
        </div>
      </div>

      <div className="card p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <CertChip cert={cert} size="sm" />
          <span className="chip bg-cream-200 text-ink-600 dark:bg-ink-800 dark:text-ink-200">{question.domain}</span>
          {multi && (
            <span className="chip bg-clay-100 text-clay-700 dark:bg-clay-900/40 dark:text-clay-300">
              Select all that apply
            </span>
          )}
        </div>

        {question.scenario && (
          <div className="mt-4 rounded-xl border border-ink-100 bg-cream-50 p-4 text-sm italic leading-relaxed text-ink-600 dark:border-ink-800 dark:bg-ink-950 dark:text-ink-300">
            {question.scenario}
          </div>
        )}

        <h2 className="mt-4 font-serif text-xl font-bold leading-snug text-ink-900 sm:text-2xl dark:text-cream-50">
          {question.prompt}
        </h2>

        <div className="mt-6 space-y-2.5">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => !revealed && onToggleOption(idx)}
              disabled={revealed}
              className={optionClass(idx)}
            >
              <span className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-current/30 text-xs font-bold">
                  {LETTERS[idx]}
                </span>
                <span className="leading-relaxed">{opt}</span>
              </span>
              {revealed && (
                <span className="shrink-0">
                  {question.correct.includes(idx) ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-5 w-5 text-emerald-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4 10-10" />
                    </svg>
                  ) : selected.includes(idx) ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-5 w-5 text-rose-400">
                      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  ) : null}
                </span>
              )}
            </button>
          ))}
        </div>

        {!revealed && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button onClick={onSubmit} className="btn-primary">
              Submit answer
            </button>
            <p className="text-xs text-ink-400">
              Tip: press <kbd className="rounded bg-ink-100 px-1.5 py-0.5 font-mono dark:bg-ink-800">1</kbd>–
              <kbd className="rounded bg-ink-100 px-1.5 py-0.5 font-mono dark:bg-ink-800">5</kbd> to select,
              <kbd className="rounded bg-ink-100 px-1.5 py-0.5 font-mono dark:bg-ink-800">Enter</kbd> to submit.
            </p>
          </div>
        )}

        {revealed && (
          <div className="mt-6 animate-fade-up">
            <div
              className={`rounded-xl border p-4 ${
                isCorrect
                  ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-900/20'
                  : 'border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-900/20'
              }`}
            >
              <p className={`text-sm font-bold ${isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>
                {isCorrect ? 'Correct' : 'Incorrect'}
                {!isCorrect && (
                  <span className="ml-2 font-medium text-rose-600 dark:text-rose-300">
                    Correct answer: {question.correct.map((c) => LETTERS[c]).join(', ')}
                  </span>
                )}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{question.explanation}</p>
              {question.tip && (
                <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  <span className="font-semibold text-clay-600 dark:text-clay-300">Tip: </span>
                  {question.tip}
                </p>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button onClick={onNext} className="btn-accent">
                {isLast ? 'Finish exam' : 'Next question'}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </button>
              <span className="text-xs text-ink-400">Press Enter or N for next</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Results({
  cert,
  correct,
  total,
  byDomain,
  elapsed,
  questions,
  answers,
  onRetry,
  onBackToAll,
}: {
  cert: ReturnType<typeof getCertification>
  correct: number
  total: number
  byDomain: Record<string, { correct: number; total: number }>
  elapsed: number
  questions: Question[]
  answers: Record<string, number[]>
  onRetry: () => void
  onBackToAll: () => void
}) {
  const [showReview, setShowReview] = useState(false)
  if (!cert) return null
  const accent = accentStyles[cert.accent]
  const pct = Math.round((correct / total) * 100)

  const verdict =
    pct >= 90
      ? { label: 'Exam-ready', note: "You're answering at a passing standard. Keep this momentum." }
      : pct >= 70
        ? { label: 'Solid foundation', note: 'Strong, but tighten the weak domains below before sitting the real thing.' }
        : pct >= 50
          ? { label: 'Getting there', note: 'Revisit the blueprint and the Academy courses for the domains that hurt you.' }
          : { label: 'Early days', note: 'Start with the exam guide, take the free Academy courses, then retry.' }

  const weakDomains = cert.domains
    .filter((d) => {
      const r = byDomain[d.name]
      return r && r.total > 0 && r.correct / r.total < 0.6
    })
    .map((d) => d.name)

  return (
    <div className="mx-auto max-w-3xl animate-fade-up">
      <div className="card p-8 text-center">
        <span
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${accent.soft} ${accent.text}`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8">
            {pct >= 70 ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4 10-10" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v5m0 3h.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" />
            )}
          </svg>
        </span>
        <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-ink-900 dark:text-cream-50">
          {verdict.label}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          {verdict.note}
        </p>

        <div className="mt-8 flex items-center justify-center gap-8">
          <div>
            <p className={`font-serif text-5xl font-bold ${accent.text}`}>{pct}%</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-ink-400">Score</p>
          </div>
          <div className="h-14 w-px bg-ink-100 dark:bg-ink-700" />
          <div>
            <p className="font-serif text-5xl font-bold text-ink-900 dark:text-cream-50">
              {correct}
              <span className="text-2xl text-ink-400">/{total}</span>
            </p>
            <p className="mt-1 text-xs uppercase tracking-widest text-ink-400">Correct</p>
          </div>
          <div className="h-14 w-px bg-ink-100 dark:bg-ink-700" />
          <div>
            <p className="font-serif text-5xl font-bold text-ink-900 dark:text-cream-50">{formatTime(elapsed)}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-ink-400">Time</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={onRetry} className="btn-accent">
            Retry mock
          </button>
          <button onClick={onBackToAll} className="btn-ghost">
            Back to all mocks
          </button>
        </div>
        <p className="mt-4 text-xs text-ink-400">
          Result saved to your local history. Use{' '}
          <Link to="/tips" className="text-clay-600 underline-offset-2 hover:underline dark:text-clay-300">
            tips & strategy
          </Link>{' '}
          to close the gaps.
        </p>
      </div>

      <div className="card mt-6 p-6 sm:p-8">
        <h3 className="font-serif text-xl font-bold text-ink-900 dark:text-cream-50">Domain breakdown</h3>
        <div className="mt-5 space-y-4">
          {cert.domains
            .filter((d) => byDomain[d.name] && byDomain[d.name].total > 0)
            .map((d) => {
              const r = byDomain[d.name]
              const domainPct = Math.round((r.correct / r.total) * 100)
              return (
                <div key={d.name}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-ink-700 dark:text-ink-200">{d.name}</span>
                    <span className={domainPct >= 60 ? 'text-ink-500 dark:text-ink-300' : 'font-semibold text-rose-500'}>
                      {r.correct}/{r.total}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800">
                    <div
                      className={`h-full rounded-full ${domainPct >= 60 ? accent.solid : 'bg-rose-400'}`}
                      style={{ width: `${Math.max(domainPct, 3)}%` }}
                    />
                  </div>
                </div>
              )
            })}
        </div>
        {weakDomains.length > 0 && (
          <p className="mt-5 border-t border-ink-100 pt-4 text-sm text-ink-600 dark:border-ink-800 dark:text-ink-300">
            <span className="font-semibold text-rose-500">Focus next:</span> {weakDomains.join(' · ')}
          </p>
        )}
      </div>

      <div className="card mt-6 overflow-hidden">
        <button
          onClick={() => setShowReview((s) => !s)}
          className="flex w-full items-center justify-between px-6 py-4 text-left"
        >
          <span className="font-serif text-xl font-bold text-ink-900 dark:text-cream-50">Review answers</span>
          <span className={`text-ink-400 transition-transform ${showReview ? 'rotate-180' : ''}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </button>
        {showReview && (
          <div className="border-t border-ink-100 px-6 py-5 dark:border-ink-800">
            <ol className="space-y-6">
              {questions.map((q, i) => {
                const ok = isCorrectSet(q, answers[q.id])
                return (
                  <li key={q.id} className="text-sm leading-relaxed">
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          ok
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300'
                        }`}
                      >
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="font-medium text-ink-800 dark:text-ink-100">
                          {ok ? 'Correct' : 'Incorrect'} — {q.prompt}
                        </p>
                        <p className="mt-1 text-xs text-ink-500 dark:text-ink-300">
                          <span className="font-semibold text-clay-600 dark:text-clay-300">You chose: </span>
                          {(answers[q.id] ?? []).length > 0
                            ? (answers[q.id] ?? []).map((c) => LETTERS[c]).join(', ')
                            : '—'}
                          <span className="mx-2">·</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-300">Answer: </span>
                          {q.correct.map((c) => LETTERS[c]).join(', ')}
                        </p>
                        <p className="mt-1.5 text-xs text-ink-600 dark:text-ink-300">{q.explanation}</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}
