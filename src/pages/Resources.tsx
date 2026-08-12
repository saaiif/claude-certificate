import { useMemo, useState } from 'react'
import { RESOURCES, RESOURCE_CATEGORIES } from '../data/resources'
import { CERTIFICATIONS } from '../data/certs'
import type { CertId } from '../types'
import { SectionHeading } from '../components/ui'

type CertFilter = 'all' | CertId | 'general'

const CERT_FILTERS: { value: CertFilter; label: string }[] = [
  { value: 'all', label: 'All tracks' },
  ...CERTIFICATIONS.map((c) => ({ value: c.id as CertId, label: c.code })),
  { value: 'general', label: 'General' },
]

export function Resources() {
  const [query, setQuery] = useState('')
  const [cert, setCert] = useState<CertFilter>('all')
  const [category, setCategory] = useState<string>('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return RESOURCES.filter((r) => {
      if (cert !== 'all' && r.cert !== cert) return false
      if (category !== 'All' && r.category !== category) return false
      if (!q) return true
      return (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q)) ||
        r.category.toLowerCase().includes(q)
      )
    })
  }, [query, cert, category])

  return (
    <div className="container-page py-14 sm:py-16">
      <SectionHeading
        eyebrow="Curated links"
        title="Resources that map to the exams"
        subtitle="Official docs, Anthropic Academy courses, engineering posts, and the third-party practice material I actually found useful. Every link is tagged by the track it serves."
      />

      <div className="mt-8 space-y-4">
        <div className="relative">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400"
          >
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="m20 20-3.5-3.5" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, tag, or topic… e.g. MCP, caching, RAG"
            className="input pl-12"
          />
        </div>

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

        <div className="flex flex-wrap gap-2">
          {['All', ...RESOURCE_CATEGORIES].map((c) => (
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
      </div>

      <p className="mt-6 text-sm text-ink-500 dark:text-ink-300">
        Showing <span className="font-semibold text-ink-800 dark:text-cream-50">{filtered.length}</span> of{' '}
        {RESOURCES.length} resources
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {filtered.map((r) => {
          const isGeneral = r.cert === 'general'
          const certMeta = isGeneral ? null : CERTIFICATIONS.find((c) => c.id === r.cert)
          return (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card group flex flex-col p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-cardHover"
            >
              <div className="flex items-center gap-2">
                <span className="chip bg-cream-200 text-ink-600 dark:bg-ink-800 dark:text-ink-200">
                  {r.category}
                </span>
                {r.official && (
                  <span className="chip bg-moss-400/10 text-moss-600 dark:text-moss-400">Official</span>
                )}
                {isGeneral ? (
                  <span className="chip bg-ink-100 text-ink-500 dark:bg-ink-800 dark:text-ink-300">All tracks</span>
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

              <h3 className="mt-3 flex items-start justify-between gap-2 font-serif text-lg font-bold leading-snug text-ink-900 group-hover:text-clay-600 dark:text-cream-50 dark:group-hover:text-clay-300">
                {r.title}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mt-1 h-4 w-4 shrink-0 text-ink-300 transition-all group-hover:translate-x-0.5 group-hover:text-clay-500 dark:text-ink-500"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
                </svg>
              </h3>

              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                {r.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {r.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-cream-200 px-2 py-0.5 text-[11px] font-medium text-ink-500 dark:bg-ink-800 dark:text-ink-300"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </a>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="card mt-4 p-10 text-center">
          <p className="font-serif text-lg font-bold text-ink-800 dark:text-cream-50">No resources match</p>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
            Try clearing the search or changing the filters.
          </p>
        </div>
      )}
    </div>
  )
}
