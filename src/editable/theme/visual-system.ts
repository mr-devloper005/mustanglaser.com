import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset =
  | 'forge-gallery'
  | 'signal-grid'
  | 'workbench-editorial'
  | 'catalog-stripe'
  | 'quiet-spec'
  | 'ember-showcase'
  | 'archive-wall'

export const visualPresets = {
  'forge-gallery': {
    label: 'Forge Gallery',
    mood: 'high-contrast fabrication portfolio with poster energy',
    fontDirection: 'geometric sans display with crisp utility body copy',
    colors: {
      background: '#f7ead1',
      foreground: '#2a0906',
      muted: '#7d5548',
      primary: '#5e0006',
      accent: '#d53e0f',
      surface: '#fff7eb',
    },
    shape: 'framed panels, sharp corners, offset rules',
  },
  'signal-grid': {
    label: 'Signal Grid',
    mood: 'industrial index, fast scan, assertive hierarchy',
    fontDirection: 'bold geometric headlines with condensed labels',
    colors: {
      background: '#f3e4c8',
      foreground: '#2d110d',
      muted: '#6f5143',
      primary: '#9b0f06',
      accent: '#d53e0f',
      surface: '#fffaf2',
    },
    shape: 'boxed modules, thin strokes, bold accent bars',
  },
  'workbench-editorial': {
    label: 'Workbench Editorial',
    mood: 'measured, tactile, story-led',
    fontDirection: 'display sans headings with calmer reading body',
    colors: {
      background: '#efe0c1',
      foreground: '#32130f',
      muted: '#7f5f51',
      primary: '#5e0006',
      accent: '#9b0f06',
      surface: '#fff8ee',
    },
    shape: 'broad margins, card stacks, measured dividers',
  },
  'catalog-stripe': {
    label: 'Catalog Stripe',
    mood: 'spec-sheet clarity with showroom polish',
    fontDirection: 'wide sans display and compact utility captions',
    colors: {
      background: '#f8ebd4',
      foreground: '#220806',
      muted: '#725548',
      primary: '#5e0006',
      accent: '#d53e0f',
      surface: '#fff7ec',
    },
    shape: 'striped headers, label tabs, framed imagery',
  },
  'quiet-spec': {
    label: 'Quiet Spec',
    mood: 'minimal production notes with warm restraint',
    fontDirection: 'precise sans and low-noise annotation type',
    colors: {
      background: '#f4e9d6',
      foreground: '#2b100d',
      muted: '#816253',
      primary: '#5e0006',
      accent: '#9b0f06',
      surface: '#fff9f0',
    },
    shape: 'airy grids, fine lines, structured whitespace',
  },
  'ember-showcase': {
    label: 'Ember Showcase',
    mood: 'cinematic case-study layout with warm glow',
    fontDirection: 'oversized sans display with compact support copy',
    colors: {
      background: '#2a0906',
      foreground: '#f7ead1',
      muted: '#d5b691',
      primary: '#eed9b9',
      accent: '#d53e0f',
      surface: '#47130d',
    },
    shape: 'dark stages, luminous overlays, framed media',
  },
  'archive-wall': {
    label: 'Archive Wall',
    mood: 'dense showcase board for visual browsing',
    fontDirection: 'bold sans titles and tiny mono-ish metadata',
    colors: {
      background: '#f4e4c7',
      foreground: '#2e0d08',
      muted: '#775446',
      primary: '#5e0006',
      accent: '#d53e0f',
      surface: '#fff6e7',
    },
    shape: 'stacked cards, masonry rhythm, shelf labels',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset: 'forge-gallery',
  radius: {
    sm: '0.9rem',
    md: '1.4rem',
    lg: '2rem',
    xl: '2.8rem',
  },
  motion: {
    pageLoad: 'animate-in fade-in slide-in-from-bottom-4 duration-700',
    cardHover: 'transition duration-500 hover:-translate-y-1.5 hover:shadow-2xl',
    softHover: 'transition duration-300 hover:opacity-90',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    displayFamily: '"Sora", "Plus Jakarta Sans", system-ui, sans-serif',
    bodyFamily: '"Space Grotesk", "Inter", system-ui, sans-serif',
    eyebrow: 'text-[11px] font-semibold uppercase tracking-[0.28em]',
    heroTitle: 'text-5xl font-semibold tracking-[-0.07em] sm:text-6xl lg:text-7xl',
    sectionTitle: 'text-3xl font-semibold tracking-[-0.05em] sm:text-4xl lg:text-5xl',
    body: 'text-base leading-8',
    caption: 'text-[11px] font-semibold uppercase tracking-[0.2em]',
  },
  surfaces: {
    glass: 'border border-[var(--editable-border)] bg-[rgba(255,247,235,0.72)] backdrop-blur-xl',
    paper: 'border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] shadow-[0_24px_70px_rgba(94,0,6,0.08)]',
    quiet: 'border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)]',
    dark: 'border border-[rgba(238,217,185,0.12)] bg-[var(--slot4-dark-bg)] shadow-[0_24px_70px_rgba(0,0,0,0.28)]',
  },
  layout: {
    page: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-12 sm:py-16 lg:py-20',
    cardGrid: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}
