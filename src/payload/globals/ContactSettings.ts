import type { GlobalConfig } from 'payload'

export const ContactSettings: GlobalConfig = {
  slug: 'contact-settings',
  label: 'Контакты',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'email',
      label: 'Email',
      type: 'text',
    },
    {
      name: 'telegram_username',
      label: 'Telegram username',
      type: 'text',
    },
    {
      name: 'whatsapp_number',
      label: 'WhatsApp номер',
      type: 'text',
    },
    {
      name: 'message_templates',
      label: 'Шаблоны сообщений',
      type: 'group',
      fields: [
        {
          name: 'email_subject',
          label: 'Тема email',
          type: 'text',
          localized: true,
        },
        {
          name: 'email_body',
          label: 'Текст email',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'telegram_text',
          label: 'Текст для Telegram',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'whatsapp_text',
          label: 'Текст для WhatsApp',
          type: 'textarea',
          localized: true,
        },
      ]
    }
  ],
}
