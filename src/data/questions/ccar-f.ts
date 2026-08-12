import type { Question } from '../../types'

export const CCAR_F_QUESTIONS: Question[] = [
  {
    id: 'ccar-f-1',
    cert: 'ccar-f',
    domain: 'Agentic Architecture & Orchestration',
    prompt: 'Which of the following best describes the core of an agentic loop?',
    options: [
      'A model, a set of tools, context accumulation, and a control flow that iterates until the task is done or a stop condition is met',
      'A single static prompt executed exactly once',
      'A scheduled job that runs a fixed script on a timer',
      'A fine-tuned model that answers with no tool access at all',
    ],
    correct: [0],
    explanation:
      'An agent loop works like: the model produces an action → a tool executes it → the result is appended to context → the model decides the next step — repeating until completion or a stop condition. The iterative, context-accumulating loop is what makes a system "agentic" rather than a one-shot API call.',
    tip: 'If there is no loop and no tool feedback, it is a workflow or a single call — not an agent.',
  },
  {
    id: 'ccar-f-2',
    cert: 'ccar-f',
    domain: 'Agentic Architecture & Orchestration',
    prompt: 'When is an orchestrator-subagent topology the right choice?',
    options: [
      'When a task decomposes into independent, well-defined subtasks that benefit from context isolation and can run in parallel',
      'When a deterministic sequence must always run in exactly the same order',
      'For one-off questions that need no tools',
      'Whenever you want to guarantee a fixed token budget',
    ],
    correct: [0],
    explanation:
      'Use subagents when the work splits into independent pieces: each subagent gets focused context (isolation reduces confusion and injection surface) and independent work can run in parallel. Fixed, deterministic sequences belong in workflows; trivial questions need no orchestration at all.',
    tip: 'Multi-agent design is about isolation and parallelism — not about making simple things complicated.',
  },
  {
    id: 'ccar-f-3',
    cert: 'ccar-f',
    domain: 'Agentic Architecture & Orchestration',
    prompt: 'An agent fails at a task and keeps failing after several retries. What is the correct reliability behaviour?',
    options: [
      'Escalate to a human or return a structured failure instead of retrying forever',
      'Retry in an unbounded loop until it eventually succeeds',
      'Silently return an empty answer as if the task were done',
      'Raise the temperature a little on every retry to "shuffle" the result',
    ],
    correct: [0],
    explanation:
      'Production agents need bounded retries with structured error output and an escalation path. An unbounded loop burns tokens, masks failures, and can repeat harmful side effects. Return a structured error and hand off to a human when retries are exhausted.',
    tip: 'Design error handling and escalation into the loop from day one — reliability is a design property, not luck.',
  },
  {
    id: 'ccar-f-4',
    cert: 'ccar-f',
    domain: 'Claude Code Configuration & Workflows',
    prompt: 'In Claude Code, what is the correct relationship between memory files?',
    options: [
      'User-level memory applies globally; project-level CLAUDE.md and .claude/ scoped files override within the repo',
      'There is only one global memory file and it cannot be scoped',
      'Session history is the only persistent memory Claude Code uses',
      'CLAUDE.md has been deprecated in favour of shell aliases',
    ],
    correct: [0],
    explanation:
      'Claude Code reads memory top-down: user-level memory applies everywhere, then project-level CLAUDE.md, then scoped files such as .claude/commands, .claude/rules, and .claude/agents. Project-level memory committed to the repo keeps team standards consistent and versioned.',
    tip: 'Keep shared team standards in the repo (CLAUDE.md / .claude/), not in each person\u2019s global settings.',
  },
  {
    id: 'ccar-f-5',
    cert: 'ccar-f',
    domain: 'Claude Code Configuration & Workflows',
    prompt: 'Which TWO are supported ways to extend Claude Code for a team?',
    options: [
      'Custom slash commands (e.g. .claude/commands/*.md)',
      'Skills folders with a SKILL.md description',
      'Editing the model\u2019s pretrained weights directly',
      'Patching the Claude Code binary yourself',
      'Only typing in interactive chat with no files on disk',
    ],
    correct: [0, 1],
    explanation:
      'Custom commands and skills (a directory containing SKILL.md plus instructions) are the supported extension points for reusable team workflows. Both are committed to the repo, versioned, and automatically discoverable. Editing weights or patching the binary is neither supported nor needed.',
  },
  {
    id: 'ccar-f-6',
    cert: 'ccar-f',
    domain: 'Claude Code Configuration & Workflows',
    prompt: 'You want Claude Code to run in a CI pipeline on every pull request. What must you handle?',
    options: [
      'Run it headless (non-interactive) with explicit permission rules for the commands it may run',
      'Nothing — it behaves exactly as it does in an interactive terminal',
      'Install the CLI and trust default permissions; CI is not special',
      'CI cannot run Claude Code at all',
    ],
    correct: [0],
    explanation:
      'In CI, Claude Code must run in a non-interactive (headless) mode with permission rules defined — allowing/disallowing operations like Bash or Edit for the known-safe subset — so it can act autonomously. Version-pinning the tool and using a service-level credential keep pipelines reproducible and auditable.',
    tip: 'Hooks (PreToolUse/PostToolUse) are how you enforce guardrails on agent actions at scale.',
  },
  {
    id: 'ccar-f-7',
    cert: 'ccar-f',
    domain: 'Prompt Engineering & Structured Output',
    prompt: 'To get consistently high-quality, verifiable outputs, what belongs in the prompt?',
    options: [
      'Explicit, observable criteria and concrete output expectations',
      'No instructions — let the model infer the goal',
      'Requirements listed in random order',
      'Deliberately contradictory requirements to test the model',
    ],
    correct: [0],
    explanation:
      'Explicit, non-contradictory criteria with concrete output expectations produce the most consistent results and are testable in evals. Ambiguity, random ordering, and contradiction all invite inconsistency. Write criteria that a checker (human or LLM) can observe.',
    tip: 'Few-shot examples plus explicit criteria outperform either alone — show the expected input/output shape.',
  },
  {
    id: 'ccar-f-8',
    cert: 'ccar-f',
    domain: 'Prompt Engineering & Structured Output',
    prompt: 'To reliably get a structured JSON response from the Claude API, the recommended pattern is:',
    options: [
      'Define a tool whose input schema is the target structure and set tool_choice to require that tool',
      'Add "return JSON" to the user prompt and parse whatever comes back',
      'Wrap the answer in markdown code fences and regex it out',
      'Ask for a comma-separated string and split on commas',
    ],
    correct: [0],
    explanation:
      'Constrained tool use is the dependable path: declare a structured-output tool with a precise JSON input schema and set tool_choice = {"type": "tool", "name": ...}. The model must produce a valid payload for that schema instead of free text you parse. Wrap it in a validation-retry loop to catch schema violations.',
  },
  {
    id: 'ccar-f-9',
    cert: 'ccar-f',
    domain: 'Tool Design & MCP Integration',
    prompt: 'What is a best practice when defining a tool\u2019s input schema for the Claude API?',
    options: [
      'Write precise descriptions for each parameter, mark required fields explicitly, and use correct types',
      'Pack every argument into one large unstructured string',
      'Use short names with no descriptions so the model is forced to "figure it out"',
      'Include the tool\u2019s secrets in the parameter descriptions for convenience',
    ],
    correct: [0],
    explanation:
      'Tool-use accuracy depends on schema clarity: detailed parameter descriptions, explicit required fields, and correct types let the model fill arguments correctly. Unstructured blobs cause wrong calls, and secrets in descriptions are a leak waiting to happen.',
  },
  {
    id: 'ccar-f-10',
    cert: 'ccar-f',
    domain: 'Tool Design & MCP Integration',
    prompt: 'Which TWO statements about Model Context Protocol (MCP) are true?',
    options: [
      'MCP is an open protocol that standardizes how models discover and call external tools and data sources',
      'MCP servers expose capabilities such as tools, resources, and prompts',
      'MCP only works with a single model provider',
      'MCP replaces the Claude API entirely',
      'MCP is a database format for vector indexes',
    ],
    correct: [0, 1],
    explanation:
      'MCP standardizes the connection between model clients and external tools/data. A server exposes tools (callable functions), resources (data), and prompts (reusable templates). It is provider-agnostic and complements — not replaces — the Claude API.',
    tip: 'Think of MCP as the "USB-C" of tool integrations: one standardized interface instead of bespoke connectors.',
  },
  {
    id: 'ccar-f-11',
    cert: 'ccar-f',
    domain: 'Context Management & Reliability',
    prompt: 'In a long-running agent conversation, which technique best maintains coherence while staying inside the context window?',
    options: [
      'Compacting older turns into a durable summary and keeping essential state in a scratchpad',
      'Never pruning anything — always send the full raw history',
      'Clearing all history at each step so the model starts fresh',
      'Injecting the entire knowledge base into every turn',
    ],
    correct: [0],
    explanation:
      'Long conversations overflow the context window. Compaction condenses older turns into a summary while a notes buffer keeps the important state explicit and durable. Pruning nothing overflows, clearing everything loses state, and injecting the full knowledge base blows the budget.',
  },
  {
    id: 'ccar-f-12',
    cert: 'ccar-f',
    domain: 'Context Management & Reliability',
    prompt: 'What makes a prompt a good candidate for prompt caching?',
    options: [
      'A long, stable prefix (system prompt + tools) reused across many requests that differ only at the end',
      'A fully dynamic prompt that changes on every request',
      'Very short prompts of only a few tokens',
      'Prompts containing only per-user private data',
    ],
    correct: [0],
    explanation:
      'Caching pays off on long, static prefixes reused across requests: cached input tokens cost roughly a tenth of the normal input price and reduce time-to-first-token. Fully dynamic, tiny, or purely per-user prompts gain nothing from a cache.',
  },
]
