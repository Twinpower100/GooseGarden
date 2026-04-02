import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import '@/app/globals.css'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import React from 'react'

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin', 'cyrillic'], 
  weight: ['400', '500', '600'],
  variable: '--font-cormorant'
})

const montserrat = Montserrat({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat'
})

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const payload = await getPayloadHMR({ config: configPromise })
  const settings = await payload.findGlobal({ slug: 'site-settings', locale: resolvedParams.locale as any })
  
  return {
    title: {
      template: `%s | ${settings?.site_name || 'Goose Garden'}`,
      default: settings?.seo_defaults?.title || settings?.site_name || 'Goose Garden',
    },
    description: settings?.seo_defaults?.description || '',
  }
}

export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params;

  return (
    <html lang={resolvedParams.locale} className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-premium-50 text-premium-900">
        <header className="fixed top-0 w-full z-50 py-4 px-6 md:px-12 mix-blend-difference text-white flex justify-between items-center">
          <div className="font-serif text-2xl uppercase tracking-widest">Goose Garden</div>
          <nav className="flex gap-4 items-center">
            <a href={`/${resolvedParams.locale === 'ru' ? 'en' : 'ru'}`} className="text-xs tracking-widest uppercase hover:opacity-70 transition-opacity">
              {resolvedParams.locale === 'ru' ? 'EN' : 'RU'}
            </a>
            <a href="#contact" className="text-xs tracking-widest uppercase border border-white/30 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors">
              {resolvedParams.locale === 'ru' ? 'Связаться' : 'Contact'}
            </a>
          </nav>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-premium-950 text-premium-200 py-12 px-6 md:px-12 mt-24">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="font-serif text-3xl">Goose Garden</div>
            <div className="text-sm opacity-60">© {new Date().getFullYear()} Goose Garden. All rights reserved.</div>
          </div>
        </footer>
      </body>
    </html>
  )
}
