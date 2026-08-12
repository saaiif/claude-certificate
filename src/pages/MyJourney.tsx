import { Link } from 'react-router-dom'
import { JOURNEY_CHAPTERS, JOURNEY_INTRO, JOURNEY_STATS } from '../data/journey'
import { SectionHeading } from '../components/ui'

export function MyJourney() {
  return (
    <div>
      <section className="border-b border-ink-100 bg-gradient-to-b from-clay-50 to-cream-100 dark:border-ink-800 dark:from-ink-900 dark:to-ink-950">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            eyebrow="My story"
            title="How I cleared the Claude certification track"
            subtitle={JOURNEY_INTRO}
          />
          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {JOURNEY_STATS.map((s) => (
              <div key={s.label} className="card p-4 text-center">
                <p className="font-serif text-2xl font-bold text-clay-600 dark:text-clay-300">{s.value}</p>
                <p className="mt-1 text-xs text-ink-500 dark:text-ink-300">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16">
        <div className="relative space-y-10 border-l-2 border-clay-100 pl-8 sm:pl-10 dark:border-clay-900/50">
          {JOURNEY_CHAPTERS.map((chapter, i) => (
            <article key={chapter.id} className="relative animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <span className="absolute -left-[41px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-clay-500 text-[11px] font-bold text-white ring-4 ring-cream-100 sm:-left-[49px] dark:ring-ink-950">
                {i + 1}
              </span>
              <div className="card p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-clay-600 dark:text-clay-300">
                  {chapter.period}
                </p>
                <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-ink-900 dark:text-cream-50">
                  {chapter.title}
                </h2>
                {chapter.body && (
                  <p className="mt-3 text-base leading-relaxed text-ink-600 dark:text-ink-300">
                    {chapter.body}
                  </p>
                )}
                {chapter.points && (
                  <ul className="mt-4 space-y-2.5">
                    {chapter.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink-700 dark:text-ink-200">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="mt-0.5 h-4 w-4 shrink-0 text-clay-500"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4 10-10" />
                        </svg>
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl border border-clay-200 bg-clay-50 p-8 sm:flex-row sm:items-center dark:border-clay-800 dark:bg-ink-900">
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-ink-900 dark:text-cream-50">
              Start where I started
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-600 dark:text-ink-300">
              Grab a mock exam to see where you stand, then load up on the resources. You have more existing
              knowledge than you think — the exams reward judgment, not trivia.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/mock-exams" className="btn-accent">
              Take a mock
            </Link>
            <Link to="/resources" className="btn-ghost">
              Browse resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
