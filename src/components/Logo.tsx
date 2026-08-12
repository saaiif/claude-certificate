import { Link } from 'react-router-dom'

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Claude Cert Prep home">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-clay-500 font-serif text-lg font-bold text-white shadow-sm">
        C
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-serif text-lg font-bold tracking-tight text-ink-900 dark:text-cream-50">
          Claude Cert Prep
        </span>
        <span className="text-[11px] font-medium uppercase tracking-wider text-ink-400 dark:text-ink-300">
          passed · CCAR-P · CCAR-F · CCDV-F
        </span>
      </span>
    </Link>
  )
}
