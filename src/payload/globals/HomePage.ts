import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Главная страница',
  access: {
    read: () => true,
  },
  fields: [
    // ─── Hero ─────────────────────────────
    {
      type: 'collapsible',
      label: 'Hero',
      fields: [
        {
          name: 'hero_title',
          label: 'Заголовок hero',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'hero_subtitle',
          label: 'Подзаголовок hero',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'hero_cta_text',
          label: 'Текст кнопки hero',
          type: 'text',
          localized: true,
          defaultValue: 'Обсудить проект',
        },
        {
          name: 'hero_image',
          label: 'Изображение hero',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },

    // ─── About ────────────────────────────
    {
      type: 'collapsible',
      label: 'О проекте',
      fields: [
        {
          name: 'about_title',
          label: 'Заголовок блока',
          type: 'text',
          localized: true,
        },
        {
          name: 'about_text',
          label: 'Текст блока',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'about_image',
          label: 'Изображение блока',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },

    // ─── Services ─────────────────────────
    {
      type: 'collapsible',
      label: 'Услуги',
      fields: [
        {
          name: 'services_title',
          label: 'Заголовок секции',
          type: 'text',
          localized: true,
        },
        {
          name: 'services_intro',
          label: 'Вступительный текст',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'services',
          label: 'Список услуг',
          type: 'array',
          labels: {
            singular: 'Услуга',
            plural: 'Услуги',
          },
          fields: [
            {
              name: 'title',
              label: 'Название',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'description',
              label: 'Описание',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'icon',
              label: 'Иконка',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },

    // ─── Portfolio ─────────────────────────
    {
      type: 'collapsible',
      label: 'Портфолио',
      fields: [
        {
          name: 'portfolio_section_title',
          label: 'Заголовок секции',
          type: 'text',
          localized: true,
        },
        {
          name: 'portfolio_section_intro',
          label: 'Вступительный текст',
          type: 'textarea',
          localized: true,
        },
      ],
    },

    // ─── Process ──────────────────────────
    {
      type: 'collapsible',
      label: 'Процесс работы',
      fields: [
        {
          name: 'process_title',
          label: 'Заголовок секции',
          type: 'text',
          localized: true,
        },
        {
          name: 'process_intro',
          label: 'Вступительный текст',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'process_steps',
          label: 'Шаги процесса',
          type: 'array',
          labels: {
            singular: 'Шаг',
            plural: 'Шаги',
          },
          fields: [
            {
              name: 'step_number',
              label: 'Номер шага',
              type: 'text',
            },
            {
              name: 'title',
              label: 'Название шага',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'description',
              label: 'Описание шага',
              type: 'textarea',
              localized: true,
            },
          ],
        },
      ],
    },

    // ─── CTA ──────────────────────────────
    {
      type: 'collapsible',
      label: 'CTA',
      fields: [
        {
          name: 'cta_title',
          label: 'Заголовок CTA',
          type: 'text',
          localized: true,
        },
        {
          name: 'cta_text',
          label: 'Текст CTA',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'cta_button_text',
          label: 'Текст кнопки CTA',
          type: 'text',
          localized: true,
          defaultValue: 'Оставить заявку',
        },
      ],
    },

    // ─── Contact ──────────────────────────
    {
      type: 'collapsible',
      label: 'Контактная секция',
      fields: [
        {
          name: 'contact_section_title',
          label: 'Заголовок секции',
          type: 'text',
          localized: true,
        },
        {
          name: 'contact_section_text',
          label: 'Текст секции',
          type: 'textarea',
          localized: true,
        },
      ],
    },
  ],
}
