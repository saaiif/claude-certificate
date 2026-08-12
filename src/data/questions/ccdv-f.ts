import type { Question } from '../../types'

export const CCDV_F_QUESTIONS: Question[] = [
  {
    id: 'ccdv-f-1',
    cert: 'ccdv-f',
    domain: 'Applications & Integration',
    prompt: 'You are sending a request to the Messages API. Which structure is valid?',
    options: [
      'system and tools as top-level parameters, with messages holding alternating user/assistant turns',
      'system as an entry inside the messages array',
      'Every message using the "user" role only',
      'A system parameter is not allowed in the Messages API',
    ],
    correct: [0],
    explanation:
      'The Messages API takes system (and tools) at the top level and messages as a list of user/assistant turns. The system prompt is configuration, not a conversation message, and roles must alternate sensibly.',
    tip: 'If you are debugging an "unexpected role" error, check that you did not put system inside the messages array.',
  },
  {
    id: 'ccdv-f-2',
    cert: 'ccdv-f',
    domain: 'Applications & Integration',
    prompt: 'Your app receives HTTP 429 (rate limit) and 529 (overloaded) responses. What is the correct handling?',
    options: [
      'Retry with exponential backoff and jitter, honoring Retry-After and rate-limit headers',
      'Retry immediately in a tight loop 100 times',
      'Keep resending the identical request until one succeeds',
      'Switch to the largest model so the request is "processed faster"',
    ],
    correct: [0],
    explanation:
      '429 and 529 are transient conditions. Exponential backoff with jitter plus honoring Retry-After / rate-limit headers is the correct behaviour. Tight immediate loops make the overload worse and risk violating rate limits further.',
  },
  {
    id: 'ccdv-f-3',
    cert: 'ccdv-f',
    domain: 'Applications & Integration',
    prompt: 'Why would you use streaming with the Messages API?',
    options: [
      'To deliver the first tokens to the user sooner and improve perceived latency',
      'To get more accurate answers',
      'To bypass rate limits',
      'To avoid the need for an API key',
    ],
    correct: [0],
    explanation:
      'Streaming returns token-by-token deltas as they are generated, cutting time-to-first-token and improving perceived responsiveness. It does not change answer quality, lift rate limits, or remove auth.',
  },
  {
    id: 'ccdv-f-4',
    cert: 'ccdv-f',
    domain: 'Model Selection & Optimization',
    prompt:
      'You have a high-volume task where latency and cost matter most and the task itself is simple. Which model strategy is the right starting point?',
    options: [
      'Start with the fastest, most cost-efficient model and escalate to a larger one only when evals show it failing',
      'Always use the largest model "to be safe"',
      'Use the largest model with maximum output tokens on every call',
      'Pick a different model at random for each request',
    ],
    correct: [0],
    explanation:
      'Right-size the model to the task: begin with the cheapest capable model, measure with evals, and escalate only when quality fails. Blindly using the largest model burns cost and latency; random routing is never a strategy.',
    tip: 'Escalation routing (cheap model → fall back to bigger on failure) is the standard cost-control pattern.',
  },
  {
    id: 'ccdv-f-5',
    cert: 'ccdv-f',
    domain: 'Model Selection & Optimization',
    prompt: 'Your app repeatedly sends a long, stable system prompt. What reduces cost per request the most?',
    options: [
      'Prompt caching the stable prefix',
      'Raising the temperature',
      'Adding more few-shot examples to every call',
      'Increasing max_tokens well beyond what you need',
    ],
    correct: [0],
    explanation:
      'Prompt caching cuts input cost dramatically (cached reads are ~90% cheaper than fresh input) and lowers latency for repeated stable prefixes. The other options either cost more or degrade consistency.',
  },
  {
    id: 'ccdv-f-6',
    cert: 'ccdv-f',
    domain: 'Agents & Workflows',
    prompt: 'When should you use a workflow instead of an agent?',
    options: [
      'When the steps are fixed and known ahead of time and outputs must be deterministic',
      'When the task is open-ended with unknown steps',
      'Always — agents are never appropriate',
      'Only when the app uses no tools at all',
    ],
    correct: [0],
    explanation:
      'Workflows (explicit, code-controlled sequences) fit fixed, known steps where determinism matters. Agents fit open-ended tasks that need dynamic tool selection. The exam rewards choosing the pattern that matches the requirement, not the fanciest one.',
  },
  {
    id: 'ccdv-f-7',
    cert: 'ccdv-f',
    domain: 'Agents & Workflows',
    prompt: 'In the Claude Agent SDK, what is a "turn" inside the agent loop?',
    options: [
      'One model call plus the tool calls it produces and their results, until control returns to the user',
      'A single output token',
      'A single tool invocation',
      'The entire lifetime of the application',
    ],
    correct: [0],
    explanation:
      'A turn is the cycle of model call → tool calls → tool results that repeats until the model yields control back to the user (or a stop condition). Understanding turns is the mental model for everything in the Agent SDK.',
  },
  {
    id: 'ccdv-f-8',
    cert: 'ccdv-f',
    domain: 'Prompt & Context Engineering',
    prompt: 'In a tool-using conversation, what is the best way to keep important state without crowding the user prompt?',
    options: [
      'Maintain a separate notes buffer that tools update with durable state',
      'Stuff the entire history into a single giant user message',
      'Repeat the whole conversation inside the system prompt on every turn',
      'Delete tool results immediately after each step',
    ],
    correct: [0],
    explanation:
      'A dedicated notes buffer keeps critical state explicit and fresh without bloating the primary prompt — one of the core context-engineering practices. Giant user messages and repeating history in the system prompt both waste tokens and invite confusion.',
  },
  {
    id: 'ccdv-f-9',
    cert: 'ccdv-f',
    domain: 'Tools & MCPs',
    prompt: 'What is the main advantage of building a custom tool over relying only on built-in tools?',
    options: [
      'It exposes exactly the action or data your app needs, with precise schemas and controlled side effects',
      'It automatically makes the model more intelligent',
      'Custom tools are guaranteed never to fail',
      'It removes the need for an API key',
    ],
    correct: [0],
    explanation:
      'Custom tools give you exact, task-specific capabilities — your APIs, data, and business actions — with schemas and side effects you control. Built-in tools cover generic cases (like web search) but cannot perform your domain logic.',
  },
  {
    id: 'ccdv-f-10',
    cert: 'ccdv-f',
    domain: 'Security & Safety',
    prompt:
      'Your app mixes user-uploaded document content with instructions in a prompt. What is the best defense against prompt injection?',
    options: [
      'Treat untrusted content as data, keep instructions in the system prompt, and constrain/validate any tool actions triggered by that content',
      'Blindly copy the uploaded text into the system prompt',
      'Disable all output validation to speed things up',
      'Trust the model to ignore anything it is told',
    ],
    correct: [0],
    explanation:
      'Defend in depth: isolate instructions from untrusted data, keep untrusted content clearly marked as data, use least-privilege tool permissions, validate outputs, and limit what untrusted content can trigger. There is no single "make the model immune" switch.',
    tip: 'Secrets belong in the environment, never in prompts or tool descriptions.',
  },
  {
    id: 'ccdv-f-11',
    cert: 'ccdv-f',
    domain: 'Claude Code',
    prompt: 'What is CLAUDE.md in a repository primarily used for?',
    options: [
      'Persistent, project-level instructions and context that Claude Code reads before doing work',
      'A decorative markdown file that Claude Code ignores',
      'Storing API keys and secrets',
      'Logging model outputs for debugging',
    ],
    correct: [0],
    explanation:
      'CLAUDE.md is the repo\u2019s memory file: conventions, architecture notes, build/test commands, and constraints that Claude Code reads automatically at the start of a session. Never store secrets in it — it is committed to version control.',
  },
  {
    id: 'ccdv-f-12',
    cert: 'ccdv-f',
    domain: 'Eval, Testing & Debugging',
    prompt: 'A request errors unexpectedly and you need help from support. Which information is most useful to include?',
    options: [
      'The message ID from the response headers',
      'The exact latency of a single healthy call',
      'Your preferred programming language',
      'The model name only',
    ],
    correct: [0],
    explanation:
      'The message ID in the response headers lets Anthropic pull the full request/response trace for the failed call. Keep logs of requests, message IDs, and timestamps so you can hand over a concrete artifact instead of a vague description.',
  },
  {
    id: 'ccdv-f-13',
    cert: 'ccdv-f',
    domain: 'Applications and Integration',
    prompt:
      'A Claude application has been in production for a year with only ad-hoc tests. What is the strongest next step?',
    options: [
      'Continue ad-hoc testing and add peer review only',
      'Define unit tests for individual functions, integration tests for Claude/tool boundaries, and end-to-end tests for critical flows',
      'Use only end-to-end tests because they resemble production',
      'Adopt TDD immediately for every existing function',
    ],
    correct: [1],
    explanation:
      'A layered testing strategy is the right response: unit tests for local logic, integration tests for model/tool/API boundaries, and end-to-end tests for critical user journeys. Ad-hoc testing alone is insufficient, and TDD on every existing function is wasteful to retrofit blindly.',
    tip: 'Testing: start where the risk is highest. Existing production code with flaky behavior benefits most from integration/end-to-end coverage first.',
  },
  {
    id: 'ccdv-f-14',
    cert: 'ccdv-f',
    domain: 'Tools and MCPs',
    prompt: 'Why should a Claude tool have a clear, detailed description?',
    options: [
      'The model uses the description to decide when the tool is relevant and how to use it',
      'The description is only for human documentation',
      'The description replaces the input schema',
      'The description prevents all incorrect tool calls automatically',
    ],
    correct: [0],
    explanation:
      'The model reads the tool description at runtime to decide whether and how to call the tool. A vague description yields wrong calls; a precise one yields correct calls. It complements — not replaces — the schema.',
    tip: 'Writing Tools for Agents (Anthropic engineering) covers description quality and error responses in depth.',
  },
  {
    id: 'ccdv-f-15',
    cert: 'ccdv-f',
    domain: 'Tools and MCPs',
    prompt:
      'A tool downstream expects strict argument types and required fields. What is the strongest API-side control?',
    options: [
      'Tell the model to "try harder" in the system prompt',
      'Remove the schema and validate only after production failures',
      'Use strict schema enforcement where supported, then handle execution errors in application code',
      'Allow arbitrary JSON and let the downstream service reject it',
    ],
    correct: [2],
    explanation:
      'Schema-level enforcement (strict JSON Schema in the tool definition) is far more reliable than prose instructions. Combine it with explicit error handling in application code for the cases the schema cannot catch.',
  },
  {
    id: 'ccdv-f-16',
    cert: 'ccdv-f',
    domain: 'Prompt and Context Engineering',
    prompt:
      'Which best distinguishes prompt engineering from context engineering?',
    options: [
      'Prompt engineering is only for single-turn apps',
      'Prompt engineering shapes individual prompts; context engineering manages what information and state are available across workflow steps',
      'Context engineering is just a newer name for prompt engineering',
      'Prompt engineering applies to text while context engineering applies only to tools',
    ],
    correct: [1],
    explanation:
      'Prompt engineering is per-call (system prompt, examples, constraints). Context engineering is cross-call: it decides which parts of the conversation, tools, scratchpad, and retrieved context make it into each model call.',
  },
  {
    id: 'ccdv-f-17',
    cert: 'ccdv-f',
    domain: 'Claude Code',
    prompt:
      'A team wants project-level Claude Code configuration that is shared, tracked, and reviewable. What is the best approach?',
    options: [
      'Keep project configuration in version control, using the project\'s .claude/settings.json and relevant CLAUDE.md files',
      'Put all configuration in each developer\'s environment variables',
      'Use a shared spreadsheet',
      'Keep configuration outside the repository so it cannot affect source control',
    ],
    correct: [0],
    explanation:
      'Shared, reviewable configuration belongs in version control (.claude/settings.json, CLAUDE.md). Per-developer env vars drift; spreadsheets go stale; out-of-repo config is unreviewable and unreproducible.',
    tip: 'Project-level config committed to the repo keeps team standards consistent — personal setups always drift.',
  },
  {
    id: 'ccdv-f-18',
    cert: 'ccdv-f',
    domain: 'Applications and Integration',
    prompt:
      'A team has accumulated customizations that bypass SDK defaults. What should you do before reverting them?',
    options: [
      'Revert everything immediately',
      'Keep everything forever because prior decisions are always correct',
      'Evaluate each customization against its original reason, current SDK behavior, and measurable benefit',
      'Migrate away from the SDK',
    ],
    correct: [2],
    explanation:
      'Each customization should be justified by its original rationale, measured against current SDK behavior, and backed by a measurable benefit. Blind reversion or blind retention both waste effort.',
  },
  {
    id: 'ccdv-f-19',
    cert: 'ccdv-f',
    domain: 'Applications and Integration',
    prompt:
      'An application makes high-volume Claude API calls and sometimes receives rate-limit errors. What is the best response?',
    options: [
      'Only increase payload sizes',
      'Ignore 429 responses',
      'Identify applicable limits, monitor usage, and implement controlled retries/backoff and traffic shaping',
      'Switch to streaming because streaming removes rate limits',
    ],
    correct: [2],
    explanation:
      'Rate limits are operational constraints to manage, not bugs to ignore. Identify limits, monitor usage, and implement bounded retry/backoff plus traffic shaping. Streaming does not remove rate limits.',
  },
  {
    id: 'ccdv-f-20',
    cert: 'ccdv-f',
    domain: 'Model Selection and Optimization',
    prompt:
      'The team evaluates models on quality, latency, and cost. How should it select a model?',
    options: [
      'Choose the model that best balances all task requirements together',
      'Optimize quality first and review latency/cost later',
      'Optimize latency first regardless of quality',
      'Choose the cheapest model that can technically answer',
    ],
    correct: [0],
    explanation:
      'Model selection should balance quality, latency, and cost against the task requirements together. Optimizing one dimension first (or cost alone) usually produces a bad trade-off somewhere else.',
    tip: 'Right-size the model to the task: start cheap/fast, measure with evals, escalate on failure.',
  },
  {
    id: 'ccdv-f-21',
    cert: 'ccdv-f',
    domain: 'Security and Safety',
    prompt:
      'Structured output occasionally fails validation. How should validation failures be treated?',
    options: [
      'As a recognized error path that can trigger repair, retry, or fallback logic',
      'As terminal failures that must always reach the user',
      'Disable validation',
      'Send malformed output directly downstream',
    ],
    correct: [0],
    explanation:
      'Structured-output validation failures are an expected, recoverable error path — trigger repair (regenerate), retry, or a fallback. Disabling validation or sending malformed data downstream is unsafe.',
  },
  {
    id: 'ccdv-f-22',
    cert: 'ccdv-f',
    domain: 'Security and Safety',
    prompt:
      'A Claude application begins refusing some in-scope requests. What is the best first investigation?',
    options: [
      'Immediately remove safety instructions',
      'Identify refused requests and compare them with successful examples to find distinguishing patterns',
      'Lower temperature',
      'Assume the refusals are normal model behavior',
    ],
    correct: [1],
    explanation:
      'Debug refusals empirically: collect the refused cases and the successful cases, then diff their inputs to find the distinguishing pattern (prompt wording, topic, context). Blindly removing safety or lowering temperature is reckless.',
    tip: 'Capture complete traces and compare successful and failing runs before changing parameters. Isolate one variable at a time.',
  },
  {
    id: 'ccdv-f-23',
    cert: 'ccdv-f',
    domain: 'Agents and Workflows',
    prompt:
      'A multi-step research task has focused subtasks and needs a final synthesis. Which pattern fits best?',
    options: [
      'One giant tool-use loop with every tool',
      'An orchestrator with specialized subagents for focused subtasks',
      'Delete each subtask\'s results immediately',
      'Precompute the entire research history before execution',
    ],
    correct: [1],
    explanation:
      'An orchestrator+subagent design matches this need: each subagent does focused, context-isolated research, then the orchestrator synthesizes. One giant loop loses isolation; deleting results loses them; precomputing is not the model\'s job.',
  },
  {
    id: 'ccdv-f-24',
    cert: 'ccdv-f',
    domain: 'Prompt and Context Engineering',
    prompt:
      'An application has a large repeated system prompt and many similar requests. What should prompt caching target?',
    options: [
      'Only the final model output',
      'Only the user\'s changing text',
      'Stable, reusable prompt prefixes such as system instructions, tool definitions, and repeated context',
      'Nothing, because caching never affects cost',
    ],
    correct: [2],
    explanation:
      'Prompt caching targets stable, reusable prefixes (system instructions, tool definitions, repeated context), not generated output (that is your responsibility) and not the user\'s varying query. It cuts input cost and latency.',
  },
  {
    id: 'ccdv-f-25',
    cert: 'ccdv-f',
    domain: 'Security and Safety',
    prompt:
      'A Claude application has separate development and production environments. How should API keys normally be managed?',
    options: [
      'Use one key everywhere',
      'Use distinct keys/credentials per environment with centralized secret management',
      'Put keys in source control',
      'Rotate one shared key randomly across all environments',
    ],
    correct: [1],
    explanation:
      'Distinct credentials per environment, centrally managed in a secret store, is the baseline. One key everywhere, keys in source control, or random rotation are all unsafe and violate separation of concerns.',
    tip: 'Secrets belong in the environment / a managed store, never in prompts, tool descriptions, or source control.',
  },
  {
    id: 'ccdv-f-26',
    cert: 'ccdv-f',
    domain: 'Applications and Integration',
    prompt:
      'An API parameter is deprecated with a six-month migration window and a replacement that differs slightly. What is the strongest migration approach?',
    options: [
      'Change every call site in one untested change',
      'Ignore the notice until removal day',
      'Wrap the old behavior and migrate only at the last moment',
      'Add regression coverage, migrate in validated batches, and complete the migration before the removal date',
    ],
    correct: [3],
    explanation:
      'Migrate in a controlled way: add regression coverage for the current behavior, migrate in small validated batches, and finish before the deadline. A big-bang change is risky; doing nothing is a failure; last-minute migration is reckless.',
    tip: 'Use the migration window: add regression coverage, migrate in validated batches, remove deprecated behavior before the deadline.',
  },
  {
    id: 'ccdv-f-27',
    cert: 'ccdv-f',
    domain: 'Eval, Testing and Debugging',
    prompt:
      'Similar inputs produce inconsistent outputs in a production Claude application. What is the strongest debugging approach?',
    options: [
      'Capture traces including inputs, system prompt, messages, model, parameters, tool calls, and outputs, then compare runs',
      'Retry every request indefinitely',
      'Assume nondeterminism and stop investigating',
      'Change temperature before collecting evidence',
    ],
    correct: [0],
    explanation:
      'Debugging inconsistent output starts with capturing complete traces (inputs, system prompt, params, tool calls, outputs) and comparing runs to isolate the variable. Retrying, giving up, or tweaking temperature before collecting evidence is not debugging.',
  },
  {
    id: 'ccdv-f-28',
    cert: 'ccdv-f',
    domain: 'Eval, Testing and Debugging',
    prompt:
      'Downstream code consumes Claude structured output. What should the application do when fields are missing or types are unexpected?',
    options: [
      'Silently drop the response',
      'Pass it downstream unchanged',
      'Crash and require manual recovery',
      'Validate and parse defensively, with explicit handling for missing fields, type mismatches, and recovery/fallback',
    ],
    correct: [3],
    explanation:
      'Defense in depth: validate and parse defensively, with explicit handling for missing fields, type mismatches, and fallback paths. Silently dropping, forwarding malformed data, or crashing are all fragile.',
    tip: 'Structured output still needs downstream validation and error handling.',
  },
  {
    id: 'ccdv-f-29',
    cert: 'ccdv-f',
    domain: 'Prompt and Context Engineering',
    prompt:
      'A Claude application needs a specific JSON shape. What should the prompt do?',
    options: [
      'Explicitly describe the required structure and constraints, while using schema-based controls where available',
      'Avoid mentioning the format',
      'Ask for JSON sometimes and prose other times',
      'Let Claude choose the output format',
    ],
    correct: [0],
    explanation:
      'Be explicit: describe the exact shape and constraints in the prompt, and prefer schema-based structured output where the API supports it for stronger guarantees.',
  },
  {
    id: 'ccdv-f-30',
    cert: 'ccdv-f',
    domain: 'Applications and Integration',
    prompt:
      'Users should see Claude\'s response as it is generated instead of waiting for completion. Which mechanism fits?',
    options: ['Batch API', 'Prompt caching', 'Streaming responses', 'Structured JSON only'],
    correct: [2],
    explanation:
      'Streaming returns deltas incrementally so users see content as it is generated, improving perceived latency. Batch is for many independent requests; caching is for input cost; structured JSON is about output format.',
    tip: 'Streaming does not remove API rate limits, and it does not change output accuracy.',
  },
  {
    id: 'ccdv-f-31',
    cert: 'ccdv-f',
    domain: 'Applications and Integration',
    prompt:
      'A PR adds a Claude feature but hard-codes the prompt, has weak error handling, and no integration tests. What should a reviewer request?',
    options: [
      'Approve because the happy path works',
      'Move configuration to a maintainable location, add error handling, and add tests for the integration',
      'Approve and fix it later personally',
      'Only add comments to the README',
    ],
    correct: [1],
    explanation:
      'Code review for AI features must cover more than the happy path: move prompts/config out of hardcoded values, add error handling, and add integration tests at the model/tool/API boundary.',
  },
  {
    id: 'ccdv-f-32',
    cert: 'ccdv-f',
    domain: 'Prompt and Context Engineering',
    prompt:
      'A Claude app works on typical inputs but struggles with known edge cases. The team has labeled examples of the desired behavior. What is a strong first technique?',
    options: [
      'Add representative edge cases as few-shot examples in the prompt, then evaluate',
      'Hide the examples from the application',
      'Tell users not to submit edge cases',
      'Immediately train a custom model',
    ],
    correct: [0],
    explanation:
      'Few-shot examples that cover the edge cases, then re-evaluate, is the right first move. Hiding examples, turning users away, or jumping to custom training are all wrong responses to the same problem.',
    tip: 'Few-shot examples plus explicit criteria outperform either alone.',
  },
  {
    id: 'ccdv-f-33',
    cert: 'ccdv-f',
    domain: 'Agents and Workflows',
    prompt:
      'A workflow has steps that must not see irrelevant prior conversation history. What technique is most appropriate?',
    options: [
      'One global prompt containing everything',
      'Context isolation using focused subagents or step-specific context',
      'Always include the full history',
      'Duplicate all history into every step',
    ],
    correct: [1],
    explanation:
      'Give each step only the context it needs — through subagents or step-specific context blocks. Putting everything in is wasteful and error-prone; duplicating history everywhere is both wasteful and risky.',
    tip: 'Context isolation reduces noise, token use, and accidental cross-step influence.',
  },
  {
    id: 'ccdv-f-34',
    cert: 'ccdv-f',
    domain: 'Claude Code',
    prompt:
      'Claude Code hooks currently run for every action and create significant overhead. How should they be scoped?',
    options: [
      'Disable all hooks',
      'Disable Claude Code during peak hours',
      'Replace hooks with prompt instructions',
      'Target hooks at high-risk or high-value events/actions where deterministic enforcement is needed',
    ],
    correct: [3],
    explanation:
      'Hook every action is an anti-pattern. Scope hooks to high-risk or high-value events that need deterministic enforcement. Disabling everything, scheduling downtime, or moving to prose instructions all lose the benefit of hooks.',
    tip: 'Hooks: use them for deterministic checks at meaningful lifecycle events, not low-risk noise. Scope them to high-value operations to avoid unnecessary overhead.',
  },
  {
    id: 'ccdv-f-35',
    cert: 'ccdv-f',
    domain: 'Tools and MCPs',
    prompt:
      'A team wants an MCP server shared by everyone working on one project. Where should the project-scoped configuration live?',
    options: [
      '.mcp.json in the project root, tracked in version control',
      'Only in one developer\'s home directory',
      'A spreadsheet',
      'Only in an environment variable',
    ],
    correct: [0],
    explanation:
      'Project-scoped MCP configuration (.mcp.json in the repo root, version-controlled) is the reviewable, reproducible choice. Home-directory files, spreadsheets, and env vars are not shared or tracked.',
  },
  {
    id: 'ccdv-f-36',
    cert: 'ccdv-f',
    domain: 'Tools and MCPs',
    prompt: 'Which statement best describes MCP in an agentic application?',
    options: [
      'MCP is only a prompt template format',
      'MCP provides a standard way for clients such as Claude Code to connect to external tools/data sources through servers',
      'MCP executes every tool inside the model',
      'MCP replaces all application authorization',
    ],
    correct: [1],
    explanation:
      'MCP is an integration protocol: clients (like Claude Code) discover and invoke tools/data exposed by MCP servers. It is not a prompt format, it does not execute tools inside the model, and it does not replace application authorization.',
    tip: 'MCP is an integration protocol, not a security boundary. Authentication, authorization, and validation remain application/server responsibilities.',
  },
  {
    id: 'ccdv-f-37',
    cert: 'ccdv-f',
    domain: 'Tools and MCPs',
    prompt: 'An MCP server exposes a destructive operation. What is the strongest design principle?',
    options: [
      'Expose it without a schema because the model can infer arguments',
      'Rely only on a natural-language warning',
      'Define a precise interface, enforce authorization/validation outside the model, and require appropriate approval for risky actions',
      'Give every user unrestricted access',
    ],
    correct: [2],
    explanation:
      'Risk scales with blast radius: a destructive tool must have a precise schema, server-side authorization and validation, and approval gates for risky actions. No-schema, prose-only warnings, or unrestricted access are unsafe.',
  },
  {
    id: 'ccdv-f-38',
    cert: 'ccdv-f',
    domain: 'Agents and Workflows',
    prompt:
      'A specialized subagent works inside a long research workflow. Why can it help more than a single agent?',
    options: [
      'It automatically knows the entire parent conversation',
      'It gets a focused context window and can return only the useful result to the parent',
      'It removes the need for evaluation',
      'It guarantees the correct answer',
    ],
    correct: [1],
    explanation:
      "A subagent's value is context isolation: it gets a focused context window (less noise) and returns a compact, useful result to the parent. It does not inherit the whole conversation, eliminate the need for evals, or guarantee correctness.",
    tip: 'Use subagents when a task benefits from focused context, clear responsibilities, or parallel/isolated research.',
  },
  {
    id: 'ccdv-f-39',
    cert: 'ccdv-f',
    domain: 'Agents and Workflows',
    prompt:
      'In a client-side tool-use loop, Claude returns a tool_use request. What happens next?',
    options: [
      'The model directly executes the function',
      'The application executes the tool, sends a tool_result back, and continues the loop',
      'The application ignores the request',
      'The user must manually run every tool',
    ],
    correct: [1],
    explanation:
      'The model only proposes tool calls — the application executes them and returns tool_result messages, then the loop continues. The model never executes tools directly, and the user is not in the loop for every step.',
  },
  {
    id: 'ccdv-f-40',
    cert: 'ccdv-f',
    domain: 'Applications and Integration',
    prompt: 'A Claude API request returns HTTP 429. What is a robust application behavior?',
    options: [
      'Retry instantly forever',
      'Treat it as a successful response',
      'Use bounded retry/backoff guided by rate-limit information and avoid creating a retry storm',
      'Disable all future requests',
    ],
    correct: [2],
    explanation:
      'Treat 429 as a transient, rate-limit condition: bounded retry with backoff, guided by Retry-After and rate-limit headers, avoiding retry storms. Instant retries, treating it as success, or disabling all requests are all wrong.',
  },
  {
    id: 'ccdv-f-41',
    cert: 'ccdv-f',
    domain: 'Claude Code',
    prompt:
      'A project wants Claude Code behavior changes to be tracked and reviewed. What governance pattern is strongest?',
    options: [
      'Edit each developer\'s local configuration independently',
      'Store shared project instructions/configuration in version control and review changes through the normal code-review workflow',
      'Use an undocumented shared spreadsheet',
      'Keep all configuration ephemeral',
    ],
    correct: [1],
    explanation:
      'Shared configuration in version control reviewed through the normal PR workflow is auditable and reproducible. Local-only edits, undocumented spreadsheets, and ephemeral config all drift and cannot be reviewed.',
    tip: 'Shared project configuration should be version-controlled and reviewable.',
  },
]
