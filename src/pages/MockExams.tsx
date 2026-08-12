import { Link } from 'react-router-dom'
import { CERTIFICATIONS } from '../data/certs'
import { useProgress } from '../context/ProgressContext'
import { SectionHeading, CertChip } from '../components/ui'
import { accentStyles } from '../lib/accent'

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60)
  return `${m}m ${s.toString().padStart(2, '0')}s`
}

export function MockExams() {
  const { attempts, clearHistory } = useProgress()

  return (
    <div className="container-page py-14 sm:py-16">
      <SectionHeading
        eyebrow="Practice"
        title="Mock exams"
        subtitle="Sample questions in the real exam's style — including the multiple-response format — with instant feedback and a domain-by-domain score breakdown. Full exam information is kept on the front end; nothing leaves your browser."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {CERTIFICATIONS.map((cert) => {
          const accent = accentStyles[cert.accent]
          return (
            <div key={cert.id} className="card flex flex-col p-6 transition-shadow hover:shadow-cardHover">
              <div className="flex items-center justify-between">
                <CertChip cert={cert} />
                <span className="text-xs font-medium text-ink-400">{cert.level}</span>
              </div>
              <h3 className="mt-4 font-serif text-xl font-bold text-ink-900 dark:text-cream-50">
                {cert.short}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                {cert.summary}
              </p>
              <div className="mt-5 space-y-1.5 border-t border-ink-100 pt-4 text-sm dark:border-ink-800">
                {cert.examFormat.slice(0, 2).map((line) => (
                  <p key={line} className="flex gap-2 text-ink-600 dark:text-ink-300">
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accent.solid}`} />
                    <span>{line}</span>
                  </p>
                ))}
              </div>
              <Link
                to={`/mock-exams/${cert.id}`}
                className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-colors ${accent.solid} ${accent.hover}`}
              >
                Start mock exam
              </Link>
            </div>
          )
        })}
      </div>

      <div className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-ink-900 dark:text-cream-50">
            Your attempt history
          </h2>
          {attempts.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-sm font-medium text-ink-400 underline-offset-2 hover:text-rose-500 hover:underline"
            >
              Clear history
            </button>
          )}
        </div>

        {attempts.length === 0 ? (
          <div className="card mt-4 flex items-center gap-4 p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-clay-100 text-clay-600 dark:bg-clay-900/40 dark:text-clay-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <rect x="3" y="4" width="18" height="18" rx="3" />
                <path strokeLinecap="round" d="M8 2v4m8-4v4M3 10h18" />
              </svg>
            </span>
            <div>
              <p className="font-medium text-ink-800 dark:text-ink-100">No attempts yet</p>
              <p className="text-sm text-ink-500 dark:text-ink-300">
                Finished mocks are saved here on your device so you can track progress over time.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {attempts.map((a) => {
              const cert = CERTIFICATIONS.find((c) => c.id === a.cert)
              if (!cert) return null
              const accent = accentStyles[cert.accent]
              const pct = a.total > 0 ? Math.round((a.correct / a.total) * 100) : 0
              return (
                <div
                  key={a.id}
                  className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent.soft} ${accent.text} font-serif text-sm font-bold`}
                    >
                      {cert.code.replace('CCAR', 'AR').replace('CCDV', 'DV')}
                    </span>
                    <div>
                      <p className="font-medium text-ink-800 dark:text-ink-100">{cert.short}</p>
                      <p className="text-xs text-ink-500 dark:text-ink-300">
                        {formatDate(a.date)} · {formatTime(a.timeSeconds)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-ink-500 dark:text-ink-300">
                      <span className="font-semibold text-ink-800 dark:text-ink-100">{a.correct}</span> /{' '}
                      {a.total} correct
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-24 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800`}
                      >
                        <span
                          className={`block h-full rounded-full ${accent.solid}`}
                          style={{ width: `${Math.max(pct, 4)}%` }}
                        />
                      </span>
                      <span className="w-10 text-right text-sm font-bold text-ink-800 dark:text-ink-100">
                        {pct}%
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
