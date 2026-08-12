export type Accent = 'clay' | 'moss'

export const accentStyles: Record<
  Accent,
  {
    solid: string
    soft: string
    text: string
    border: string
    ring: string
    hover: string
  }
> = {
  clay: {
    solid: 'bg-clay-500',
    soft: 'bg-clay-50 dark:bg-clay-900/30',
    text: 'text-clay-700 dark:text-clay-300',
    border: 'border-clay-200 dark:border-clay-800',
    ring: 'focus-visible:outline-clay-500',
    hover: 'hover:bg-clay-600',
  },
  moss: {
    solid: 'bg-moss-500',
    soft: 'bg-moss-400/10 dark:bg-moss-500/10',
    text: 'text-moss-700 dark:text-moss-400',
    border: 'border-moss-400/40 dark:border-moss-500/30',
    ring: 'focus-visible:outline-moss-500',
    hover: 'hover:bg-moss-600',
  },
}
