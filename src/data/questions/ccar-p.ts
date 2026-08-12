import type { Question } from '../../types'

export const CCAR_P_QUESTIONS: Question[] = [
  {
    id: 'ccar-p-1',
    cert: 'ccar-p',
    domain: 'Solution Design & Architecture',
    scenario:
      'An insurance firm processes claim forms. The steps are fixed and auditable: extract fields, validate against policy rules, decide, then route. Every step must be traceable and deterministic.',
    prompt: 'Which architectural pattern best fits this requirement?',
    options: [
      'A workflow with predefined, code-controlled steps',
      'A single autonomous agent that plans its own steps',
      'An orchestrator-subagent topology with dynamic planning',
      'A prompt-only solution with no tools or pipeline',
    ],
    correct: [0],
    explanation:
      'When the steps are known in advance and determinism + traceability are hard requirements, a workflow wins. Agents exist for open-ended tasks where the path is not known up front. Orchestrator-subagents add complexity without benefit when the steps never vary.',
    tip: 'Ask: "Is the path known ahead of time?" Known path → workflow. Unknown path → agent.',
  },
  {
    id: 'ccar-p-2',
    cert: 'ccar-p',
    domain: 'Solution Design & Architecture',
    prompt:
      'You are designing a multi-agent research system. Compared with a single monolithic agent, which TWO benefits does an orchestrator-subagent topology provide?',
    options: [
      'Context isolation — each subagent only sees the context relevant to its task',
      'A guarantee of deterministic, identical outputs every run',
      'Parallel execution of independent subtasks',
      'Elimination of all prompt-injection risk',
      'Zero token consumption',
    ],
    correct: [0, 2],
    explanation:
      'Orchestrator-subagent design isolates context (each agent gets a focused prompt, reducing irrelevant-context confusion) and lets independent subagents run in parallel. It does NOT guarantee determinism, does not remove injection risk, and still consumes tokens.',
    tip: 'When you choose subagents, you trade simplicity for context isolation and parallelism — those are the two real payoffs.',
  },
  {
    id: 'ccar-p-3',
    cert: 'ccar-p',
    domain: 'Claude Models, Prompting & Context Engineering',
    prompt:
      'Every request to your service uses an identical, long system prompt plus a stable set of tools. You want to cut cost and latency without changing output quality. Which technique is the primary lever?',
    options: [
      'Prompt caching with cache_control on the stable prefix (system prompt + tools)',
      'Randomly shuffling the prompt on each request',
      'Lowering max_tokens to the smallest possible value',
      'Routing every call to the smallest model regardless of task',
    ],
    correct: [0],
    explanation:
      'Prompt caching with cache_control on the stable system/tool prefix reuses cached input tokens across requests — cached reads are ~90% cheaper and time-to-first-token drops, with no change to output quality. Shuffling the prefix breaks the cache; cutting max_tokens harms output length; blindly downsizing models trades away quality.',
  },
  {
    id: 'ccar-p-4',
    cert: 'ccar-p',
    domain: 'Claude Models, Prompting & Context Engineering',
    scenario:
      'A high-traffic customer-facing widget needs near-real-time responses. A large model call takes ~4s time-to-first-token, and answer accuracy barely matters for this specific task.',
    prompt: 'What is the most sensible model-selection trade-off?',
    options: [
      'Move to a smaller, faster model and accept the accuracy drop',
      'Keep the large model and add aggressive retries',
      'Use a small model but attach 50 few-shot examples to every call',
      'Raise max_tokens so the model "thinks longer" and returns faster',
    ],
    correct: [0],
    explanation:
      'Model selection is a trade-off across capability, latency and cost. When the SLA is latency-bound and quality is the least-binding constraint, the right call is a smaller, faster model. Retries do not fix latency, extra few-shot examples add input cost, and max_tokens does not control speed.',
    tip: 'Score each candidate model on quality, latency, and cost for YOUR workload, then pick the weakest model that still passes your evals.',
  },
  {
    id: 'ccar-p-5',
    cert: 'ccar-p',
    domain: 'Integration',
    scenario:
      'Multiple teams in your organization build apps that all need the same internal data sources and tools (CRM, ticketing, wikis). You want a reusable, discoverable integration other applications can adopt without rewriting it.',
    prompt: 'Which integration mechanism should you select?',
    options: [
      'Build an MCP server that exposes those tools and data sources as MCP tools/resources',
      'Hard-code direct API calls into every application',
      'Let agents discover each other over ad-hoc chat',
      'Export the data to CSV nightly and re-ingest it per app',
    ],
    correct: [0],
    explanation:
      'MCP is the open protocol that standardizes how models discover and call external tools and data sources — the right fit when you need reusable, discoverable integrations shared across applications and teams. Direct API integration fits a single tightly-controlled connection; agent-to-agent fits independent systems that each need their own reasoning.',
    tip: 'Mechanism selection: shared & reusable → MCP server; single fixed app → direct API/CLI; independent reasoning systems → agent-to-agent.',
  },
  {
    id: 'ccar-p-6',
    cert: 'ccar-p',
    domain: 'Integration',
    scenario:
      'You are designing a RAG pipeline over long, highly-structured policy documents with clear sections, and users query by topic.',
    prompt: 'Which TWO choices are well-matched to this data shape?',
    options: [
      'Chunk by semantic sections rather than fixed character counts',
      'Apply one uniform chunk size (e.g. 400 characters) to every document type',
      'Store chunk provenance/source metadata so answers can cite where they came from',
      'Skip indexing entirely and send the whole document on every query',
      'Use a single vector index with no metadata filtering',
    ],
    correct: [0, 2],
    explanation:
      'Chunking must match document structure — section-aware chunking preserves the semantic boundaries that fixed-size chunks shred. Provenance metadata powers grounded, citable answers. Uniform chunking across structured docs, no metadata filtering, and sending full documents are the anti-patterns.',
    tip: 'When a RAG system starts hallucinating after a data refresh, debug the retrieval layer, not the model.',
  },
  {
    id: 'ccar-p-7',
    cert: 'ccar-p',
    domain: 'Integration',
    scenario:
      'A support agent is given tools to read tickets, edit records in a database, and send emails. A prompt injection hidden in a ticket causes the agent to fire off an email.',
    prompt: 'Which design principle did this architecture violate?',
    options: [
      'Least privilege / capability bloat — the agent held more tool power than the task required',
      'Prompt length limits',
      'Temperature configuration',
      'Context window sizing',
    ],
    correct: [0],
    explanation:
      'This is capability bloat. Tools should be right-sized to the task with scoped permissions and output validation. A read-and-analyze agent should not hold an unguarded "send email" capability reachable by untrusted ticket content. Control stacks should scale with the blast radius of the tool.',
    tip: 'Analyze auth and authorization for gaps at the integration layer — where do secrets live, what can each tool actually do?',
  },
  {
    id: 'ccar-p-8',
    cert: 'ccar-p',
    domain: 'Evaluation, Testing & Optimization',
    prompt:
      'Your team wants to know whether a prompt change actually improves answer quality before rolling it out. Which approach gives the strongest signal per unit of effort?',
    options: [
      'Offline evaluation on a representative held-out dataset with defined metrics, then a production A/B test',
      'Ask two colleagues to eyeball five examples',
      'Deploy to production and watch latency only',
      'Track only the token cost per request',
    ],
    correct: [0],
    explanation:
      'Combine methodologies: offline eval on representative data is fast, cheap and repeatable; a production A/B test captures real traffic. Eyeballing five examples is not representative, and latency or cost alone do not measure answer quality.',
    tip: 'Define metrics first (accuracy, factual consistency, latency, cost, safety) — "does it work?" is too vague to test.',
  },
  {
    id: 'ccar-p-9',
    cert: 'ccar-p',
    domain: 'Evaluation, Testing & Optimization',
    scenario:
      'After a routine document refresh, your RAG assistant starts confidently giving wrong answers, with source citations that look plausible.',
    prompt: 'Where should you look first?',
    options: [
      'The retrieval layer — inspect what chunks are actually being returned',
      'The model weights — the base model needs retraining',
      'Raise the temperature to "shake up" the outputs',
      'The billing dashboard',
    ],
    correct: [0],
    explanation:
      'When hallucination appears after a data change, the retrieval layer is the first suspect: stale, overlapping, or wrongly-indexed chunks get retrieved and the model grounds confidently on them. The weights did not change — the context did. Diagnose the retrieval pipeline before touching the model.',
    tip: 'Diagnose systematically: prompt change? model version? retrieval failure? tool issue? degraded input data?',
  },
  {
    id: 'ccar-p-10',
    cert: 'ccar-p',
    domain: 'Governance, Safety & Risk Management',
    prompt:
      'You are designing guardrails for an agent that can move money between accounts. Which TWO controls are proportionate to that blast radius?',
    options: [
      'Human-in-the-loop approval before any money-moving action executes',
      'Programmatic limits on the money tool (scopes, caps, allow-lists)',
      'A read-only dashboard that merely displays agent activity',
      'Relying on the model\u2019s built-in safety training alone',
      'Removing all logging to protect customer privacy',
    ],
    correct: [0, 1],
    explanation:
      'Proportionality: controls scale with blast radius. Money-moving needs layers — input guardrails filter what reaches the model, output guardrails validate what leaves, programmatic limits constrain the tool, and humans approve consequential actions. Read-only dashboards, training-only reliance, or stripped logging are all inappropriate at this risk level.',
    tip: 'Layer guardrails: input filter → system-prompt constraints → output validation → programmatic tool limits.',
  },
  {
    id: 'ccar-p-11',
    cert: 'ccar-p',
    domain: 'Stakeholder Communication & Lifecycle',
    scenario: 'A CFO asks: "Why are we spending $X/month on this AI system?" Your architecture is correct and well-governed.',
    prompt: 'What is the most effective response?',
    options: [
      'Frame it as business value: efficiency gains, cost-per-transaction economics, and the value pillar it serves',
      'Explain the transformer architecture and attention mechanisms in detail',
      'Cite the domain weightings from the exam guide',
      'Promise it will pay off soon, with no evidence',
    ],
    correct: [0],
    explanation:
      'Stakeholder communication is an architectural competency. Executives think in business-value pillars (efficiency, transformation, productivity, cost, performance SLAs) — not implementation internals. Map every architectural decision back to a measurable business outcome.',
    tip: 'A correct design that stakeholders misunderstand fails as surely as a broken one.',
  },
  {
    id: 'ccar-p-12',
    cert: 'ccar-p',
    domain: 'Developer Productivity & Operational Enablement',
    prompt:
      'Your organization is scaling Claude Code across several engineering teams. Where should shared standards — linters, guardrails, custom slash commands — live?',
    options: [
      'Project-level configuration committed to version control',
      'Each engineer\u2019s personal configuration',
      'A wiki page that is occasionally updated',
      'Only in the memory of the senior developer',
    ],
    correct: [0],
    explanation:
      'Shared standards belong in project-level configuration (e.g. .claude/ and CLAUDE.md committed to the repo) so they are versioned, reviewed, and consistent across every team. Personal setups drift; wikis go stale; memory is not shared.',
    tip: 'An architect rolls out consistent tooling by putting standards in the repo, not by teaching them verbally.',
  },
]
