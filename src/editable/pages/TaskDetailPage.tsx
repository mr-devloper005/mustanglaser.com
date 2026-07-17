import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ExternalLink, Mail, Phone } from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { fetchArticleComments, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableArticleComments } from '@/editable/components/EditableArticleComments'
import { EditorialPostCard, HorizontalPostCard, ImageFirstPostCard, getEditableAuthor, getEditableCategory, getEditableDate, getEditableExcerpt, getEditablePostImage } from '@/editable/cards/PostCards'
import { taskThemeStyle } from '@/editable/theme/task-themes'

export const revalidate = 3

export async function generateEditableDetailMetadata(task: TaskKey, params: Promise<{ slug?: string; username?: string }>) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  return post ? await buildPostMetadata(task, post) : await buildTaskMetadata(task)
}

export async function EditableTaskDetailRoute({ task, params }: { task: TaskKey; params: Promise<{ slug?: string; username?: string }> }) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 7)).filter((item) => item.slug !== post.slug).slice(0, 4)
  const comments = task === 'article' ? await fetchArticleComments(post.slug, 50) : []
  return <TaskDetailView task={task} post={post} related={related} comments={comments} />
}

function getContent(post: SitePost) {
  return post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
}

function asText(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function getField(post: SitePost, keys: string[]) {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function getBody(post: SitePost) {
  const content = getContent(post)
  return asText(content.body) || asText(content.description) || asText(content.details) || post.summary || 'Details will appear here once available.'
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function safeUrl(value: string) {
  return /^https?:\/\//i.test(value) ? value : '#'
}

function linkifyMarkdown(value: string) {
  return value.replace(/\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gi, (_match, label, url) => `<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${label}</a>`)
}

function linkifyText(value: string) {
  return linkifyMarkdown(value).replace(/(^|[\s(>])((https?:\/\/)[^\s<)]+)/gi, (_match, prefix, url) => `${prefix}<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${url}</a>`)
}

function hardenLinks(html: string) {
  return html.replace(/<a\s+([^>]*href=["'][^"']+["'][^>]*)>/gi, (_match, attrs) => {
    let next = String(attrs).replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    if (!/\starget=/i.test(next)) next += ' target="_blank"'
    if (!/\srel=/i.test(next)) next += ' rel="nofollow noopener noreferrer"'
    return `<a ${next}>`
  })
}

function sanitizeHtml(html: string) {
  return hardenLinks(
    html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<(iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi, '')
      .replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
      .replace(/(href|src)=(['"])javascript:[\s\S]*?\2/gi, '$1="#"')
  )
}

function formatPlainText(raw: string) {
  const value = raw.trim()
  if (!value) return ''
  if (/<[a-z][\s\S]*>/i.test(value)) return sanitizeHtml(linkifyMarkdown(value))
  return value
    .split(/\n{2,}/)
    .map((part) => `<p>${linkifyText(escapeHtml(part).replace(/\n/g, '<br />'))}</p>`)
    .join('')
}

function getImageList(post: SitePost) {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string') : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string') : []
  const singles = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter(Boolean)
  return Array.from(new Set([...media, ...images, ...singles, getEditablePostImage(post)])).filter(Boolean)
}

function DetailMedia({ task, post, images }: { task: TaskKey; post: SitePost; images: string[] }) {
  const gallery = images.length ? images : [getEditablePostImage(post)]

  if (task !== 'image') {
    return (
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--tk-raised)]">
        <img src={gallery[0]} alt={post.title || 'Project image'} className="absolute inset-0 h-full w-full object-cover" />
      </div>
    )
  }

  if (gallery.length === 1) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--tk-raised)]">
        <img src={gallery[0]} alt={post.title || 'Project image'} className="absolute inset-0 h-full w-full object-cover" />
      </div>
    )
  }

  if (gallery.length === 2) {
    return (
      <div className="grid gap-3 p-3 sm:grid-cols-2">
        {gallery.map((image, index) => (
          <div key={`${image}-${index}`} className="relative aspect-[4/5] overflow-hidden rounded-[1.3rem] bg-[var(--tk-raised)]">
            <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-3 p-3 sm:grid-cols-2">
      {gallery.slice(0, 4).map((image, index) => (
        <div key={`${image}-${index}`} className={`relative overflow-hidden rounded-[1.3rem] bg-[var(--tk-raised)] ${index === 0 ? 'sm:col-span-2 aspect-[16/10]' : 'aspect-[4/5]'}`}>
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      ))}
    </div>
  )
}

function BodyContent({ post, compact = false }: { post: SitePost; compact?: boolean }) {
  return (
    <div
      className={`article-content mt-8 max-w-none ${compact ? 'text-[15px] leading-7' : 'text-[1.02rem] leading-8'}`}
      dangerouslySetInnerHTML={{ __html: formatPlainText(getBody(post)) }}
    />
  )
}

function DetailMetaPill({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <div className="rounded-full border border-[var(--tk-line)] bg-[var(--tk-raised)] px-4 py-2.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--tk-accent)]">{label}</span>
      <span className="ml-2 text-sm font-medium text-[var(--tk-text)]">{value}</span>
    </div>
  )
}

function BackLink({ task }: { task: TaskKey }) {
  const taskConfig = getTaskConfig(task)
  return (
    <Link href={taskConfig?.route || '/'} className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--tk-muted)] transition hover:text-[var(--tk-text)]">
      <ArrowLeft className="h-4 w-4" /> Back to {taskConfig?.label || 'entries'}
    </Link>
  )
}

function DetailActions({ website, phone, email }: { website?: string; phone?: string; email?: string }) {
  if (!website && !phone && !email) return null
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {website ? (
        <Link href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--tk-accent)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--tk-on-accent)]">
          Website <ExternalLink className="h-4 w-4" />
        </Link>
      ) : null}
      {phone ? (
        <a href={`tel:${phone}`} className="inline-flex items-center gap-2 rounded-full border border-[var(--tk-line)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em]">
          <Phone className="h-4 w-4" /> Call
        </a>
      ) : null}
      {email ? (
        <a href={`mailto:${email}`} className="inline-flex items-center gap-2 rounded-full border border-[var(--tk-line)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em]">
          <Mail className="h-4 w-4" /> Email
        </a>
      ) : null}
    </div>
  )
}

function MetadataRail({ post, task }: { post: SitePost; task: TaskKey }) {
  const location = getField(post, ['location', 'address', 'city'])
  return (
    <div className="grid gap-3">
      <div className="rounded-[1.4rem] border border-[var(--tk-line)] bg-[var(--tk-surface)] p-5 shadow-[0_14px_36px_rgba(94,0,6,0.05)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--tk-accent)]">Category</p>
        <p className="mt-2 text-sm font-medium">{getEditableCategory(post)}</p>
      </div>
      <div className="rounded-[1.4rem] border border-[var(--tk-line)] bg-[var(--tk-surface)] p-5 shadow-[0_14px_36px_rgba(94,0,6,0.05)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--tk-accent)]">Updated</p>
        <p className="mt-2 text-sm font-medium">{getEditableDate(post)}</p>
      </div>
      <div className="rounded-[1.4rem] border border-[var(--tk-line)] bg-[var(--tk-surface)] p-5 shadow-[0_14px_36px_rgba(94,0,6,0.05)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--tk-accent)]">{task === 'profile' ? 'Maker' : 'Contact cue'}</p>
        <p className="mt-2 text-sm font-medium">{location || getEditableAuthor(post)}</p>
      </div>
    </div>
  )
}

export function TaskDetailView({
  task,
  post,
  related,
  comments = [],
}: {
  task: TaskKey
  post: SitePost
  related: SitePost[]
  comments?: Array<{ id: string; name: string; comment: string; createdAt: string }>
}) {
  const images = getImageList(post)
  const website = getField(post, ['website', 'url'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const location = getField(post, ['location', 'address', 'city'])
  const intro = getEditableExcerpt(post, 220)

  return (
    <EditableSiteShell>
      <main style={taskThemeStyle(task)} className="min-h-screen bg-[var(--tk-bg)] text-[var(--tk-text)]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <BackLink task={task} />
          <div className="mt-6 overflow-hidden rounded-[2.2rem] border border-[var(--tk-line)] bg-[var(--tk-surface)] shadow-[0_26px_70px_rgba(94,0,6,0.08)]">
            <div className="grid gap-0 xl:grid-cols-[1.08fr_0.92fr]">
              <div className="min-w-0 border-b border-[var(--tk-line)] xl:border-b-0 xl:border-r">
                <DetailMedia task={task} post={post} images={images} />
              </div>
              <aside className="min-w-0 p-6 sm:p-8 lg:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--tk-accent)]">{getEditableCategory(post)}</p>
                <h1 className="editable-display mt-4 text-4xl font-semibold leading-[0.94] tracking-[-0.07em] sm:text-5xl lg:text-6xl">{post.title || 'Untitled entry'}</h1>
                <p className="mt-4 text-sm font-medium uppercase tracking-[0.16em] text-[var(--tk-muted)]">{getEditableAuthor(post)}</p>
                {intro ? <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--tk-muted)]">{intro}</p> : null}
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <DetailMetaPill label="Updated" value={getEditableDate(post)} />
                  <DetailMetaPill label="Maker" value={location || getEditableAuthor(post)} />
                </div>
                <DetailActions website={website} phone={phone} email={email} />
              </aside>
            </div>
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
            <article className="min-w-0 self-start rounded-[2rem] border border-[var(--tk-line)] bg-[var(--tk-surface)] p-6 shadow-[0_24px_60px_rgba(94,0,6,0.08)] sm:p-8 lg:p-10">
              <BodyContent post={post} compact={task === 'image'} />
              {task === 'article' ? <EditableArticleComments slug={post.slug} comments={comments} /> : null}
            </article>

            <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
              <MetadataRail post={post} task={task} />
              {related.length ? <RelatedPanel task={task} related={related} /> : null}
            </aside>
          </div>
        </section>

        {related.length ? <RelatedStrip task={task} related={related} /> : null}
      </main>
    </EditableSiteShell>
  )
}

function RelatedPanel({ task, related }: { task: TaskKey; related: SitePost[] }) {
  return (
    <div className="rounded-[1.8rem] border border-[var(--tk-line)] bg-[var(--tk-surface)] p-5 shadow-[0_18px_50px_rgba(94,0,6,0.06)]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="editable-display text-xl font-semibold tracking-[-0.04em]">More like this</h2>
        <Link href={getTaskConfig(task)?.route || '/'} className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--tk-accent)]">
          View all
        </Link>
      </div>
      <div className="mt-4 grid gap-3">
        {related.slice(0, 3).map((item) => (
          <SidebarRelatedCard key={item.id || item.slug} task={task} post={item} />
        ))}
      </div>
    </div>
  )
}

function SidebarRelatedCard({ task, post }: { task: TaskKey; post: SitePost }) {
  const href = `${getTaskConfig(task)?.route || `/${task}`}/${post.slug}`
  const image = getImageList(post)[0] || getEditablePostImage(post)

  return (
    <Link href={href} className="group block overflow-hidden rounded-[1.25rem] border border-[var(--tk-line)] bg-[var(--tk-raised)] transition duration-300 hover:-translate-y-0.5">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--tk-raised)]">
        <img src={image} alt={post.title || 'Related image'} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-3.5">
        <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-[var(--tk-text)]">{post.title || 'Untitled entry'}</h3>
      </div>
    </Link>
  )
}

function RelatedStrip({ task, related }: { task: TaskKey; related: SitePost[] }) {
  return (
    <section className="border-t border-[var(--tk-line)] bg-[var(--tk-surface)]/55">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <h2 className="editable-display text-3xl font-semibold tracking-[-0.05em]">Related entries</h2>
          <Link href={getTaskConfig(task)?.route || '/'} className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--tk-accent)]">
            Browse all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item) =>
            task === 'profile' ? (
              <EditorialPostCard key={item.id || item.slug} post={item} href={`${getTaskConfig(task)?.route || `/${task}`}/${item.slug}`} label="Related profile" />
            ) : task === 'image' ? (
              <ImageFirstPostCard key={item.id || item.slug} post={item} href={`${getTaskConfig(task)?.route || `/${task}`}/${item.slug}`} badge="Related visual" />
            ) : (
              <HorizontalPostCard key={item.id || item.slug} post={item} href={`${getTaskConfig(task)?.route || `/${task}`}/${item.slug}`} index={0} />
            )
          )}
        </div>
      </div>
    </section>
  )
}
