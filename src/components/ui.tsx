import type { Certification } from '../types'
import { accentStyles } from '../lib/accent'

export function CertChip({ cert, size = 'md' }: { cert: Certification; size?: 'sm' | 'md' }) {
  const accent = accentStyles[cert.accent]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${accent.soft} ${accent.text} ${
        size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'
      } font-semibold tracking-wide`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${accent.solid}`} />
      {cert.code}
    </span>
  )
}

export function DomainWeightBar({
  domains,
  accent,
}: {
  domains: Certification['domains']
  accent: 'clay' | 'moss'
}) {
  const styles = accentStyles[accent]
  return (
    <ul className="space-y-2">
      {domains.map((d) => (
        <li key={d.name} className="flex items-center gap-3 text-sm">
          <span className="w-44 shrink-0 truncate text-ink-600 dark:text-ink-300" title={d.name}>
            {d.name}
          </span>
          <span className="h-2 flex-1 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800">
            <span
              className={`block h-full rounded-full ${styles.solid}`}
              style={{ width: `${d.weight}%` }}
            />
          </span>
          <span className={`w-10 shrink-0 text-right text-xs font-semibold ${styles.text}`}>
            {d.weight}%
          </span>
        </li>
      ))}
    </ul>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-clay-600 dark:text-clay-300">
          {eyebrow}
        </p>
      )}
      <h1 className="font-serif text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl dark:text-cream-50">
        {title}
      </h1>
      {subtitle && <p className="mt-3 text-base leading-relaxed text-ink-600 dark:text-ink-300">{subtitle}</p>}
    </div>
  )
}
