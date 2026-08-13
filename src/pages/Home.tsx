import { Link } from 'react-router-dom'
import { CERTIFICATIONS } from '../data/certs'
import { JOURNEY_STATS } from '../data/journey'
import { CertChip } from '../components/ui'
import { accentStyles } from '../lib/accent'

const FEATURES = [
  {
    to: '/mock-exams',
    title: 'Mock Exams',
    description: 'Timed, exam-style practice with instant feedback and a domain-by-domain score breakdown.',
    cta: 'Take a mock',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    to: '/resources',
    title: 'Curated Resources',
    description: 'Official docs, Anthropic Academy courses, and the engineering posts that actually map to the exams.',
    cta: 'Browse resources',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5C10.6 4.8 8.7 4 6.5 4 4 4 2 5.5 2 8v10c0 .6.4 1 1 1h3a1 1 0 0 0 1-1v-7a3 3 0 0 1 5-2.2A3 3 0 0 1 17 11v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V8c0-2.5-2-4-4.5-4-2.2 0-4.1.8-5.5 2.5Z" />
      </svg>
    ),
  },
  {
    to: '/tips',
    title: 'Tips & Strategy',
    description: 'Study plans, exam-day tactics, and the gotchas I learned the hard way across all three exams.',
    cta: 'Read the tips',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l1.9 5.2L19 10l-5.1 1.8L12 17l-1.9-5.2L5 10l5.1-1.8L12 3Zm0 14.5V21m-4-1.5h8" />
      </svg>
    ),
  },
]

export function Home() {
  return (
    <div>
      <section className="border-b border-ink-100 bg-gradient-to-b from-clay-50 to-cream-100 dark:border-ink-800 dark:from-ink-900 dark:to-ink-950">
        <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-fade-up">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-clay-200 bg-white px-3 py-1 text-xs font-semibold text-clay-700 dark:border-clay-800 dark:bg-ink-900 dark:text-clay-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-moss-500" />
              I cleared all three — now you can too
            </p>
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl dark:text-cream-50">
              Crack the Claude <span className="text-clay-600 dark:text-clay-300">certification</span> track
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-600 dark:text-ink-300">
              I passed the <strong>Architect Professional (CCAR-P)</strong>,{' '}
              <strong>Architect Foundations (CCAR-F)</strong>, and{' '}
              <strong>Developer Foundations (CCDV-F)</strong> exams. I&apos;ve compiled everything that helped
              me — mock questions, curated resources, and tips — for anyone planning to take these certification
              exams.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/mock-exams" className="btn-accent">
                Start a mock exam
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-2 gap-4 sm:grid-cols-4">
              {JOURNEY_STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-2xl font-bold text-ink-900 dark:text-cream-50">{s.value}</p>
                  <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-300">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:120ms]">
            <div className="card p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-ink-400">Credentials</p>
              <div className="mt-5 space-y-4">
                {CERTIFICATIONS.map((cert) => (
                  <div key={cert.id} className="flex items-start gap-4">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accentStyles[cert.accent].soft} ${accentStyles[cert.accent].text} font-serif text-sm font-bold`}
                    >
                      {cert.code.replace('CCAR', 'AR').replace('CCDV', 'DV')}
                    </span>
                    <div className="min-w-0">
                      <CertChip cert={cert} size="sm" />
                      <p className="mt-1 truncate text-sm font-medium text-ink-800 dark:text-ink-100">
                        {cert.short}
                      </p>
                      <p className="text-xs text-ink-500 dark:text-ink-300">
                        {cert.questions} questions · {cert.minutes} min · {cert.level}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-ink-100 pt-4 text-xs leading-relaxed text-ink-500 dark:border-ink-800 dark:text-ink-300">
                Exam facts are based on the public exam guides (v1.0, July 2026). Always re-check the official
                guide before booking — details can change.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-clay-600 dark:text-clay-300">
            Choose your track
          </p>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-ink-900 dark:text-cream-50">
            Three certifications, one prep hub
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-600 dark:text-ink-300">
            Each card shows the real exam shape and links straight to a practice mock. Start with the one that
            matches your role.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CERTIFICATIONS.map((cert) => {
            const accent = accentStyles[cert.accent]
            return (
              <div
                key={cert.id}
                className="card flex flex-col p-6 transition-shadow duration-200 hover:shadow-cardHover"
              >
                <div className="flex items-center justify-between gap-3">
                  <CertChip cert={cert} />
                  <span className="text-xs font-medium text-ink-400">{cert.level}</span>
                </div>
                <h3 className="mt-4 font-serif text-xl font-bold leading-snug text-ink-900 dark:text-cream-50">
                  {cert.short}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  {cert.summary}
                </p>
                <dl className="mt-5 space-y-1.5 border-t border-ink-100 pt-4 text-sm dark:border-ink-800">
                  <div className="flex justify-between">
                    <dt className="text-ink-500 dark:text-ink-300">Questions / time</dt>
                    <dd className="font-semibold text-ink-800 dark:text-ink-100">
                      {cert.questions} · {cert.minutes} min
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-500 dark:text-ink-300">Pass score</dt>
                    <dd className="font-semibold text-ink-800 dark:text-ink-100">
                      {cert.passScore} / {cert.passScale}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-500 dark:text-ink-300">Fee</dt>
                    <dd className="font-semibold text-ink-800 dark:text-ink-100">${cert.price} USD</dd>
                  </div>
                </dl>
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
      </section>

      <section className="border-y border-ink-100 bg-white dark:border-ink-800 dark:bg-ink-900">
        <div className="container-page grid gap-6 py-16 sm:py-20 md:grid-cols-3">
          {FEATURES.map((f) => (
            <Link
              key={f.to}
              to={f.to}
              className="group rounded-2xl border border-ink-100 bg-cream-50 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-clay-200 hover:shadow-cardHover dark:border-ink-800 dark:bg-ink-950 dark:hover:border-clay-800"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-clay-100 text-clay-700 group-hover:bg-clay-500 group-hover:text-white dark:bg-clay-900/40 dark:text-clay-300 dark:group-hover:bg-clay-500 dark:group-hover:text-white">
                {f.icon}
              </span>
              <h3 className="mt-4 font-serif text-xl font-bold text-ink-900 dark:text-cream-50">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{f.description}</p>
              <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-clay-600 dark:text-clay-300">
                {f.cta}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="card flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-ink-900 dark:text-cream-50">
              Ready to test yourself?
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-600 dark:text-ink-300">
              The mock exams include the multiple-response format that trips most people up, with full
              explanations for every answer.
            </p>
          </div>
          <Link to="/mock-exams" className="btn-accent shrink-0">
            Try the mocks
          </Link>
        </div>
      </section>
    </div>
  )
}
