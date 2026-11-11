// All page copy lives here. Keep it lean: detail belongs in the fit-check deck.
// Headlines: put a line break (\n) after each comma or full stop.
// NEVER add prices, rates or payment terms here (see CLAUDE.md).

export const nav = [
  { href: '#build', label: 'build' },
  { href: '#process', label: 'process' },
  { href: '#principles', label: 'principles' },
  { href: '#faq', label: 'faq' },
];

export const hero = {
  label: 'data & ai solutions · malaysia',
  headline: ['Data & AI,', 'built to work'],
  lede: 'datawazi designs, builds and runs the systems that help organisations work smarter.',
  primary: 'book a 30-min fit check',
  secondary: 'what we build',
};

export const sectors = ['SMEs', 'corporates', 'public sector & GLCs', 'non-profits', 'education', 'healthcare', 'startups'];

export const problem = {
  label: 'sound familiar?',
  headline: ['The data exists.', "Straight answers don't."],
  pains: [
    { tag: 'reporting', text: ['Month-end takes five days of copy-paste.'] },
    { tag: 'trust', text: ['Three departments.', 'Three versions of revenue.'] },
    { tag: 'ai', text: ['Everyone wants AI.', 'Nobody knows for what.'] },
  ],
};

export const build = {
  label: 'what we build',
  headline: ['Six things we build.', 'Sized to what you need.'],
};

export const services = {
  label: 'before & after the build',
  headline: ['Start with clarity.', 'Finish with a team that runs it.'],
  items: [
    { when: 'before · 1–2 weeks', title: 'Readiness audit', points: ['systems & data review', 'quick wins & risks', 'roadmap'] },
    { when: 'alongside', title: 'AI adoption & training', points: ['workshops', 'playbooks', 'AI usage policy'] },
    { when: 'after go-live', title: 'Managed support', points: ['monitoring & fixes', 'small changes', 'monthly retainer'] },
  ],
};

export const process = {
  label: 'how we work',
  headline: ['Eleven steps.', 'Five phases.', 'No surprises.'],
  phases: [
    { name: 'fit', range: '01–02', p: 0.2, steps: ['Intake', 'Fit check'] },
    { name: 'discover', range: '03–04', p: 0.4, steps: ['Discovery & audit', 'Proposal & SOW'] },
    { name: 'build', range: '05–08', p: 0.7, steps: ['Kickoff & access', 'Solution design', 'Weekly sprints & demos', 'Test & UAT'] },
    { name: 'launch', range: '09–10', p: 0.9, steps: ['Handover & training', 'Hypercare'] },
    { name: 'run', range: '11', p: 1, steps: ['Run & grow'], loop: '↻ next phase → 03' },
  ],
};

export const principles = {
  label: 'principles',
  headline: ['Five rules.', 'Every project.'],
  items: [
    { title: 'Business first', text: 'Decisions before technology.' },
    { title: 'Practical', text: 'Working systems, not hype.' },
    { title: 'Handed over', text: 'Docs and training, always.' },
    { title: 'Vendor-neutral', text: 'What fits, not what sells.' },
    { title: 'PDPA-aware', text: 'Designed in from day one.' },
  ],
};

export const who = {
  label: 'who we work with',
  headline: ['Any organisation,', 'any sector.'],
  sectors: ['SMEs', 'Corporates', 'Public sector & GLCs', 'Non-profits', 'Education', 'Healthcare', 'Startups'],
  ask: { title: 'Not sure?', cta: 'ask →' },
};

export const faq = {
  label: 'questions',
  headline: ['Straight answers.'],
  items: [
    { q: 'How much does it cost?', a: 'Depends on scope. We quote after the fit check.' },
    { q: 'Where do we start?', a: 'A 1–2 week readiness audit that ends in a roadmap.' },
    { q: 'Which platforms?', a: "Any. We're vendor-neutral and build on what you already use." },
    { q: 'Personal data?', a: 'PDPA is part of kickoff, including where data is stored.' },
    { q: 'After go-live?', a: 'Handover, 2–4 weeks of hypercare, then optional support.' },
    { q: 'Marketing or social media?', a: "Not us. We'll refer you to someone who does it well." },
  ],
};

export const contact = {
  label: 'start here',
  headline: ['One problem.', 'Thirty minutes.', 'A clear next step.'],
  lede: 'A free fit check. No slides until you want them.',
  primary: 'book a fit check',
};
