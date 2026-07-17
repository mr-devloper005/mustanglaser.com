import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { TaskEmptyState } from '@/editable/components/EmptyStates'
import { CompactPostCard, EditorialPostCard, HorizontalPostCard, ImageFirstPostCard, postHref } from '@/editable/cards/PostCards'
import { getTaskTheme, taskThemeStyle } from '@/editable/theme/task-themes'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({
  task,
  posts,
  pagination,
  category,
  basePath,
}: {
  task: TaskKey
  posts: SitePost[]
  pagination: SiteFeedPagination
  category: string
  basePath: string
}) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const theme = getTaskTheme(task)
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category
  const lead = posts[0]
  const rest = posts.slice(1)
  const introCards = task === 'profile' ? rest.slice(0, 3) : rest.slice(0, 4)
  const listCards = task === 'profile' ? rest.slice(3) : rest.slice(4)

  return (
    <EditableSiteShell>
      <main style={taskThemeStyle(task)} className="min-h-screen bg-[var(--tk-bg)] text-[var(--tk-text)]">
        <header className="border-b border-[var(--tk-line)]">
          <div className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="rounded-[2.2rem] border border-[var(--tk-line)] bg-[var(--tk-surface)] p-6 shadow-[0_24px_60px_rgba(94,0,6,0.08)] sm:p-8 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--tk-accent)]">{voice?.eyebrow || theme.kicker}</p>
                <h1 className="editable-display mt-4 max-w-4xl text-4xl font-semibold leading-[0.92] tracking-[-0.07em] sm:text-5xl lg:text-6xl">
                  {voice?.headline || `Browse ${label}`}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--tk-muted)]">{voice?.description || theme.note}</p>
                {voice?.chips?.length ? (
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {voice.chips.map((chip) => (
                      <span key={chip} className="rounded-full border border-[var(--tk-line)] bg-[var(--tk-raised)] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--tk-muted)]">
                        {chip}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="mt-6 rounded-[1.8rem] border border-[var(--tk-line)] bg-[var(--tk-raised)] p-5 lg:mt-0">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--tk-accent)]">Filter lane</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--tk-muted)]">
                      <span className="font-semibold text-[var(--tk-text)]">{posts.length}</span> {posts.length === 1 ? 'entry' : 'entries'} in {categoryLabel}
                    </p>
                  </div>
                  <Link href="/search" className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--tk-accent)]">
                    Search site
                  </Link>
                </div>
                <form action={basePath} className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <div className="relative min-w-0 flex-1">
                    <select
                      name="category"
                      defaultValue={category}
                      className="h-12 w-full appearance-none rounded-full border border-[var(--tk-line)] bg-[var(--tk-surface)] pl-4 pr-10 text-sm font-medium text-[var(--tk-text)] outline-none transition focus:border-[var(--tk-accent)]"
                      aria-label={voice?.filterLabel || 'Filter category'}
                    >
                      <option value="all">All categories</option>
                      {CATEGORY_OPTIONS.map((item) => (
                        <option key={item.slug} value={item.slug}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--tk-muted)]" />
                  </div>
                  <button className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--tk-accent)] px-5 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--tk-on-accent)] transition hover:-translate-y-0.5">
                    Apply
                  </button>
                </form>
              </div>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          {posts.length ? (
            <>
              {lead ? <LeadBlock task={task} post={lead} basePath={basePath} /> : null}
              {introCards.length ? <IntroGrid task={task} posts={introCards} basePath={basePath} /> : null}
              {listCards.length ? <ListGrid task={task} posts={listCards} basePath={basePath} startIndex={1 + introCards.length} /> : null}
            </>
          ) : (
            <TaskEmptyState taskLabel={label.toLowerCase()} />
          )}

          {posts.length ? (
            <nav className="mt-12 flex flex-wrap items-center justify-center gap-3 text-sm">
              {pagination.hasPrevPage ? (
                <Link href={pageHref(basePath, category, page - 1)} className="rounded-full border border-[var(--tk-line)] bg-[var(--tk-surface)] px-5 py-3 font-semibold transition hover:border-[var(--tk-accent)]">
                  Previous
                </Link>
              ) : null}
              <span className="rounded-full border border-[var(--tk-line)] bg-[var(--tk-raised)] px-5 py-3 font-semibold text-[var(--tk-muted)]">
                Page {page} of {pagination.totalPages || 1}
              </span>
              {pagination.hasNextPage ? (
                <Link href={pageHref(basePath, category, page + 1)} className="rounded-full border border-[var(--tk-line)] bg-[var(--tk-surface)] px-5 py-3 font-semibold transition hover:border-[var(--tk-accent)]">
                  Next
                </Link>
              ) : null}
            </nav>
          ) : null}
        </section>
      </main>
    </EditableSiteShell>
  )
}

function LeadBlock({ task, post, basePath }: { task: TaskKey; post: SitePost; basePath: string }) {
  if (task === 'image') {
    return (
      <div className="mb-6">
        <ImageFirstPostCard post={post} href={postHref(task, post, basePath)} badge="Lead visual" />
      </div>
    )
  }
  return (
    <div className="mb-6">
      <HorizontalPostCard post={post} href={postHref(task, post, basePath)} index={0} />
    </div>
  )
}

function IntroGrid({ task, posts, basePath }: { task: TaskKey; posts: SitePost[]; basePath: string }) {
  if (!posts.length) return null
  if (task === 'profile') {
    return (
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <EditorialPostCard key={post.id || post.slug} post={post} href={postHref(task, post, basePath)} label="Maker profile" />
        ))}
      </div>
    )
  }
  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {posts.map((post) => (
        <CompactPostCard key={post.id || post.slug} post={post} href={postHref(task, post, basePath)} index={0} />
      ))}
    </div>
  )
}

function ListGrid({ task, posts, basePath, startIndex }: { task: TaskKey; posts: SitePost[]; basePath: string; startIndex: number }) {
  if (!posts.length) return null
  if (task === 'image' || task === 'pdf' || task === 'classified') {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => (
          <ImageFirstPostCard key={post.id || post.slug} post={post} href={postHref(task, post, basePath)} badge="Gallery item" />
        ))}
      </div>
    )
  }

  if (task === 'profile') {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        {posts.map((post) => (
          <HorizontalPostCard key={post.id || post.slug} post={post} href={postHref(task, post, basePath)} index={0} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {posts.map((post, index) => (
        <HorizontalPostCard key={post.id || post.slug} post={post} href={postHref(task, post, basePath)} index={startIndex + index} />
      ))}
    </div>
  )
}
