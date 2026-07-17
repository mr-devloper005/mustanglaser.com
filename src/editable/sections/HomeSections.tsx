import Link from 'next/link'
import { ArrowRight, Grid2X2, Image as ImageIcon, Layers3, UserRound } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import {
  CompactPostCard,
  EditorialPostCard,
  FeaturedPostCard,
  HorizontalPostCard,
  ImageFirstPostCard,
  getEditableCategory,
  getEditablePostImage,
  postHref,
} from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function activeLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function latestImagePool(posts: SitePost[], max = 6) {
  return posts
    .map((post) => getEditablePostImage(post))
    .filter((value, index, array) => Boolean(value) && array.indexOf(value) === index)
    .slice(0, max)
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const hero = pool[0]
  const side = pool.slice(1, 4)
  const heroImages = latestImagePool(pool)

  return (
    <section className="border-b border-[var(--editable-border)] bg-[var(--slot4-page-bg)]">
      <div className={`grid gap-6 py-8 sm:py-10 lg:grid-cols-[1.12fr_0.88fr] lg:py-12 ${container}`}>
        <div className="min-w-0">
          <div className="rounded-[2.1rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-5 shadow-[0_18px_48px_rgba(94,0,6,0.08)] sm:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.home.hero.badge}</p>
            <h1 className="editable-display mt-4 max-w-4xl text-5xl font-semibold leading-[0.9] tracking-[-0.08em] text-[var(--slot4-page-text)] sm:text-6xl lg:text-[5.8rem]">
              {pagesContent.home.hero.title.join(' ')}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.home.hero.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={pagesContent.home.hero.primaryCta.href} className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--slot4-on-accent)]">
                {pagesContent.home.hero.primaryCta.label} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={pagesContent.home.hero.secondaryCta.href} className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--slot4-page-text)]">
                {pagesContent.home.hero.secondaryCta.label}
              </Link>
            </div>
            <div className="mt-8 border-t border-[var(--editable-border)] pt-5">
              {heroImages.length ? (
                <div className="grid grid-cols-3 gap-3">
                  {heroImages.slice(0, 3).map((image, index) => (
                    <div key={`${image}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem] bg-[var(--slot4-media-bg)]">
                      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
              <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--slot4-muted-text)]">
                Browse by lane to see recent builds, visual details, and the makers behind the work.
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 space-y-4">
          {hero ? <FeaturedPostCard post={hero} href={postHref(primaryTask, hero, primaryRoute)} label={pagesContent.home.hero.featureCardBadge} /> : null}
          {side.length ? (
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {side.map((post) => (
                <ImageFirstPostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} badge={getEditableCategory(post)} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)]).slice(1, 7)
  if (!pool.length) return null

  return (
    <section className="bg-[var(--slot4-surface-bg)]">
      <div className={`py-12 sm:py-14 ${container}`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">Quick browse</p>
            <h2 className="editable-display mt-2 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">Small-format highlights from the latest work.</h2>
          </div>
          <Link href={primaryRoute} className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--slot4-accent)]">
            See all {activeLabel(primaryTask).toLowerCase()} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-7 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[1.8rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{pagesContent.home.intro.sideBadge}</p>
            <div className="mt-5 grid gap-3">
              {pagesContent.home.intro.sidePoints.map((point, index) => (
                <div key={point} className="flex gap-3 rounded-[1.2rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-xs font-semibold text-[var(--slot4-on-accent)]">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-[var(--slot4-muted-text)]">{point}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {pool.map((post, index) => (
              <CompactPostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function HomeMosaicCard({ icon: Icon, title, body }: { icon: typeof ImageIcon; title: string; body: string }) {
  return (
    <div className="rounded-[1.5rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-5 shadow-[0_14px_34px_rgba(94,0,6,0.05)]">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="editable-display mt-4 text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{body}</p>
    </div>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  if (!pool.length) return null
  const lead = pool[1] || pool[0]
  const horizontal = pool.slice(2, 5)
  const editorial = pool.slice(5, 8)

  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`py-12 sm:py-16 ${container}`}>
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            {lead ? <FeaturedPostCard post={lead} href={postHref(primaryTask, lead, primaryRoute)} label={pagesContent.home.hero.focusLabel} /> : null}
            <div className="grid gap-4 sm:grid-cols-3">
              <HomeMosaicCard icon={Grid2X2} title="Gallery-led" body="Large project imagery sets the visual tone of the homepage." />
              <HomeMosaicCard icon={UserRound} title="Profile-aware" body="Maker pages are treated as useful capability snapshots, not filler bios." />
              <HomeMosaicCard icon={Layers3} title="Modular rhythm" body="Different card silhouettes help the feed feel curated rather than repetitive." />
            </div>
          </div>
          <div className="space-y-4">
            {horizontal.map((post, index) => (
              <HorizontalPostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
            ))}
          </div>
        </div>
        {editorial.length ? (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {editorial.map((post) => (
              <EditorialPostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'Fresh builds', title: 'New additions this week' },
  browse: { eyebrow: 'Popular picks', title: 'Projects getting the most attention' },
  index: { eyebrow: 'Archive wall', title: 'Older entries still worth a close look' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, index) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore' }
        return (
          <section key={section.key} className={index % 2 === 0 ? 'bg-[var(--slot4-surface-bg)]' : 'bg-[var(--slot4-page-bg)]'}>
            <div className={`py-12 sm:py-14 ${container}`}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{copy.eyebrow}</p>
                  <h2 className="editable-display mt-2 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">{copy.title}</h2>
                </div>
                <Link href={section.href || primaryRoute} className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--slot4-accent)]">
                  View lane <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {section.posts.slice(0, 8).map((post) => (
                  <ImageFirstPostCard
                    key={post.id || post.slug}
                    post={post}
                    href={postHref(primaryTask, post, primaryRoute)}
                    badge={getEditableCategory(post)}
                  />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-app" className="bg-[var(--slot4-dark-bg)] text-[var(--slot4-dark-text)]">
      <div className={`py-16 text-center sm:py-20 ${container}`}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent-soft)]">{pagesContent.home.cta.badge}</p>
        <h2 className="editable-display mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
          {pagesContent.home.cta.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/72">{pagesContent.home.cta.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={pagesContent.home.cta.primaryCta.href} className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--slot4-on-accent)]">
            {pagesContent.home.cta.primaryCta.label}
          </Link>
          <Link href={pagesContent.home.cta.secondaryCta.href} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white">
            {pagesContent.home.cta.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
