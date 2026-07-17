import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, Clock3, Image as ImageIcon, UserRound } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

const placeholder = '/placeholder.svg?height=900&width=1400'

function getContent(post?: SitePost | null) {
  return post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
}

export function getEditablePostImage(post?: SitePost | null) {
  const content = getContent(post)
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const featured =
    (typeof content.image === 'string' && content.image) ||
    (typeof content.featuredImage === 'string' && content.featuredImage) ||
    (typeof content.thumbnail === 'string' && content.thumbnail) ||
    (typeof content.logo === 'string' && content.logo) ||
    ''
  return mediaUrl || contentImage || featured || placeholder
}

export function toPlainText(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = getContent(post)
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof post?.summary === 'string' && post.summary) ||
    (typeof content.body === 'string' && content.body) ||
    (typeof content.excerpt === 'string' && content.excerpt) ||
    ''
  const clean = toPlainText(raw)
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = getContent(post)
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function getEditableAuthor(post?: SitePost | null) {
  const content = getContent(post)
  return (
    (typeof content.author === 'string' && content.author) ||
    (typeof content.name === 'string' && content.name) ||
    (typeof content.company === 'string' && content.company) ||
    'Studio entry'
  )
}

export function getEditableDate(post?: SitePost | null) {
  const raw = post?.publishedAt || post?.createdAt || post?.updatedAt || ''
  if (!raw) return 'Recently added'
  try {
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(raw))
  } catch {
    return 'Recently added'
  }
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

function MediaOrPlaceholder({ post, className = '', icon = <ImageIcon className="h-7 w-7" /> }: { post?: SitePost | null; className?: string; icon?: ReactNode }) {
  const image = getEditablePostImage(post)
  if (image && image !== placeholder) {
    return <img src={image} alt={post?.title || 'Project image'} className={className} loading="lazy" />
  }
  return (
    <div className={`flex items-center justify-center bg-[linear-gradient(135deg,var(--slot4-media-bg),var(--slot4-cream))] text-[var(--slot4-accent)] ${className}`}>
      {icon}
    </div>
  )
}

function MetaLine({ post, prefix }: { post: SitePost; prefix?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">
      {prefix ? <span className="text-[var(--slot4-accent)]">{prefix}</span> : null}
      <span>{getEditableCategory(post)}</span>
      <span>{getEditableDate(post)}</span>
    </div>
  )
}

export function FeaturedPostCard({ post, href, label = 'Featured project' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="group block overflow-hidden rounded-[2rem] border border-[rgba(238,217,185,0.16)] bg-[var(--slot4-dark-bg)] text-[var(--slot4-dark-text)] shadow-[0_28px_70px_rgba(37,7,5,0.28)]">
      <div className="grid min-h-[520px] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-[280px] overflow-hidden">
          <MediaOrPlaceholder post={post} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(37,7,5,0.08),rgba(37,7,5,0.7))]" />
          <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur">
            {label}
          </div>
        </div>
        <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          <div>
            <MetaLine post={post} prefix="Showcase" />
            <h3 className="mt-5 text-4xl font-semibold leading-[0.92] tracking-[-0.06em] sm:text-5xl">{post.title || 'Untitled project'}</h3>
            <p className="mt-5 max-w-xl text-sm leading-8 text-white/72 sm:text-base">
              {getEditableExcerpt(post, 220) || 'A closer look at recent fabrication work, material choices, and finished visual detail.'}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--slot4-on-accent)]">
              Open project <ArrowRight className="h-4 w-4" />
            </span>
            <span className="text-sm text-white/66">{getEditableAuthor(post)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function CompactPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group flex min-w-0 gap-4 rounded-[1.5rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-4 shadow-[0_16px_42px_rgba(94,0,6,0.07)] transition duration-300 hover:-translate-y-1">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-xs font-semibold text-[var(--slot4-on-accent)]">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">
          <Clock3 className="h-3.5 w-3.5 text-[var(--slot4-accent)]" />
          {getEditableCategory(post)}
        </p>
        <h3 className="mt-2 line-clamp-2 text-xl font-semibold leading-tight tracking-[-0.04em] text-[var(--slot4-page-text)]">
          {post.title || 'Untitled entry'}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">
          {getEditableExcerpt(post, 100) || 'Quick details and visual context for this entry.'}
        </p>
      </div>
    </Link>
  )
}

export function HorizontalPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid gap-4 overflow-hidden rounded-[1.75rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-4 shadow-[0_18px_46px_rgba(94,0,6,0.08)] transition duration-300 hover:-translate-y-1 sm:grid-cols-[280px_minmax(0,1fr)] sm:p-5">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.2rem] bg-[var(--slot4-media-bg)]">
        <MediaOrPlaceholder post={post} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="min-w-0 py-1 sm:py-2">
        <MetaLine post={post} prefix={`No. ${String(index + 1).padStart(2, '0')}`} />
        <h3 className="mt-3 line-clamp-3 text-2xl font-semibold leading-[1.02] tracking-[-0.05em] text-[var(--slot4-page-text)] sm:text-3xl">
          {post.title || 'Untitled project'}
        </h3>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">
          {getEditableExcerpt(post, 175) || 'A practical summary of the project, profile, or showcase entry.'}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--slot4-accent)]">
          View details <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

export function EditorialPostCard({ post, href, label = 'Profile spotlight' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="group block rounded-[1.8rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-6 shadow-[0_18px_46px_rgba(94,0,6,0.06)] transition duration-300 hover:-translate-y-1">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{label}</p>
      <h3 className="mt-4 text-3xl font-semibold leading-[0.98] tracking-[-0.05em] text-[var(--slot4-page-text)]">
        {post.title || 'Untitled profile'}
      </h3>
      <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">
        {getEditableExcerpt(post, 180) || 'A text-first profile card for makers, studios, and collaborators where the written positioning matters most.'}
      </p>
      <div className="mt-6 flex items-center gap-3 text-sm text-[var(--slot4-muted-text)]">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--slot4-surface-bg)] text-[var(--slot4-accent)]">
          <UserRound className="h-5 w-5" />
        </span>
        <span>{getEditableAuthor(post)}</span>
      </div>
    </Link>
  )
}

export function ImageFirstPostCard({ post, href, badge = 'Gallery item' }: { post: SitePost; href: string; badge?: string }) {
  return (
    <Link href={href} className="group block overflow-hidden rounded-[1.65rem] border border-[var(--editable-border)] bg-[var(--slot4-dark-bg)] text-[var(--slot4-dark-text)] shadow-[0_20px_52px_rgba(37,7,5,0.2)] transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/5] overflow-hidden">
        <MediaOrPlaceholder post={post} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(37,7,5,0.85))]" />
        <span className="absolute left-4 top-4 rounded-full bg-[rgba(37,7,5,0.52)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/84 backdrop-blur">
          {badge}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="line-clamp-2 text-2xl font-semibold leading-[0.98] tracking-[-0.04em]">
            {post.title || 'Untitled visual'}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/72">
            {getEditableExcerpt(post, 95) || 'Image-led project entry.'}
          </p>
        </div>
      </div>
    </Link>
  )
}

export const EditorialFeatureCard = FeaturedPostCard
export const RailPostCard = ImageFirstPostCard
export const CompactIndexCard = CompactPostCard
export const ArticleListCard = HorizontalPostCard
