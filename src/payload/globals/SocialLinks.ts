import type { GlobalConfig } from 'payload'

export const SocialLinks: GlobalConfig = {
  slug: 'social-links',
  label: 'Social Links',
  fields: [
    {
      name: 'facebook_url',
      type: 'text',
    },
    {
      name: 'instagram_url',
      type: 'text',
    },
    {
      name: 'telegram_url',
      type: 'text',
    },
  ],
}
