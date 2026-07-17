'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, LogIn, Menu, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const visibleTasks = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile')
  const navItems = useMemo(
    () => [{ label: 'Home', href: '/' }, ...visibleTasks.map((task) => ({ label: task.label, href: task.route })), { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }],
    [visibleTasks]
  )

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)] backdrop-blur-xl">
      <div className="h-[3px] bg-[linear-gradient(90deg,var(--slot4-accent),var(--slot4-accent-fill),var(--slot4-accent))]" />
      <nav className="mx-auto flex min-h-[84px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-4" onClick={() => setOpen(false)}>
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-[0.95rem] border border-[var(--editable-border)] bg-[var(--slot4-dark-bg)] text-[var(--slot4-dark-text)] shadow-[0_12px_30px_rgba(37,7,5,0.18)]">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-full w-full object-cover" />
          </span>
          <span className="editable-display block min-w-0 truncate text-xl font-semibold tracking-[-0.05em] sm:text-2xl">{SITE_CONFIG.name}</span>
        </Link>

        <div className="ml-4 hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition ${
                  active
                    ? 'bg-[var(--slot4-accent)] text-[var(--slot4-on-accent)]'
                    : 'text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-panel-bg)] hover:text-[var(--slot4-page-text)]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <form action="/search" className="ml-auto hidden min-w-0 flex-1 justify-center xl:flex">
          <label className="flex w-full max-w-md items-center gap-3 rounded-full border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-4 py-3 shadow-[0_12px_28px_rgba(94,0,6,0.06)]">
            <Search className="h-4 w-4 shrink-0 text-[var(--slot4-accent)]" />
            <input
              name="q"
              type="search"
              placeholder="Search projects or makers"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-[var(--slot4-soft-muted-text)]"
            />
          </label>
        </form>

        <div className="ml-auto flex items-center gap-2">
          {session ? (
            <>
              <Link href="/create" className="hidden rounded-full bg-[var(--slot4-accent-fill)] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--slot4-on-accent)] transition hover:-translate-y-0.5 sm:inline-flex">
                Submit
              </Link>
              <button type="button" onClick={logout} className="hidden rounded-full border border-[var(--editable-border)] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] sm:inline-flex">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden items-center gap-2 rounded-full border border-[var(--editable-border)] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--slot4-muted-text)] transition hover:bg-[var(--slot4-panel-bg)] sm:inline-flex">
                <LogIn className="h-3.5 w-3.5" /> Login
              </Link>
              <Link href="/signup" className="hidden items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--slot4-on-accent)] transition hover:-translate-y-0.5 sm:inline-flex">
                <UserPlus className="h-3.5 w-3.5" /> Join
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-5 lg:hidden">
          <form action="/search" className="mb-4">
            <label className="flex items-center gap-3 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-3">
              <Search className="h-4 w-4 text-[var(--slot4-accent)]" />
              <input name="q" placeholder="Search projects or makers" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
            </label>
          </form>
          <div className="grid gap-2">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-[1rem] border px-4 py-3 text-sm font-semibold ${
                    active
                      ? 'border-[var(--slot4-accent)] bg-[var(--slot4-accent)] text-[var(--slot4-on-accent)]'
                      : 'border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] text-[var(--slot4-page-text)]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )
            })}
            {session ? (
              <button type="button" onClick={logout} className="rounded-[1rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-3 text-left text-sm font-semibold text-[var(--slot4-page-text)]">
                Logout
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
