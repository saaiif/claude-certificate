export interface JourneyChapter {
  id: string
  period: string
  title: string
  body: string
  points?: string[]
}

export const JOURNEY_INTRO =
  "I cleared all three Claude certifications on the technical track — Architect Foundations, Developer Foundations, and Architect Professional. This is the honest version of how I prepared, what surprised me, and what I would do differently. If you're a teammate starting out, read the blueprint first, then come back here."

export const JOURNEY_CHAPTERS: JourneyChapter[] = [
  {
    id: 'why',
    period: 'The "why"',
    title: 'Why I went for it',
    body: 'Our org is shipping Claude-based solutions to clients, and these certifications count toward our partner standing. Beyond the badge, I wanted a forcing function to learn the ecosystem properly — MCP, Claude Code, the Agent SDK, RAG — instead of my usual "good enough to ship" level of familiarity. The certification was the excuse to go deep.',
  },
  {
    id: 'how',
    period: 'The how',
    title: 'My preparation system',
    points: [
      'Downloaded the official exam guides first and turned every objective into a checkbox. The blueprints are the single most accurate description of what is actually tested.',
      'Mapped the free Anthropic Academy courses to the blueprint and worked through them course-by-course.',
      'Built three small real projects: an MCP server exposing internal tooling, a Claude Code workflow committed to a repo, and a RAG pipeline over our own docs.',
      'Wrote my own mock questions from every objective I could not answer instantly — self-quizzing found my gaps faster than re-reading anything.',
      'Practised the multiple-response format deliberately, because guessing on those burns points.',
    ],
    body: 'Most of my time was not "studying" — it was building. Every lab I built with Claude ended up being exam material, which made the whole thing feel less like cramming and more like work I should have been doing anyway.',
  },
  {
    id: 'surprised',
    period: 'The surprises',
    title: 'What surprised me on each exam',
    points: [
      'CCAR-F is heavy on orchestration and Claude Code — 47% of the paper between them. The scenario-bank format (4 of 6 scenarios, ~15 questions each) is predictable once you know the pool.',
      'CCDV-F is much more "hands-on API" than I expected. One third of it is applications & integration — retries, streaming, tool schemas. Real code experience carried me.',
      'CCAR-P has no official practice exam. The blueprint says so explicitly. The multiple-response items (~a quarter of the paper) and the dropdown scenario-matching items are what separate passes from fails.',
      'The questions reward trade-off reasoning, not trivia. Almost every scenario had two defensible answers; the exam wants the one that matches the stated requirements.',
    ],
    body: 'The biggest shock: how little "memorising facts" there was, and how much "making defensible decisions" there was. If you have architected or built one real Claude system, you are far closer to passing than the question count suggests.',
  },
  {
    id: 'differently',
    period: 'The hindsight',
    title: 'What I would do differently',
    points: [
      'Start with the blueprint, not with YouTube. I lost a week to content that was fun but off-target.',
      'Book the Pearson slot before finishing prep. A concrete date turns open-ended studying into a plan.',
      'Practise the multiple-response format earlier — it is the format where self-confidence and actual marks diverge the most.',
      'Spend more time writing evaluation metrics for my practice systems; the evaluation domain rewards precise metric definitions.',
    ],
    body: 'The one thing I would not change: building real things. If I had only read guides, I would have scraped by at best. The labs are what made the scenarios feel familiar on exam day.',
  },
  {
    id: 'first-two-weeks',
    period: 'Your first two weeks',
    title: 'A concrete plan for your first two weeks',
    points: [
      'Week 1, day 1: read your track\u2019s exam guide PDF and note the domain weights. Estimate hours per domain using the weights.',
      'Week 1: take one official Academy course per study session and immediately build the smallest possible thing that exercises it.',
      'Week 2: start self-quizzing against the blueprint objectives. Track which domains you fail — that list is your real syllabus.',
      'Week 2: build your first MCP server or Claude Code workflow. Small, committed to git, done.',
    ],
    body: 'After two weeks you will know exactly where you stand and what the remaining weeks need to cover. Then it is just disciplined repetition.',
  },
]

export interface JourneyStat {
  label: string
  value: string
}

export const JOURNEY_STATS: JourneyStat[] = [
  { label: 'Certifications cleared', value: '3 / 3' },
  { label: 'Exams passed on', value: '1st try' },
  { label: 'Total prep weeks', value: '~6' },
  { label: 'Mock questions written', value: '50+' },
]
