import { useMemo, useState } from 'react'
import { TIPS } from '../data/tips'
import { CERTIFICATIONS } from '../data/certs'
import type { CertId, TipCategory } from '../types'
import { SectionHeading } from '../components/ui'

type CertFilter = 'all' | CertId | 'general'

const CERT_FILTERS: { value: CertFilter; label: string }[] = [
  { value: 'all', label: 'All exams' },
  ...CERTIFICATIONS.map((c) => ({ value: c.id as CertId, label: c.code })),
  { value: 'general', label: 'General' },
]

const CATEGORY_FILTERS: ('All' | TipCategory)[] = ['All', 'Study', 'Strategy', 'Exam Day', 'Gotchas']

export function Tips() {
  const [cert, setCert] = useState<CertFilter>('all')
  const [category, setCategory] = useState<'All' | TipCategory>('All')

  const filtered = useMemo(
    () =>
      TIPS.filter((t) => {
        if (cert !== 'all' && t.cert !== cert) return false
        if (category !== 'All' && t.category !== category) return false
        return true
      }),
    [cert, category],
  )

  return (
    <div className="container-page py-14 sm:py-16">
      <SectionHeading
        eyebrow="From experience"
        title="Tips & strategy"
        subtitle="The tactics and traps that mattered most across all three exams — study approach, format gotchas, and exam-day execution."
      />

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {CERT_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setCert(f.value)}
              className={`chip border transition-colors ${
                cert === f.value
                  ? 'border-clay-500 bg-clay-500 text-white'
                  : 'border-ink-200 bg-white text-ink-600 hover:border-clay-300 hover:text-clay-600 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-ink-500 dark:text-ink-300">
          <span className="font-semibold text-ink-800 dark:text-cream-50">{filtered.length}</span> tips
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {CATEGORY_FILTERS.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              category === c
                ? 'bg-ink-900 text-cream-50 dark:bg-cream-50 dark:text-ink-900'
                : 'bg-ink-100 text-ink-600 hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:hover:bg-ink-700'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {filtered.map((tip, i) => {
          const certMeta = tip.cert === 'general' ? null : CERTIFICATIONS.find((c) => c.id === tip.cert)
          return (
            <article key={tip.id} className="card flex flex-col p-6" style={{ animationDelay: `${i * 20}ms` }}>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`chip ${
                    tip.category === 'Study'
                      ? 'bg-clay-100 text-clay-700 dark:bg-clay-900/40 dark:text-clay-300'
                      : tip.category === 'Exam Day'
                        ? 'bg-moss-400/10 text-moss-600 dark:text-moss-400'
                        : tip.category === 'Strategy'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300'
                  }`}
                >
                  {tip.category}
                </span>
                {tip.cert === 'general' ? (
                  <span className="chip bg-ink-100 text-ink-500 dark:bg-ink-800 dark:text-ink-300">
                    All exams
                  </span>
                ) : certMeta ? (
                  <span
                    className={`chip ${
                      certMeta.accent === 'clay'
                        ? 'bg-clay-100 text-clay-700 dark:bg-clay-900/40 dark:text-clay-300'
                        : 'bg-moss-400/10 text-moss-600 dark:text-moss-400'
                    }`}
                  >
                    {certMeta.code}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-3 font-serif text-lg font-bold leading-snug text-ink-900 dark:text-cream-50">
                {tip.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{tip.body}</p>
            </article>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="card mt-8 p-10 text-center">
          <p className="font-serif text-lg font-bold text-ink-800 dark:text-cream-50">No tips for these filters</p>
        </div>
      )}
    </div>
  )
}
