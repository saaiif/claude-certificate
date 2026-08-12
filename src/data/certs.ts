import type { Certification } from '../types'

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'ccar-p',
    code: 'CCAR-P',
    name: 'Claude Certified Architect — Professional',
    short: 'Architect — Professional',
    level: 'Professional',
    price: 175,
    questions: 63,
    minutes: 120,
    passScore: 720,
    passScale: 1000,
    domains: [
      { name: 'Solution Design & Architecture', weight: 17 },
      { name: 'Models, Prompting & Context Engineering', weight: 13 },
      { name: 'Integration', weight: 19 },
      { name: 'Evaluation, Testing & Optimization', weight: 16 },
      { name: 'Governance, Safety & Risk Management', weight: 14 },
      { name: 'Stakeholder Communication & Lifecycle', weight: 14 },
      { name: 'Developer Productivity & Enablement', weight: 7 },
    ],
    summary:
      "Anthropic's senior architect exam. It tests your ability to own a Claude solution end to end: discovery, architecture, enterprise integration, evaluation, governance, and the stakeholder conversations around all of it.",
    whoFor:
      'Mid-to-senior solution architects, AI/ML engineers, technical leads and senior engineers with ~3+ years of systems architecture experience and ~6 months of hands-on production work with Claude or similar LLM systems.',
    examFormat: [
      '63 items in 120 minutes (~1.9 min per question)',
      'Single-answer multiple choice + multiple-response (Select TWO / THREE)',
      'A minority of scenario-matching items with dropdowns',
      'Scaled score 100–1000, need 720 to pass',
      'Pass / fail result with percent-correct by domain on the score report',
    ],
    blurb:
      'The capstone. No official practice exam exists, so I treated the blueprint PDF as a checklist, built real systems with MCP + Claude Code, and drilled multiple-response format until it felt second nature.',
    accent: 'clay',
  },
  {
    id: 'ccar-f',
    code: 'CCAR-F',
    name: 'Claude Certified Architect — Foundations',
    short: 'Architect — Foundations',
    level: 'Foundations',
    price: 125,
    questions: 60,
    minutes: 120,
    passScore: 720,
    passScale: 1000,
    domains: [
      { name: 'Agentic Architecture & Orchestration', weight: 27 },
      { name: 'Claude Code Configuration & Workflows', weight: 20 },
      { name: 'Prompt Engineering & Structured Output', weight: 20 },
      { name: 'Tool Design & MCP Integration', weight: 18 },
      { name: 'Context Management & Reliability', weight: 15 },
    ],
    summary:
      'The design-level exam. It validates that you can make informed trade-off decisions building production-grade Claude applications with Claude Code, the Claude Agent SDK, the Claude API, and MCP.',
    whoFor:
      'Solution architects and technical practitioners designing production-grade Claude and agentic systems end to end.',
    examFormat: [
      '60 items in 120 minutes',
      'Drawn from a scenario bank — 4 scenarios from a pool of 6, each carrying ~15 questions',
      'Scenario themes: customer support agent, Claude Code workflows, multi-agent research, developer productivity, CI/CD, structured data extraction',
      'Scaled score 100–1000, need 720 to pass',
    ],
    blurb:
      'The heaviest of the Foundations exams despite the name — orchestration is 27% and Claude Code is 20%. If you know the six scenarios up front, you can predict most of what you will be asked.',
    accent: 'moss',
  },
  {
    id: 'ccdv-f',
    code: 'CCDV-F',
    name: 'Claude Certified Developer — Foundations',
    short: 'Developer — Foundations',
    level: 'Foundations',
    price: 125,
    questions: 53,
    minutes: 120,
    passScore: 720,
    passScale: 1000,
    domains: [
      { name: 'Applications & Integration', weight: 33.1 },
      { name: 'Model Selection & Optimization', weight: 16.8 },
      { name: 'Agents & Workflows', weight: 14.7 },
      { name: 'Prompt & Context Engineering', weight: 11.0 },
      { name: 'Tools & MCPs', weight: 10.6 },
      { name: 'Security & Safety', weight: 8.1 },
      { name: 'Claude Code', weight: 3.1 },
      { name: 'Eval, Testing & Debugging', weight: 2.6 },
    ],
    summary:
      "The engineer's exam. It validates building and shipping with the Claude API, custom tools, MCP servers, model optimization, and security — one third of it is plain applications and integration.",
    whoFor:
      'Engineers who build, integrate and ship Claude-powered applications, agents and workflows on the Claude API.',
    examFormat: [
      '53 items in 120 minutes',
      'Heavy single-answer multiple choice with some multiple-response',
      'Applications & Integration alone is 33.1% of the scored items',
      'Scaled score 100–1000, need 720 to pass',
    ],
    blurb:
      'The most practical exam of the three. Getting hands-on with the Messages API, tool use and MCP servers is worth more than any amount of theory here.',
    accent: 'clay',
  },
]

export function getCertification(id: string | undefined): Certification | undefined {
  return CERTIFICATIONS.find((c) => c.id === id)
}
