import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

export type TaskTheme = {
  kicker: string
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const DISPLAY_FONT = '"Sora", "Plus Jakarta Sans", system-ui, sans-serif'
const BODY_FONT = '"Space Grotesk", "Inter", system-ui, sans-serif'

const warmLight = {
  dark: false,
  fontDisplay: DISPLAY_FONT,
  fontBody: BODY_FONT,
  bg: '#f6e7cb',
  surface: '#fff8ee',
  raised: '#f0dec0',
  text: '#2d0d09',
  muted: '#7a5648',
  line: 'rgba(94,0,6,0.14)',
  accent: '#9b0f06',
  accentSoft: '#f6c9b2',
  onAccent: '#fff8ef',
  glow: 'rgba(213,62,15,0.16)',
  radius: '1.45rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

const emberDark = {
  ...warmLight,
  dark: true,
  bg: '#250705',
  surface: '#35100a',
  raised: '#46140d',
  text: '#f8ebd3',
  muted: '#d0b18d',
  line: 'rgba(238,217,185,0.14)',
  accent: '#d53e0f',
  accentSoft: 'rgba(213,62,15,0.18)',
  onAccent: '#fff8ef',
  glow: 'rgba(213,62,15,0.26)',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...warmLight, kicker: 'Journal', note: 'Long-form process notes, installation stories, and material context.' },
  listing: { ...warmLight, kicker: 'Directory', note: 'Practical shop listings with a clearer fabrication point of view.' },
  classified: { ...warmLight, kicker: 'Notice', note: 'Quick offers, requests, and project notices with direct details.' },
  image: { ...emberDark, kicker: 'Gallery', note: 'Large-format imagery and project photography take the lead here.' },
  sbm: { ...warmLight, kicker: 'Shelf', note: 'Useful saved references, inspiration, and supplier links.' },
  pdf: { ...warmLight, kicker: 'Documents', note: 'Specs, guides, and downloadable support files.' },
  profile: { ...warmLight, kicker: 'Profiles', note: 'Identity-first pages for makers, shops, and collaborators.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
