import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { RESOURCES, RESOURCE_CATEGORIES } from '../data/resources'
import { CERTIFICATIONS } from '../data/certs'
import type { CertId } from '../types'
import { SectionHeading } from '../components/ui'

type CertFilter = 'all' | CertId | 'general'

type Tab = 'links' | 'saved' | 'concepts' | 'traps' | 'checklist' | 'refs'

const TABS: { id: Tab; label: string }[] = [
  { id: 'links', label: 'Curated Links' },
  { id: 'saved', label: 'Saved' },
  { id: 'concepts', label: 'Core Concepts' },
  { id: 'traps', label: 'Common Traps' },
  { id: 'checklist', label: 'Revision Checklist' },
  { id: 'refs', label: 'Reference Docs' },
]

const CONCEPTS: { title: string; body: string }[] = [
  {
    title: 'Agent vs Workflow',
    body: 'Pick a workflow when the path is known up front and you need determinism + traceability. Pick an agent when the steps genuinely depend on what the model discovers as it goes. The exam returns to this fork constantly — "known path → workflow, unknown path → agent".',
  },
  {
    title: 'Orchestrator + subagents',
    body: 'Use it for context isolation and parallel subtasks, not as a default. The orchestrator decomposes the goal, delegates, and reassembles results. It does NOT guarantee determinism and usually costs more tokens — only adopt it when isolation or parallelism is the real payoff.',
  },
  {
    title: 'MCP as the integration standard',
    body: 'MCP is the open protocol for making tools and data sources discoverable and reusable across apps and teams. Use it for shared, reusable integrations. Use direct API/CLI for a single fixed connection, and agent-to-agent when two independent reasoning systems must coordinate.',
  },
  {
    title: 'Prompt caching',
    body: 'Mark the stable prefix (system prompt + tools) with cache_control. Cached reads are far cheaper and faster. The cache keys on the exact prefix, so any edit before the breakpoint invalidates it. Keep volatile user input after the breakpoint.',
  },
  {
    title: 'Context engineering',
    body: 'Treat context as a budget. Spend it on what the task needs and cache what is stable. Long single-agent prompts bloat and degrade; isolate subtasks or summarize. Few well-chosen examples often pay for themselves in accuracy.',
  },
  {
    title: 'RAG retrieval',
    body: 'Chunk to match document structure (sections, not fixed 200-char blocks), add small overlap, and keep provenance metadata so answers can cite sources. When hallucination appears after a data refresh, debug the retrieval layer before the model — the context changed, the weights did not.',
  },
  {
    title: 'Evaluation discipline',
    body: 'Version your eval set, keep it representative (hard cases included), and slice metrics by subgroup — an aggregate lift can hide a regression on a critical segment. Gate prompt/model changes on eval deltas, not vibes.',
  },
  {
    title: 'Guardrails scale with blast radius',
    body: 'Layer input filtering, system-prompt constraints, output validation, and programmatic tool limits. Money-moving or destructive actions warrant human-in-the-loop. Separate untrusted content (emails, tickets) from instructions and apply least privilege to tools.',
  },
  {
    title: 'Stakeholders think in value',
    body: 'Translate architecture into business pillars: efficiency, cost-per-transaction, reliability SLAs, risk. A correct design stakeholders misunderstand fails as surely as a broken one. Set realistic expectations instead of promising zero errors.',
  },
  {
    title: 'Developer enablement',
    body: 'Codify standards in the repo (CLAUDE.md, .claude/ config), ship reusable slash commands and subagent definitions, and use hooks to enforce linting/formatting automatically. Adoption scales through shared, versioned building blocks — not hero knowledge.',
  },
]

const TRAPS: { dont: string; do: string }[] = [
  {
    dont: 'Reach for a multi-agent system for a fixed two-step task.',
    do: 'Default to the simplest pattern that meets the requirement; add agents only for concrete isolation or parallelism.',
  },
  {
    dont: 'Expose 80 flat tools to one agent and expect good selection.',
    do: 'Cluster related tools, expose only what the subtask needs, and pick tools dynamically per step.',
  },
  {
    dont: 'Shuffle or edit the cached prefix "just a little".',
    do: 'Keep the prefix before the cache breakpoint truly static; put everything volatile after it.',
  },
  {
    dont: 'Trust tool output because it "usually" looks right.',
    do: 'Validate tool I/O against a schema and add a retry/repair or fallback on malformed results.',
  },
  {
    dont: 'Give an agent every capability "just in case".',
    do: 'Apply least privilege — size tools to the task and scope permissions to the blast radius.',
  },
  {
    dont: 'In-line untrusted content (tickets, web pages) into the system prompt.',
    do: 'Delimit and label untrusted content, and constrain what injected instructions can actually do.',
  },
  {
    dont: 'Report a single metric (cost or uptime) as "system health".',
    do: 'Track a small scorecard: quality, latency, cost, safety incidents, and eval coverage.',
  },
  {
    dont: 'Assume a newer prompt or model version is automatically better.',
    do: 'Re-run the versioned eval suite before/after and compare per-metric deltas.',
  },
  {
    dont: 'Commit secrets, or worse, paste them into a prompt.',
    do: 'Inject secrets at runtime from a secrets manager; never put them in source or prompts.',
  },
  {
    dont: 'Big-bang launch an agent into your riskiest workflow first.',
    do: 'Pilot with limited scope and shadow monitoring, then expand as evals and guardrails prove out.',
  },
]

const CHECKLIST: { group: string; items: string[] }[] = [
  {
    group: 'Before you design',
    items: [
      'Is the path known (workflow) or discovered (agent)?',
      'Where is the blast radius, and what controls match it?',
      'Which integrations are shared (MCP) vs single-use (API)?',
      'What does "good" mean — define eval metrics first.',
    ],
  },
  {
    group: 'While building',
    items: [
      'Stable prefix cached; volatile input after the breakpoint.',
      'Tools right-sized and least-privilege; untrusted input delimited.',
      'Tool output validated; retries/backoff on external calls.',
      'Structured output used wherever code consumes the result.',
      'RAG chunking follows document structure with provenance.',
    ],
  },
  {
    group: 'Before you ship',
    items: [
      'Eval set is versioned, representative, and subgroup-sliced.',
      'Guardrails layered and proportionate to risk.',
      'Logging/audit captures actions, inputs, and decisions.',
      'Stakeholders understand value, cost, and residual risk.',
      'Standards live in the repo, not in one person’s head.',
    ],
  },
]

const REFS: { title: string; url: string; note: string }[] = [
  { title: 'Claude Code — Settings', url: 'https://code.claude.com/docs/en/settings', note: 'Configure project and user settings.' },
  { title: 'Claude Code — Permissions', url: 'https://code.claude.com/docs/en/permissions', note: 'Scope what the agent can do.' },
  { title: 'Claude Code — MCP', url: 'https://code.claude.com/docs/en/mcp', note: 'Connect tools and data sources via MCP.' },
  { title: 'Claude Code — Sub-agents', url: 'https://code.claude.com/docs/en/sub-agents', note: 'Define focused, reusable agents.' },
  { title: 'Claude Code — Hooks', url: 'https://code.claude.com/docs/en/hooks', note: 'Automate actions on lifecycle events.' },
  { title: 'Claude API — Tool use', url: 'https://platform.claude.com/docs/en/tool-use', note: 'Give Claude callable tools.' },
  { title: 'Claude API — Structured outputs', url: 'https://platform.claude.com/docs/en/structured-outputs', note: 'Constrain responses to a schema.' },
  { title: 'Claude API — Streaming', url: 'https://platform.claude.com/docs/en/streaming', note: 'Lower perceived latency.' },
  { title: 'Claude API — Prompt caching', url: 'https://platform.claude.com/docs/en/prompt-caching', note: 'Cut cost and TTFT on stable prefixes.' },
]

const CERT_FILTERS: { value: CertFilter; label: string }[] = [
  { value: 'all', label: 'All tracks' },
  ...CERTIFICATIONS.map((c) => ({ value: c.id as CertId, label: c.code })),
  { value: 'general', label: 'General' },
]

const SAVED_KEY = 'ccert.savedResources'

function useSavedResources() {
  const [saved, setSaved] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(SAVED_KEY)
      return raw ? (JSON.parse(raw) as string[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(saved))
    } catch {
      /* ignore quota / private mode errors */
    }
  }, [saved])

  const toggle = (id: string) =>
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  const isSaved = (id: string) => saved.includes(id)

  return { saved, toggle, isSaved }
}

function StarButton({ saved, onClick }: { saved: boolean; onClick: (e: React.MouseEvent) => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={saved ? 'Remove from saved' : 'Save this resource'}
      aria-pressed={saved}
      className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
        saved
          ? 'bg-clay-500 text-white'
          : 'bg-ink-100 text-ink-400 hover:bg-ink-200 hover:text-clay-600 dark:bg-ink-800 dark:text-ink-300 dark:hover:text-clay-300'
      }`}
    >
      <svg viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 17l-5.3 2.8 1-5.8L3.5 9.2l5.9-.9L12 3z" />
      </svg>
    </button>
  )
}

function ResourceCard({ r, saved, onToggle }: { r: (typeof RESOURCES)[number]; saved: boolean; onToggle: (id: string) => void }) {
  const isGeneral = r.cert === 'general'
  const certMeta = isGeneral ? null : CERTIFICATIONS.find((c) => c.id === r.cert)
  return (
    <a
      href={r.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`card group relative flex flex-col p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-cardHover ${
        saved ? 'ring-2 ring-clay-400 dark:ring-clay-500' : ''
      }`}
    >
      <StarButton
        saved={saved}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onToggle(r.id)
        }}
      />

      <div className="flex flex-wrap items-center gap-2 pr-10">
        <span className="chip bg-cream-200 text-ink-600 dark:bg-ink-800 dark:text-ink-200">
          {r.category}
        </span>
        {r.official && <span className="chip bg-moss-400/10 text-moss-600 dark:text-moss-400">Official</span>}
        {saved && <span className="chip bg-clay-500 text-white">Saved</span>}
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
}

function LinksBrowser({ isSaved, toggle }: { isSaved: (id: string) => boolean; toggle: (id: string) => void }) {
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
    <div className="mt-2">
      <div className="mt-6 space-y-4">
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
        {filtered.map((r) => (
          <ResourceCard key={r.id} r={r} saved={isSaved(r.id)} onToggle={toggle} />
        ))}
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

export function Resources() {
  const [tab, setTab] = useState<Tab>('links')
  const { saved, toggle, isSaved } = useSavedResources()
  const savedResources = RESOURCES.filter((r) => saved.includes(r.id))

  return (
    <div className="container-page py-14 sm:py-16">
      <SectionHeading
        eyebrow="Curated links & study notes"
        title="Resources"
        subtitle="Official docs, useful reading, and the concept notes I kept returning to. Star the resources you care about and filter to your Saved tab when time is short — pair the notes with the mock exams."
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              tab === t.id
                ? 'bg-clay-500 text-white'
                : 'bg-ink-100 text-ink-600 hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:hover:bg-ink-700'
            }`}
          >
            {t.label}
            {t.id === 'saved' && saved.length > 0 ? ` (${saved.length})` : ''}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === 'links' && <LinksBrowser isSaved={isSaved} toggle={toggle} />}

        {tab === 'saved' && (
          savedResources.length > 0 ? (
            <div className="mt-2 grid gap-4 md:grid-cols-2">
              {savedResources.map((r) => (
                <ResourceCard key={r.id} r={r} saved={isSaved(r.id)} onToggle={toggle} />
              ))}
            </div>
          ) : (
            <div className="card mt-2 p-10 text-center">
              <p className="font-serif text-lg font-bold text-ink-800 dark:text-cream-50">Nothing saved yet</p>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
                Tap the star on any resource to save it here. Your saved list is stored on this device.
              </p>
            </div>
          )
        )}

        {tab === 'concepts' && (
          <div className="grid gap-4 md:grid-cols-2">
            {CONCEPTS.map((c) => (
              <div key={c.title} className="card p-5">
                <h3 className="font-serif text-lg font-bold text-ink-900 dark:text-cream-50">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{c.body}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'traps' && (
          <div className="space-y-3">
            {TRAPS.map((t, i) => (
              <div key={i} className="card p-5">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 rounded-md bg-red-100 px-2 py-1 text-xs font-bold text-red-700 dark:bg-red-900/30 dark:text-red-300">
                    Avoid
                  </span>
                  <p className="text-sm text-ink-700 dark:text-ink-200">{t.dont}</p>
                </div>
                <div className="mt-3 flex items-start gap-3 border-t border-ink-100 pt-3 dark:border-ink-800">
                  <span className="mt-0.5 shrink-0 rounded-md bg-moss-400/10 px-2 py-1 text-xs font-bold text-moss-700 dark:text-moss-300">
                    Do this
                  </span>
                  <p className="text-sm text-ink-700 dark:text-ink-200">{t.do}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'checklist' && (
          <div className="space-y-6">
            {CHECKLIST.map((c) => (
              <div key={c.group} className="card p-6">
                <h3 className="font-serif text-lg font-bold text-ink-900 dark:text-cream-50">{c.group}</h3>
                <ul className="mt-3 space-y-2">
                  {c.items.map((it, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-ink-600 dark:text-ink-300">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 h-4 w-4 shrink-0 text-moss-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                      </svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {tab === 'refs' && (
          <div className="space-y-6">
            <p className="text-sm text-ink-600 dark:text-ink-300">
              The official docs I leaned on. Each exam also has a blueprint PDF — treat that as the master checklist.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {REFS.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card group flex flex-col p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-cardHover"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-semibold text-ink-900 group-hover:text-clay-600 dark:text-cream-50 dark:group-hover:text-clay-300">
                      {r.title}
                    </h4>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0 text-ink-300 transition-all group-hover:translate-x-0.5 group-hover:text-clay-500 dark:text-ink-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </div>
                  <p className="mt-1 text-xs text-ink-500 dark:text-ink-300">{r.note}</p>
                  <p className="mt-2 text-[11px] text-ink-400 dark:text-ink-400">{r.url}</p>
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {CERTIFICATIONS.map((c) => (
                <Link
                  key={c.id}
                  to={`/mock-exams/${c.id}`}
                  className="chip border border-clay-300 bg-clay-50 text-clay-700 hover:bg-clay-100 dark:border-clay-700 dark:bg-clay-900/30 dark:text-clay-300"
                >
                  Practice {c.code} mock →
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
