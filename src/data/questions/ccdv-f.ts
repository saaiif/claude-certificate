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
]
