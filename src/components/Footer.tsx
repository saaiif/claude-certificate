import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-ink-100 bg-cream-50 dark:border-ink-800 dark:bg-ink-950">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-10 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-serif text-lg font-bold text-ink-900 dark:text-cream-50">Claude Cert Prep</p>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
            Built to help my teammates crack the Claude certification track.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 text-sm text-ink-500 sm:items-end dark:text-ink-300">
          <div className="flex gap-5">
            <Link to="/mock-exams" className="hover:text-clay-600 dark:hover:text-clay-300">
              Mock Exams
            </Link>
            <Link to="/resources" className="hover:text-clay-600 dark:hover:text-clay-300">
              Resources
            </Link>
            <Link to="/tips" className="hover:text-clay-600 dark:hover:text-clay-300">
              Tips
            </Link>
            <Link to="/my-journey" className="hover:text-clay-600 dark:hover:text-clay-300">
              My Journey
            </Link>
          </div>
          <p className="text-xs text-ink-400 dark:text-ink-400">
            Not affiliated with Anthropic. All content is my personal prep material.
          </p>
        </div>
      </div>
    </footer>
  )
}
