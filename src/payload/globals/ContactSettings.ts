import type { GlobalConfig } from 'payload'

export const ContactSettings: GlobalConfig = {
  slug: 'contact-settings',
  label: 'Contact Settings',
  fields: [
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'telegram_username',
      type: 'text',
    },
    {
      name: 'whatsapp_number',
      type: 'text',
    },
    {
      name: 'message_templates',
      type: 'group',
      fields: [
        {
          name: 'email_subject',
          type: 'text',
          localized: true,
        },
        {
          name: 'email_body',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'telegram_text',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'whatsapp_text',
          type: 'textarea',
          localized: true,
        },
      ]
    }
  ],
}
