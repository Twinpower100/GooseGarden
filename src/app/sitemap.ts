import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3005'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['ru', 'en']

  const routes = locales.flatMap((locale) => [
    {
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
  ])

  return routes
}
