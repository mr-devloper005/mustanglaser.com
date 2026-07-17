import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Field notes',
    headline: 'Long-form fabrication stories and process writeups.',
    description: 'Use article pages for project breakdowns, material explainers, installation notes, and deeper process context.',
    filterLabel: 'Filter article category',
    secondaryNote: 'Give long-form content a slower reading rhythm and stronger type hierarchy.',
    chips: ['Process', 'Materials', 'Case studies'],
  },
  classified: {
    eyebrow: 'Quick notices',
    headline: 'Fast project notices and practical offers.',
    description: 'Classified pages should stay direct, scan-friendly, and useful when speed matters more than storytelling.',
    filterLabel: 'Filter classified category',
    secondaryNote: 'Use shorter summaries and practical calls to action.',
    chips: ['Fast scan', 'Offers', 'Useful details'],
  },
  sbm: {
    eyebrow: 'Reference shelf',
    headline: 'Saved fabrication references and useful links.',
    description: 'Bookmark pages work best as a small reference shelf for tools, inspiration, or supplier links.',
    filterLabel: 'Filter collection',
    secondaryNote: 'Let curation and useful metadata do the work.',
    chips: ['References', 'Links', 'Useful saves'],
  },
  profile: {
    eyebrow: 'Maker profiles',
    headline: 'Profiles that make shops and makers feel real before the inquiry starts.',
    description: 'Profile pages should foreground identity, capability, and contact routes so visitors can quickly judge fit.',
    filterLabel: 'Filter profile category',
    secondaryNote: 'Lead with credibility cues and contact context.',
    chips: ['Capabilities', 'Identity', 'Contact-ready'],
  },
  pdf: {
    eyebrow: 'Document set',
    headline: 'Downloads, documents, and reference files.',
    description: 'PDF pages should feel like a document cabinet with clear access to guides, specs, and supporting files.',
    filterLabel: 'Filter document type',
    secondaryNote: 'Make the file action obvious and keep the surrounding chrome quiet.',
    chips: ['Guides', 'Specs', 'Downloads'],
  },
  listing: {
    eyebrow: 'Shop listings',
    headline: 'Directory pages for studios, shops, and service providers.',
    description: 'Listing pages should feel practical and comparison-friendly while still carrying the brand’s warmer fabrication tone.',
    filterLabel: 'Filter business category',
    secondaryNote: 'Surface location, contact, and capability quickly.',
    chips: ['Directory', 'Compare', 'Local search'],
  },
  image: {
    eyebrow: 'Project gallery',
    headline: 'Image-led work presented like a fabrication wall, not a standard feed.',
    description: 'Image pages should let photography, material detail, and silhouette variety carry the browsing experience.',
    filterLabel: 'Filter visual category',
    secondaryNote: 'Let the image grid do the talking before long copy does.',
    chips: ['Portfolio', 'Project wall', 'Visual-first'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
