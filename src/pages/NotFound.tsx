import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-24 text-center">
      <p className="font-serif text-6xl font-bold text-clay-500">404</p>
      <h1 className="mt-4 font-serif text-2xl font-bold text-ink-900 dark:text-cream-50">Page not found</h1>
      <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">
        That page drifted out of context. Let&apos;s get you back to the material.
      </p>
      <Link to="/" className="btn-accent mt-8">
        Back to home
      </Link>
    </div>
  )
}
