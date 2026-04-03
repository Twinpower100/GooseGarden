import type { CollectionConfig } from 'payload'

export const InquiryRequests: CollectionConfig = {
  slug: 'inquiry-requests',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'service_type', 'createdAt'],
  },
  labels: {
    singular: 'Заявка',
    plural: 'Заявки',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user), // only admin can read
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      label: 'Имя',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      label: 'Телефон',
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      required: true,
    },
    {
      name: 'preferred_contact_method',
      label: 'Предпочтительный способ связи',
      type: 'select',
      options: [
        { label: 'Email', value: 'email' },
        { label: 'Телефон', value: 'phone' },
        { label: 'Telegram', value: 'telegram' },
        { label: 'WhatsApp', value: 'whatsapp' },
      ],
      defaultValue: 'email',
    },
    {
      name: 'project_location',
      label: 'Локация проекта',
      type: 'text',
    },
    {
      name: 'service_type',
      label: 'Тип услуги',
      type: 'select',
      options: [
        { label: 'Ландшафтный дизайн', value: 'landscape_design' },
        { label: 'Озеленение и посадки', value: 'planting' },
        { label: 'Водные объекты', value: 'water_features' },
        { label: 'Мощение и террасы', value: 'paving_terraces' },
        { label: 'Уход за садом', value: 'maintenance' },
        { label: 'Консультация', value: 'consultation' },
        { label: 'Другое', value: 'other' },
      ],
    },
    {
      name: 'short_request_description',
      label: 'Краткое описание запроса',
      type: 'textarea',
      required: true,
    },
    {
      name: 'optional_comment',
      label: 'Дополнительный комментарий',
      type: 'textarea',
    },
    {
      name: 'consent_to_personal_data_processing',
      label: 'Согласие на обработку персональных данных',
      type: 'checkbox',
      required: true,
      defaultValue: true,
    },
  ],
}
