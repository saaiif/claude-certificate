import { Link } from 'react-router-dom'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-20 border-t border-ink-100 bg-cream-50 dark:border-ink-800 dark:bg-ink-950">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-10 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-serif text-lg font-bold text-ink-900 dark:text-cream-50">Claude Cert Prep</p>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
            Built for my teammates and anyone preparing for the Claude certification exams.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 text-sm text-ink-500 sm:items-end dark:text-ink-300">
          <div className="flex flex-wrap justify-center gap-5">
            <Link to="/mock-exams" className="hover:text-clay-600 dark:hover:text-clay-300">
              Mock Exams
            </Link>
            <Link to="/resources" className="hover:text-clay-600 dark:hover:text-clay-300">
              Resources
            </Link>
            <Link to="/tips" className="hover:text-clay-600 dark:hover:text-clay-300">
              Tips
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-ink-100 dark:border-ink-800">
        <p className="container-page py-5 text-center text-xs text-ink-400 dark:text-ink-400">
          © {year} Saif M. Independent study resource. Not affiliated with Anthropic. Content based on public exam guides and personal experience.
        </p>
      </div>
    </footer>
  )
}
