import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Настройки сайта',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'site_name',
      label: 'Название сайта',
      type: 'text',
      localized: true,
      defaultValue: 'Goose Garden',
      required: true,
    },
    {
      name: 'tagline',
      label: 'Тэглайн',
      type: 'text',
      localized: true,
    },
    {
      name: 'logo',
      label: 'Логотип',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'seo_defaults',
      label: 'SEO по умолчанию',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          localized: true,
        },
      ]
    }
  ],
}
