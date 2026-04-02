import type { CollectionConfig } from 'payload'

export const PortfolioProjects: CollectionConfig = {
  slug: 'portfolio-projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'is_published', 'display_order', 'show_on_homepage'],
  },
  labels: {
    singular: 'Portfolio Project',
    plural: 'Portfolio Projects'
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General Information',
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              index: true,
            },
            {
              name: 'is_published',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'display_order',
              type: 'number',
              defaultValue: 0,
            },
            {
              name: 'show_on_homepage',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'short_description',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'full_description',
              type: 'richText',
              localized: true,
            },
            {
              name: 'cover_image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ]
        },
        {
          label: 'Gallery View',
          fields: [
            {
              name: 'gallery_images',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                }
              ]
            },
            {
              name: 'enable_autoscroll',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'autoscroll_speed',
              type: 'number',
              defaultValue: 50,
              admin: {
                condition: (data, siblingData) => siblingData.enable_autoscroll
              }
            },
            {
              name: 'enable_manual_navigation',
              type: 'checkbox',
              defaultValue: true,
            },
          ]
        },
        {
          label: 'Video Options',
          fields: [
            {
              name: 'source_type',
              type: 'select',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Uploaded File', value: 'uploaded_file' },
                { label: 'External URL', value: 'external_url' }
              ],
              defaultValue: 'none',
            },
            {
              name: 'video_file',
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: (data, siblingData) => siblingData.source_type === 'uploaded_file'
              }
            },
            {
              name: 'external_video_url',
              type: 'text',
              admin: {
                condition: (data, siblingData) => siblingData.source_type === 'external_url'
              }
            },
            {
              name: 'poster_image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: (data, siblingData) => siblingData.source_type !== 'none'
              }
            },
            {
              name: 'autoplay_enabled',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                condition: (data, siblingData) => siblingData.source_type !== 'none'
              }
            },
            {
              name: 'muted',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                condition: (data, siblingData) => siblingData.source_type !== 'none'
              }
            },
            {
              name: 'loop',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                condition: (data, siblingData) => siblingData.source_type !== 'none'
              }
            },
            {
              name: 'controls',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                condition: (data, siblingData) => siblingData.source_type !== 'none'
              }
            },
            {
              name: 'playsinline',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                condition: (data, siblingData) => siblingData.source_type !== 'none'
              }
            },
          ]
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo_title',
              type: 'text',
              localized: true,
            },
            {
              name: 'seo_description',
              type: 'textarea',
              localized: true,
            },
          ]
        }
      ]
    }
  ],
}
