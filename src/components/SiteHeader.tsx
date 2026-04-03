'use client'

import clsx from 'clsx'
import * as motion from 'motion/react-client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type NavItem = {
  href: string
  label: string
}

type SiteHeaderProps = {
  ctaLabel: string
  locale: 'ru' | 'en'
  navItems: NavItem[]
  siteName: string
  tagline?: string
  logo?: {
    alt?: string
    url?: string
  } | null
}

export function SiteHeader({
  ctaLabel,
  locale,
  navItems,
  siteName,
  tagline,
  logo,
}: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 24)
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5"
    >
      <div
        className={clsx(
          'mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[28px] border px-4 py-3 transition-all duration-500 md:px-6',
          isScrolled
            ? 'border-[#d3cec2]/80 bg-[rgba(244,240,232,0.9)] text-premium-950 shadow-[0_18px_48px_rgba(28,31,24,0.14)] backdrop-blur-xl'
            : 'border-white/15 bg-[rgba(18,22,18,0.28)] text-white shadow-[0_12px_40px_rgba(8,12,8,0.24)] backdrop-blur-md',
        )}
      >
        <a href={`/${locale}`} className="min-w-0">
          <div className="flex items-center gap-3">
            {logo?.url ? (
              <span
                className={clsx(
                  'relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border p-1',
                  isScrolled ? 'border-premium-300 bg-white/75' : 'border-white/20 bg-white/8',
                )}
              >
                <Image
                  src={logo.url}
                  alt={logo.alt || siteName}
                  fill
                  className="object-contain p-1.5"
                  sizes="44px"
                />
              </span>
            ) : (
              <span
                className={clsx(
                  'grid h-11 w-11 place-items-center rounded-full border text-[0.68rem] font-semibold uppercase tracking-[0.28em]',
                  isScrolled ? 'border-premium-300 bg-white/60' : 'border-white/20 bg-white/8',
                )}
              >
                GG
              </span>
            )}
            <div className="min-w-0">
              <div className="font-serif text-lg tracking-[0.18em] uppercase md:text-xl">
                {siteName}
              </div>
              {tagline ? (
                <div
                  className={clsx(
                    'truncate text-[0.65rem] uppercase tracking-[0.24em]',
                    isScrolled ? 'text-premium-600' : 'text-white/70',
                  )}
                >
                  {tagline}
                </div>
              ) : null}
            </div>
          </div>
        </a>

        <div className="flex min-w-0 items-center gap-2 md:gap-3">
          <nav className="hidden items-center gap-1 rounded-full border px-2 py-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={clsx(
                  'rounded-full px-4 py-2 text-[0.68rem] uppercase tracking-[0.24em] transition-colors',
                  isScrolled
                    ? 'text-premium-700 hover:bg-premium-950 hover:text-premium-50'
                    : 'text-white/78 hover:bg-white/12 hover:text-white',
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={`/${locale === 'ru' ? 'en' : 'ru'}`}
            className={clsx(
              'rounded-full border px-3 py-2 text-[0.68rem] uppercase tracking-[0.24em] transition-colors',
              isScrolled
                ? 'border-premium-300 text-premium-700 hover:bg-premium-950 hover:text-premium-50'
                : 'border-white/18 text-white/82 hover:bg-white/12 hover:text-white',
            )}
          >
            {locale === 'ru' ? 'EN' : 'RU'}
          </a>

          <a
            href="#contact"
            className={clsx(
              'rounded-full px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.24em] transition-all md:px-5',
              isScrolled
                ? 'bg-premium-950 text-premium-50 hover:bg-[#596147]'
                : 'bg-[#d7d3c6] text-premium-950 hover:bg-white',
            )}
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </motion.header>
  )
}
