import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  fields: [
    {
      name: 'hero_title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'hero_subtitle',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'hero_image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'services_title',
      type: 'text',
      localized: true,
    },
    {
      name: 'services',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        }
      ]
    },
    {
      name: 'portfolio_section_title',
      type: 'text',
      localized: true,
    },
    {
      name: 'contact_section_title',
      type: 'text',
      localized: true,
    },
    {
      name: 'contact_section_text',
      type: 'textarea',
      localized: true,
    }
  ],
}
