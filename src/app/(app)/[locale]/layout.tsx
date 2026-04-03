import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import '@/app/globals.css'
import { SiteHeader } from '@/components/SiteHeader'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import Image from 'next/image'
import React from 'react'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-cormorant',
})

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
})

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3005'

const navItems = {
  ru: [
    { label: 'Услуги', href: '#services' },
    { label: 'Портфолио', href: '#portfolio' },
    { label: 'Процесс', href: '#process' },
    { label: 'Контакты', href: '#contact' },
  ],
  en: [
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ],
}

const footerText = {
  ru: {
    allRights: 'Все права защищены.',
    meaning:
      'Goose Garden звучит как имя о маршрутах, воде и сезонном возвращении. Мы превращаем участок в спокойный сценарий жизни, а не набор декоративных элементов.',
    cta: 'Обсудить проект',
  },
  en: {
    allRights: 'All rights reserved.',
    meaning:
      'Goose Garden is a name about routes, water, and seasonal return. We shape a site into a calm living scenario, not a collection of decorative elements.',
    cta: 'Start Your Project',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params
  const payload = await getPayload({ config: configPromise })
  const settings = await payload.findGlobal({
    slug: 'site-settings',
    locale: resolvedParams.locale as any,
  })
  const settingsTyped = settings as any

  const title = settingsTyped?.seo_defaults?.title || settingsTyped?.site_name || 'Goose Garden'
  const description =
    settingsTyped?.seo_defaults?.description || 'Premium landscape design services'
  const siteName = settingsTyped?.site_name || 'Goose Garden'

  return {
    title: {
      template: `%s | ${siteName}`,
      default: title,
    },
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}/${resolvedParams.locale}`,
      languages: {
        ru: `${SITE_URL}/ru`,
        en: `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title,
      description,
      siteName,
      locale: resolvedParams.locale === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
      url: `${SITE_URL}/${resolvedParams.locale}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale as 'ru' | 'en'
  const payload = await getPayload({ config: configPromise })

  const [settings, socialLinks] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings', locale: locale as any }),
    payload.findGlobal({ slug: 'social-links' }),
  ])

  const settingsTyped = settings as any
  const socialTyped = socialLinks as any
  const siteName = settingsTyped?.site_name || 'Goose Garden'
  const nav = navItems[locale] || navItems.en
  const footer = footerText[locale] || footerText.en

  return (
    <html lang={locale} className={`${cormorant.variable} ${montserrat.variable} scroll-smooth`}>
      <body className="min-h-screen bg-premium-50 text-premium-900 antialiased">
        <div className="site-noise" />
        <SiteHeader
          ctaLabel={footer.cta}
          locale={locale}
          navItems={nav}
          logo={
            typeof settingsTyped?.logo === 'object'
              ? {
                  alt: settingsTyped.logo.alt,
                  url: settingsTyped.logo.url,
                }
              : null
          }
          siteName={siteName}
          tagline={settingsTyped?.tagline || ''}
        />

        <main>{children}</main>

        <footer className="relative overflow-hidden border-t border-[rgba(117,124,100,0.18)] bg-[linear-gradient(180deg,rgba(40,48,37,0.98),rgba(24,28,22,1))] px-6 py-16 text-premium-100 md:px-12 md:py-20">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,205,189,0.55),transparent)]" />
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div>
                <div className="mb-3 flex items-center gap-4">
                  {typeof settingsTyped?.logo === 'object' && settingsTyped.logo?.url ? (
                    <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/12 bg-white/5 p-2">
                      <Image
                        src={settingsTyped.logo.url}
                        alt={settingsTyped.logo.alt || siteName}
                        fill
                        sizes="56px"
                        className="object-contain p-1.5"
                      />
                    </div>
                  ) : null}
                  <div className="font-serif text-3xl tracking-[0.16em] uppercase text-premium-50">
                    {siteName}
                  </div>
                </div>
                {settingsTyped?.tagline ? (
                  <div className="text-[0.72rem] uppercase tracking-[0.28em] text-[#d2cbbd]">
                    {settingsTyped.tagline}
                  </div>
                ) : null}
              </div>

              <p className="max-w-2xl text-sm leading-7 text-premium-300">{footer.meaning}</p>

              <div className="flex flex-wrap gap-3">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-white/12 px-4 py-2 text-[0.7rem] uppercase tracking-[0.24em] text-premium-200 transition-colors hover:border-[#d7d3c6] hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-5 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="text-[0.72rem] uppercase tracking-[0.28em] text-[#d7d3c6]">
                Social
              </div>

              <div className="flex flex-wrap gap-3">
                {socialTyped.facebook_url ? (
                  <a
                    href={socialTyped.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/12 px-4 py-2 text-[0.72rem] uppercase tracking-[0.24em] text-premium-200 transition-colors hover:border-[#d7d3c6] hover:text-white"
                  >
                    Facebook
                  </a>
                ) : null}
                {socialTyped.instagram_url ? (
                  <a
                    href={socialTyped.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/12 px-4 py-2 text-[0.72rem] uppercase tracking-[0.24em] text-premium-200 transition-colors hover:border-[#d7d3c6] hover:text-white"
                  >
                    Instagram
                  </a>
                ) : null}
                {socialTyped.telegram_url ? (
                  <a
                    href={socialTyped.telegram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/12 px-4 py-2 text-[0.72rem] uppercase tracking-[0.24em] text-premium-200 transition-colors hover:border-[#d7d3c6] hover:text-white"
                  >
                    Telegram
                  </a>
                ) : null}
              </div>

              <div className="border-t border-white/10 pt-5 text-xs uppercase tracking-[0.24em] text-premium-400">
                © {new Date().getFullYear()} {siteName}. {footer.allRights}
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
