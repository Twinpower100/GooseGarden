import type { CollectionConfig } from 'payload'

export const InquiryRequests: CollectionConfig = {
  slug: 'inquiry-requests',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'service_type', 'createdAt'],
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
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'email',
      type: 'text',
      required: true,
    },
    {
      name: 'preferred_contact_method',
      type: 'select',
      options: [
        { label: 'Email', value: 'email' },
        { label: 'Phone', value: 'phone' },
        { label: 'Telegram', value: 'telegram' },
        { label: 'WhatsApp', value: 'whatsapp' },
      ],
      defaultValue: 'email',
    },
    {
      name: 'project_location',
      type: 'text',
    },
    {
      name: 'service_type',
      type: 'select',
      options: [
        { label: 'Landscape Design', value: 'landscape_design' },
        { label: 'Consultation', value: 'consultation' },
        { label: 'Maintenance', value: 'maintenance' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'short_request_description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'optional_comment',
      type: 'textarea',
    },
    {
      name: 'consent_to_personal_data_processing',
      type: 'checkbox',
      required: true,
      defaultValue: true,
    },
  ],
}
