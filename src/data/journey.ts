export interface JourneyChapter {
  id: string
  period: string
  title: string
  body: string
  points?: string[]
  hidden?: boolean
}

export const JOURNEY_INTRO =
  "This page summarises how I prepared for the Claude certification track — Architect Foundations, Developer Foundations, and Architect Professional — what surprised me, and what I would do differently. If you're starting out, read the official exam guide first, then come back here."

export const JOURNEY_CHAPTERS: JourneyChapter[] = [
  {
    id: 'why',
    period: 'The "why"',
    title: 'Why I went for it',
    body: 'Our organisation builds Claude-based solutions for clients, and these certifications contribute to our partner standing. They also gave me a clear structure for learning the ecosystem properly — MCP, Claude Code, the Agent SDK, and RAG.',
    hidden: true,
  },
  {
    id: 'how',
    period: 'The how',
    title: 'My preparation system',
    points: [
      'Start with the official exam guide — turn each objective into a quick check you can answer.',
      'Pair the free Anthropic Academy courses with the blueprint so you only study what matters.',
      'Write a few mock questions for the topics that feel fuzzy; self-quizzing beats re-reading.',
      'Practice the multiple-response format a bit — that format trips people up.',
    ],
    body: 'I mixed light reading with quick hands-on tries. The goal wasn\'t to master everything — just to be comfortable enough that the exam scenarios felt familiar.',
  },
  {
    id: 'surprised',
    period: 'The surprises',
    title: 'What surprised me',
    points: [
      'CCAR-F leans hard on orchestration and Claude Code — together ~47%. It draws from a known scenario pool (4 of 6 scenarios), so the pool tells you what to prep.',
      'CCDV-F is about a third applications & integration — retries, streaming, tool schemas. Pure API hands-on stuff.',
      'CCAR-P has no official mock. ~25% multiple-response, plus dropdown scenario-matching items you don\'t see elsewhere.',
      'The questions test trade-off reasoning, not fact recall. Most scenarios have two defensible answers; the right one matches the stated requirements.',
    ],
    body: 'I expected more fact recall and got more "here\'s a scenario, pick the right trade-off." If you\'ve tinkered with the platform a bit, the scenarios click faster.',
  },
  {
    id: 'differently',
    period: 'The hindsight',
    title: 'What I would do differently',
    points: [
      'Start with the blueprint before exploring other content.',
      'Book the exam slot early, so studying has a clear deadline.',
      'Practise the multiple-response format from the beginning.',
      'Spend more time writing evaluation metrics while building practice systems — the evaluation domain rewards precise metrics.',
    ],
    body: 'Overall, I would keep the same balance of building and studying. Hands-on practice made the exam scenarios feel familiar.',
  },
  {
    id: 'first-two-weeks',
    period: 'Your first two weeks',
    title: 'A concrete plan for your first two weeks',
    points: [
      'Week 1, day 1: read the exam guide for your track and note the domain weights.',
      'Week 1: take one Academy course per study session and build the smallest exercise that applies it.',
      'Week 2: test yourself against the blueprint objectives and track the domains where you struggle.',
      'Week 2: build your first MCP server or Claude Code workflow and commit it to git.',
    ],
    body: 'After two weeks you will know where you stand and what to focus on next.',
  },
]

export interface JourneyStat {
  label: string
  value: string
}

export const JOURNEY_STATS: JourneyStat[] = [
  { label: 'Certifications cleared', value: '3 / 4' },
  { label: 'Total prep weeks', value: '~6' },
  { label: 'Mock questions written', value: '50+' },
]
