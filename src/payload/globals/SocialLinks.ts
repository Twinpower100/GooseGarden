import type { GlobalConfig } from 'payload'

export const SocialLinks: GlobalConfig = {
  slug: 'social-links',
  label: 'Социальные сети',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'facebook_url',
      label: 'Facebook URL',
      type: 'text',
    },
    {
      name: 'instagram_url',
      label: 'Instagram URL',
      type: 'text',
    },
    {
      name: 'telegram_url',
      label: 'Telegram URL',
      type: 'text',
    },
  ],
}
