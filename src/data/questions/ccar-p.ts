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
  {
    id: 'ccar-p-13',
    cert: 'ccar-p',
    domain: 'Solution Design & Architecture',
    scenario:
      'A team builds a "research and write a report" agent. The steps are not fixed: it must decide what to search, read, and synthesize based on what it finds. The path genuinely varies each run.',
    prompt: 'Which pattern is the better fit here?',
    options: [
      'An autonomous agent that plans and adapts its own steps',
      'A rigid workflow with predetermined branches',
      'A single cached prompt with no tool access',
      'A batch ETL job that runs on a fixed schedule',
    ],
    correct: [0],
    explanation:
      'When the path is genuinely unknown at design time and depends on discovered information, an agent earns its complexity. A workflow shines when steps are known; ETL/batch is for deterministic data movement, not open-ended reasoning.',
    tip: 'Known path → workflow. Unknown, input-dependent path → agent. The exam loves this fork.',
  },
  {
    id: 'ccar-p-14',
    cert: 'ccar-p',
    domain: 'Solution Design & Architecture',
    prompt:
      'Which TWO statements about an orchestrator-subagent topology are true?',
    options: [
      'The orchestrator holds decomposed sub-tasks and aggregates subagent results',
      'Subagents should each receive only the context needed for their specific task',
      'It guarantees the same output every run regardless of input',
      'Adding subagents always lowers total token cost',
      'Every subagent must share the full global state to collaborate',
    ],
    correct: [0, 1],
    explanation:
      'The orchestrator decomposes the goal, delegates to focused subagents, and reassembles results. Context isolation per subagent is the core benefit. Determinism and guaranteed cost savings are false — subagents add round-trips and tokens; they are not a cost lever on their own.',
    tip: 'Subagent wins = context isolation + parallelism. Wins cost only when isolation prevents massive duplicated context.',
  },
  {
    id: 'ccar-p-15',
    cert: 'ccar-p',
    domain: 'Solution Design & Architecture',
    scenario:
      'A single agent keeps losing track of constraints because its prompt accumulates every prior turn, and performance degrades over long sessions.',
    prompt: 'Which design change most directly addresses this?',
    options: [
      'Introduce subagents with isolated context per subtask instead of one growing prompt',
      'Increase temperature to make outputs more varied',
      'Remove the system prompt entirely',
      'Send the entire history uncompressed on every call',
    ],
    correct: [0],
    explanation:
      'Context bloat is a classic single-agent failure. Isolating subtasks into subagents (or otherwise bounding/summarizing context) restores focus. Temperature, dropping the system prompt, or re-sending full history all worsen the problem.',
    tip: 'If quality drops as conversations get long, suspect context bloat before blaming the model.',
  },
  {
    id: 'ccar-p-16',
    cert: 'ccar-p',
    domain: 'Solution Design & Architecture',
    scenario:
      'A simple two-step task (call an API, format the result) is being proposed as a 5-agent pipeline with an orchestrator and 4 subagents.',
    prompt: 'What is the right architectural critique?',
    options: [
      'It is over-engineered; a simple workflow or single tool call would do',
      'More agents always means higher reliability',
      'The orchestrator should be replaced by a database trigger',
      'Subagents are required whenever tools are used',
    ],
    correct: [0],
    explanation:
      'Multi-agent systems add coordination cost, latency and failure surface. For a fixed two-step task, a workflow is simpler and more reliable. The exam repeatedly tests avoiding unnecessary agent complexity.',
    tip: 'Default to the simplest pattern that meets the requirement; add agents only when the benefit is concrete.',
  },
  {
    id: 'ccar-p-17',
    cert: 'ccar-p',
    domain: 'Solution Design & Architecture',
    prompt:
      'A conversational assistant must remember a user preference across multiple turns within a session but not across users. Which approach is appropriate?',
    options: [
      'Maintain per-session state (e.g. a session store) and pass only relevant context each turn',
      'Store every user preference in a single global database keyed by nothing',
      'Rely on the model to memorize across unrelated sessions',
      'Disable all state and re-ask every time',
    ],
    correct: [0],
    explanation:
      'State should be scoped and explicit: per-session state avoids cross-user leakage and keeps each prompt focused. A global un-keyed store risks data mixing; the model does not persist state across sessions; re-asking everything harms UX.',
    tip: 'Scope state to the right boundary — user, session, or request — and keep prompts minimal.',
  },
  {
    id: 'ccar-p-18',
    cert: 'ccar-p',
    domain: 'Claude Models, Prompting & Context Engineering',
    prompt:
      'You attach cache_control to a long system prompt and tools. On the next request the cache misses and you are billed full price. What is the most likely cause?',
    options: [
      'The prefix before the cache breakpoint changed (e.g. the system prompt was edited)',
      'The model got smarter between requests',
      'max_tokens was set too high',
      'The temperature was exactly 1.0',
    ],
    correct: [0],
    explanation:
      'Prompt caching keys on the exact prefix up to the cache breakpoint. Any change to that prefix (reordering, edits, inserting text) invalidates the cache. Temperature, max_tokens and model "smartness" do not affect cache hits.',
    tip: 'Keep the cached prefix truly static — put volatile content (user input) after the breakpoint.',
  },
  {
    id: 'ccar-p-19',
    cert: 'ccar-p',
    domain: 'Claude Models, Prompting & Context Engineering',
    scenario:
      'You need the model to always return a parseable result consumed by downstream code (fields: amount, currency, due_date).',
    prompt: 'Which technique gives the most reliable machine-readable output?',
    options: [
      'Structured outputs / constrained decoding to a defined schema',
      'Free-form prose the team parses with regex afterward',
      'Asking the model to "be concise"',
      'Returning markdown the code scrapes',
    ],
    correct: [0],
    explanation:
      'Structured outputs (or tool-use with a defined input schema) constrain the model to a schema, making parsing deterministic. Free-form text, "be concise", and markdown scraping are fragile and break in production.',
    tip: 'If code must consume the output, ask for structured output or a tool call — never regex prose.',
  },
  {
    id: 'ccar-p-20',
    cert: 'ccar-p',
    domain: 'Claude Models, Prompting & Context Engineering',
    prompt:
      'Which TWO are sound context-engineering practices?',
    options: [
      'Put stable, reusable instructions and examples in a cached prefix',
      'Include only information relevant to the current task; drop noise',
      'Append the entire company wiki to every request "just in case"',
      'Hide the most important constraint in the middle of a 40-item list',
      'Never use examples because they cost tokens',
    ],
    correct: [0, 1],
    explanation:
      'Context engineering is deliberate: cache the stable prefix and keep each prompt focused on task-relevant content. Dumping the whole wiki adds cost and confusion; burying key constraints weakens adherence; well-chosen examples often pay for themselves in accuracy.',
    tip: 'Context is a budget. Spend it on what the task needs; cache what is stable.',
  },
  {
    id: 'ccar-p-21',
    cert: 'ccar-p',
    domain: 'Integration',
    scenario:
      'Two independent internal systems each need their own Claude-powered reasoning and occasionally must hand a task to the other. They are owned by different teams.',
    prompt: 'Which integration pattern fits best?',
    options: [
      'Agent-to-agent (A2A) communication between the two systems',
      'A shared MCP server exposing both teams’ private databases',
      'Hard-coding one team’s API inside the other’s prompt',
      'Nightly CSV export from both',
    ],
    correct: [0],
    explanation:
      'When two autonomous, separately-owned systems must coordinate reasoning, agent-to-agent is the model. MCP is for reusable tool/data exposure to your own models; direct API/CSV are not reasoning-oriented coordination mechanisms.',
    tip: 'MCP = your model uses shared tools. A2A = independent agents talk to each other.',
  },
  {
    id: 'ccar-p-22',
    cert: 'ccar-p',
    domain: 'Integration',
    scenario:
      'You expose 80 tools to an agent. It starts choosing the wrong tool and ignoring instructions.',
    prompt: 'What is the most likely cause and fix?',
    options: [
      'Tool overload — reduce/cluster tools and expose only relevant ones per context',
      'The model is broken; switch providers',
      'Increase temperature to force better selection',
      'Add 80 more tools for completeness',
    ],
    correct: [0],
    explanation:
      'Too many tools at once degrades selection accuracy — the model struggles to pick among a large flat list. Reduce the surface, group related tools, or select tools dynamically per subtask. Throwing more at it or changing providers does not fix the design issue.',
    tip: 'Tool design is a UX problem for the model: fewer, well-named, well-grouped tools beat a giant flat list.',
  },
  {
    id: 'ccar-p-23',
    cert: 'ccar-p',
    domain: 'Integration',
    prompt:
      'For chunking long documents in RAG, which TWO practices improve retrieval quality?',
    options: [
      'Chunk by semantic/structural boundaries (headings, sections)',
      'Add small overlap between adjacent chunks to preserve context at boundaries',
      'Use one fixed 200-character chunk for every document regardless of type',
      'Strip all headings and metadata before chunking',
      'Index only the first page of each document',
    ],
    correct: [0, 1],
    explanation:
      'Structure-aware chunking keeps meaning intact, and modest overlap prevents splitting a concept across a hard boundary. Fixed tiny chunks across all doc types, stripping structure/metadata, and indexing only page one all hurt retrieval.',
    tip: 'Chunking shape should follow document shape; overlap should be small, not zero.',
  },
  {
    id: 'ccar-p-24',
    cert: 'ccar-p',
    domain: 'Integration',
    scenario:
      'An agent calls a tool that sometimes returns malformed JSON, crashing the downstream parser.',
    prompt: 'Which design control prevents this class of failure?',
    options: [
      'Validate tool output against a schema and add a retry/repair step',
      'Ignore tool errors and continue',
      'Disable the tool entirely',
      'Increase model temperature so it "notices" the bad JSON',
    ],
    correct: [0],
    explanation:
      'Treat external tool output as untrusted: validate it, and on failure either retry, repair, or fall back. Ignoring errors hides bugs; disabling the tool throws away capability; temperature does not fix parsing.',
    tip: 'Always validate and bound tool I/O — the model is not the only untrusted component.',
  },
  {
    id: 'ccar-p-25',
    cert: 'ccar-p',
    domain: 'Integration',
    scenario:
      'Your integration to a third-party API hits rate limits during traffic spikes and intermittently fails.',
    prompt: 'Which TWO changes make the integration more robust?',
    options: [
      'Retry with exponential backoff and jitter',
      'Cache responses that are stable to reduce call volume',
      'Retry immediately in a tight loop on every error',
      'Remove rate-limit handling to "go faster"',
      'Hard-code a single fixed timeout of 0ms',
    ],
    correct: [0, 1],
    explanation:
      'Backoff+jitter avoids thundering-herd retries; caching stable responses cuts load. Tight immediate retries amplify the spike, removing limits or zeroing timeouts makes failures worse.',
    tip: 'Resilient integrations assume the dependency will fail — design for retry, backoff, and caching.',
  },
  {
    id: 'ccar-p-26',
    cert: 'ccar-p',
    domain: 'Evaluation, Testing & Optimization',
    prompt:
      'Which TWO properties make an evaluation dataset trustworthy?',
    options: [
      'Representative of real production inputs (edge cases included)',
      'Stable and versioned so results are comparable over time',
      'Composed entirely of the easiest, most common examples',
      'Regenerated randomly each run so it "stays fresh"',
      'Kept secret from the team so they cannot overfit',
    ],
    correct: [0, 1],
    explanation:
      'Evals must mirror production (including hard cases) and be versioned so you can detect regressions. Only-easy sets inflate scores; randomly changing the set makes trends meaningless; hiding it from the team prevents improvement.',
    tip: 'If your eval set is easier than production, your eval is lying to you.',
  },
  {
    id: 'ccar-p-27',
    cert: 'ccar-p',
    domain: 'Evaluation, Testing & Optimization',
    scenario:
      'A prompt tweak raises overall accuracy but drops performance on a critical subgroup (refunds).',
    prompt: 'What should the team do before shipping?',
    options: [
      'Inspect subgroup-level metrics, not just the aggregate, and decide if the regression is acceptable',
      'Ship it because the average went up',
      'Delete the subgroup from the eval set',
      'Raise temperature to average things out',
    ],
    correct: [0],
    explanation:
      'Aggregate metrics hide subgroup regressions. A change that hurts a high-stakes subgroup (refunds) may be unacceptable even if the mean improves. Always slice evals by meaningful segments and make a deliberate trade-off call.',
    tip: 'Average accuracy is a political number; segment-level analysis is the engineering number.',
  },
  {
    id: 'ccar-p-28',
    cert: 'ccar-p',
    domain: 'Evaluation, Testing & Optimization',
    prompt:
      'Your team changes the system prompt regularly. How should you measure whether a change helped?',
    options: [
      'Run the versioned eval suite before/after and compare per-metric deltas',
      'Ask the loudest stakeholder for a vibe check',
      'Compare this month’s token cost only',
      'Assume newer prompts are always better',
    ],
    correct: [0],
    explanation:
      'Versioned offline evals give comparable before/after signals per metric. Vibe checks and cost-only views miss quality; "newer = better" is not a method.',
    tip: 'Treat prompts as code: version them and gate changes on eval results.',
  },
  {
    id: 'ccar-p-29',
    cert: 'ccar-p',
    domain: 'Evaluation, Testing & Optimization',
    scenario:
      'Latency is within SLA but users report answers feel "wrong" after a model swap.',
    prompt: 'Which investigation is most appropriate first?',
    options: [
      'Run the eval suite on the new model version to quantify quality deltas',
      'Roll back the SLA definition',
      'Increase max_tokens until users stop complaining',
      'Disable evaluations to save cost',
    ],
    correct: [0],
    explanation:
      'A model swap is a classic quality regression source. Re-run evals to quantify the delta and decide. Changing the SLA, padding tokens, or dropping evals all avoid the real question: did quality change?',
    tip: 'When quality complaints follow a version change, eval the new version — don’t guess.',
  },
  {
    id: 'ccar-p-30',
    cert: 'ccar-p',
    domain: 'Governance, Safety & Risk Management',
    prompt:
      'Which TWO are sound defenses against prompt injection from untrusted content (emails, tickets, web pages)?',
    options: [
      'Separate untrusted content from instructions (delimit it and mark it untrusted)',
      'Apply least-privilege to tools so injected instructions cannot trigger harmful actions',
      'Concatenate user content directly into the system prompt with no boundaries',
      'Assume the model will ignore all injected instructions on its own',
      'Give the agent every capability "just in case"',
    ],
    correct: [0, 1],
    explanation:
      'Delimiting untrusted input and constraining tool privilege are the two pillars: reduce what injection can say and reduce what it can do. Inlining untrusted text into instructions, trusting the model to ignore it, and capability bloat all increase risk.',
    tip: 'Defense in depth: clean separation of untrusted data + least-privilege tools.',
  },
  {
    id: 'ccar-p-31',
    cert: 'ccar-p',
    domain: 'Governance, Safety & Risk Management',
    scenario:
      'An agent needs API keys to call external services. Several engineers need to run it locally.',
    prompt: 'How should secrets be handled?',
    options: [
      'Inject secrets at runtime from a secrets manager; never commit them to the repo',
      'Commit them in a .env file "because it is gitignored"',
      'Embed them directly in the system prompt so the model can use them',
      'Share them in a team chat for convenience',
    ],
    correct: [0],
    explanation:
      'Secrets belong in a runtime secrets manager / environment, never in source control or prompts. Gitignore is not security, prompts leak to logs, and chat sharing spreads credentials. Human-in-the-loop and least-privilege also apply to secret scope.',
    tip: 'If a secret can appear in a prompt or a commit, it will. Manage it at runtime.',
  },
  {
    id: 'ccar-p-32',
    cert: 'ccar-p',
    domain: 'Governance, Safety & Risk Management',
    scenario:
      'A regulated workflow requires proving what the agent did and why, for audit.',
    prompt: 'Which control supports auditability?',
    options: [
      'Structured, tamper-evident logging of actions, inputs, tool calls and decisions',
      'Logging only successful outcomes and deleting the rest',
      'Disabling logs to improve latency',
      'Storing audit data only in the model’s context',
    ],
    correct: [0],
    explanation:
      'Auditable systems record actions, inputs, tool calls and decisions persistently and verifiably. Selective or absent logging destroys audit trails; context-only storage is volatile and not a record.',
    tip: 'If you cannot reconstruct what happened, you cannot govern it.',
  },
  {
    id: 'ccar-p-33',
    cert: 'ccar-p',
    domain: 'Governance, Safety & Risk Management',
    prompt:
      'For an agent that can delete production records, which human-in-the-loop design is proportionate?',
    options: [
      'Require explicit human approval for each destructive action, with a clear confirmation step',
      'Full autonomy because it is faster',
      'A human review only once per quarter',
      'No approval, but a post-incident email',
    ],
    correct: [0],
    explanation:
      'High-blast-radius actions justify synchronous human approval. Full autonomy, rare review, or after-the-fact emails are disproportionate to irreversible harm.',
    tip: 'Human-in-the-loop depth should scale with how bad a mistake can be.',
  },
  {
    id: 'ccar-p-34',
    cert: 'ccar-p',
    domain: 'Stakeholder Communication & Lifecycle',
    scenario:
      'A non-technical product owner asks why the "AI feature" is taking longer than a normal API integration.',
    prompt: 'Which response builds alignment?',
    options: [
      'Explain the added lifecycle work: evals, guardrails, monitoring and iteration, mapped to risk',
      'Say "LLMs are just hard, trust us"',
      'Show raw model configuration files',
      'Promise human-level performance by next sprint',
    ],
    correct: [0],
    explanation:
      'Stakeholders align when you translate engineering effort into risk and lifecycle terms they own: eval coverage, guardrails, monitoring. Hand-waving, raw config dumps, or unrealistic promises erode trust.',
    tip: 'Translate "AI complexity" into the business language of risk, cost, and reliability.',
  },
  {
    id: 'ccar-p-35',
    cert: 'ccar-p',
    domain: 'Stakeholder Communication & Lifecycle',
    prompt:
      'Which rollout strategy best de-risks a new agent in production?',
    options: [
      'Pilot with limited scope and shadow/monitoring, then expand as evals and guardrails prove out',
      'Big-bang launch to all users on day one',
      'Launch only to the most critical, highest-risk workflow first',
      'Never launch; keep it in a demo forever',
    ],
    correct: [0],
    explanation:
      'Incremental rollout with monitoring limits blast radius and builds evidence. Big-bang and starting at the riskiest workflow maximize exposure; never launching delivers no value.',
    tip: 'De-risk with scope: small pilot → prove → expand. Confidence comes from evidence, not optimism.',
  },
  {
    id: 'ccar-p-36',
    cert: 'ccar-p',
    domain: 'Stakeholder Communication & Lifecycle',
    scenario:
      'Leadership wants a single number to track the agent’s health.',
    prompt: 'Why is a single metric insufficient, and what should you propose?',
    options: [
      'Propose a small dashboard: quality, latency, cost, safety incidents, and coverage',
      'Report only token cost as the health metric',
      'Report only uptime',
      'Refuse to measure anything to avoid pressure',
    ],
    correct: [0],
    explanation:
      'A single metric (cost, uptime) hides quality and safety. A balanced scorecard — quality, latency, cost, safety, coverage — reflects real health and supports honest decisions.',
    tip: 'If one metric can look good while the system is failing, you need more metrics.',
  },
  {
    id: 'ccar-p-37',
    cert: 'ccar-p',
    domain: 'Stakeholder Communication & Lifecycle',
    scenario:
      'A stakeholder expects the agent to "never make mistakes."',
    prompt: 'Which is the honest, professional stance?',
    options: [
      'Set expectations: define acceptable error rates via evals and manage residual risk with guardrails',
      'Guarantee zero errors in writing',
      'Hide known limitations from stakeholders',
      'Claim the model is deterministic',
    ],
    correct: [0],
    explanation:
      'Responsible communication sets realistic expectations and quantifies residual risk rather than over-promising. Guaranteeing zero errors, hiding limits, or falsely claiming determinism damages trust when reality hits.',
    tip: 'Credibility comes from calibrated expectations, not heroic promises.',
  },
  {
    id: 'ccar-p-38',
    cert: 'ccar-p',
    domain: 'Developer Productivity & Operational Enablement',
    prompt:
      'A team wants Claude Code to follow their coding standards automatically on every project. Where should those standards live?',
    options: [
      'In CLAUDE.md / project configuration committed to the repository',
      'Only in one engineer’s head',
      'In a private chat group',
      'Nowhere; let the model infer them each time',
    ],
    correct: [0],
    explanation:
      'Project memory files (CLAUDE.md, .claude/ config) committed to the repo make standards versioned and consistent. Relying on individual memory or inference produces drift and inconsistency.',
    tip: 'Codify team standards in the repo so every session starts aligned.',
  },
  {
    id: 'ccar-p-39',
    cert: 'ccar-p',
    domain: 'Developer Productivity & Operational Enablement',
    scenario:
      'You want to automatically run a linter and update a changelog after Claude Code edits files, without prompting the user each time.',
    prompt: 'Which Claude Code mechanism fits?',
    options: [
      'Hooks — event-driven scripts that run automatically on file-edit events',
      'A subagent that sleeps until asked',
      'Manual copy-paste by the engineer',
      'The model’s memory of past sessions',
    ],
    correct: [0],
    explanation:
      'Hooks let you attach automated actions (lint, format, changelog) to lifecycle events in Claude Code, enforcing standards without manual steps. Subagents, manual steps, or memory do not provide reliable automation.',
    tip: 'Hooks turn standards into enforced automation, not suggestions.',
  },
  {
    id: 'ccar-p-40',
    cert: 'ccar-p',
    domain: 'Developer Productivity & Operational Enablement',
    prompt:
      'To scale Claude Code adoption across teams, which TWO practices help most?',
    options: [
      'Provide reusable slash commands and subagent definitions in the repo',
      'Document patterns in version-controlled guidance (CLAUDE.md)',
      'Encourage each team to invent conflicting conventions in isolation',
      'Forbid anyone from customizing their setup',
      'Keep all expertise in one person’s head',
    ],
    correct: [0, 1],
    explanation:
      'Reusable commands/subagents and shared, versioned guidance let teams adopt consistent, reviewed practices. Isolation, bans, and knowledge-hoarding all slow and fragment adoption.',
    tip: 'Adoption scales through shared, versioned building blocks — not hero knowledge.',
  },
]
