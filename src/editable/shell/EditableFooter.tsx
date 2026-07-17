'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile')
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="border-t border-[rgba(238,217,185,0.14)] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.9fr_0.9fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-[0.95rem] border border-[rgba(238,217,185,0.14)] bg-[rgba(255,255,255,0.04)]">
                <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-full w-full object-cover" />
              </span>
              <span>
                <span className="editable-display block text-2xl font-semibold tracking-[-0.05em]">{SITE_CONFIG.name}</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent-soft)]">{globalContent.footer.tagline}</span>
              </span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--slot4-dark-text)]/74">{globalContent.footer.description}</p>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--slot4-accent-soft)]">Active lanes</h2>
            <div className="mt-5 grid gap-3">
              {taskLinks.map((task) => (
                <Link key={task.key} href={task.route} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--slot4-dark-text)]/80 transition hover:text-white">
                  {task.label} <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--slot4-accent-soft)]">Studio links</h2>
            <div className="mt-5 grid gap-3">
              {[
                ['About', '/about'],
                ['Contact', '/contact'],
                ['Search', '/search'],
                ...(session ? [['Submit', '/create']] : [['Login', '/login'], ['Join', '/signup']]),
              ].map(([label, href]) => (
                <Link key={href} href={href} className="text-sm font-medium text-[var(--slot4-dark-text)]/80 transition hover:text-white">{label}</Link>
              ))}
              {session ? (
                <button type="button" onClick={logout} className="text-left text-sm font-medium text-[var(--slot4-dark-text)]/80 transition hover:text-white">
                  Logout
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-[rgba(238,217,185,0.12)] px-4 py-5 text-center text-xs font-medium uppercase tracking-[0.18em] text-[var(--slot4-dark-text)]/54">
        © {year} {SITE_CONFIG.name}. Built for visual fabrication browsing.
      </div>
    </footer>
  )
}
