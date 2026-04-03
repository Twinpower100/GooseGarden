import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { ru } from '@payloadcms/translations/languages/ru'
import path from 'path'
import { fileURLToPath } from 'url'
import { Users } from './payload/collections/Users.ts'
import { Media } from './payload/collections/Media.ts'
import { PortfolioProjects } from './payload/collections/PortfolioProjects.ts'
import { InquiryRequests } from './payload/collections/InquiryRequests.ts'
import { Settings } from './payload/globals/Settings.ts'
import { ContactSettings } from './payload/globals/ContactSettings.ts'
import { SocialLinks } from './payload/globals/SocialLinks.ts'
import { HomePage } from './payload/globals/HomePage.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, PortfolioProjects, InquiryRequests],
  globals: [Settings, ContactSettings, SocialLinks, HomePage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  localization: {
    locales: [
      {
        label: 'Русский',
        code: 'ru',
      },
      {
        label: 'English',
        code: 'en',
      },
    ],
    defaultLocale: 'ru',
    fallback: true,
  },
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: {
      en,
      ru,
    },
  },
})
