import nodemailer from 'nodemailer'

interface InquiryData {
  name: string
  email: string
  phone?: string
  service_type?: string
  preferred_contact_method?: string
  project_location?: string
  short_request_description: string
  optional_comment?: string
}

export async function sendEmailNotification(data: InquiryData): Promise<void> {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT, NOTIFICATION_EMAIL } = process.env

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  const html = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <h2 style="color: #232520; border-bottom: 2px solid #c7bcb0; padding-bottom: 12px;">
        Новая заявка с сайта Goose Garden
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr><td style="padding: 8px 0; color: #7c7e76; width: 180px;">Имя</td><td style="padding: 8px 0;">${data.name}</td></tr>
        <tr><td style="padding: 8px 0; color: #7c7e76;">Email</td><td style="padding: 8px 0;">${data.email}</td></tr>
        ${data.phone ? `<tr><td style="padding: 8px 0; color: #7c7e76;">Телефон</td><td style="padding: 8px 0;">${data.phone}</td></tr>` : ''}
        ${data.preferred_contact_method ? `<tr><td style="padding: 8px 0; color: #7c7e76;">Предпочитаемый способ связи</td><td style="padding: 8px 0;">${data.preferred_contact_method}</td></tr>` : ''}
        ${data.service_type ? `<tr><td style="padding: 8px 0; color: #7c7e76;">Тип услуги</td><td style="padding: 8px 0;">${data.service_type}</td></tr>` : ''}
        ${data.project_location ? `<tr><td style="padding: 8px 0; color: #7c7e76;">Локация проекта</td><td style="padding: 8px 0;">${data.project_location}</td></tr>` : ''}
        <tr><td style="padding: 8px 0; color: #7c7e76; vertical-align: top;">Описание</td><td style="padding: 8px 0;">${data.short_request_description}</td></tr>
        ${data.optional_comment ? `<tr><td style="padding: 8px 0; color: #7c7e76; vertical-align: top;">Комментарий</td><td style="padding: 8px 0;">${data.optional_comment}</td></tr>` : ''}
      </table>
      <p style="color: #a89a8f; font-size: 12px; margin-top: 30px;">© Goose Garden — Автоматическое уведомление</p>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"Goose Garden" <${SMTP_USER}>`,
      to: NOTIFICATION_EMAIL || SMTP_USER,
      subject: `Новая заявка от ${data.name} — ${data.service_type || 'Общий запрос'}`,
      html,
    })
  } catch (err) {
    console.error('[Notification] Email send failed:', err)
  }
}

export async function sendTelegramNotification(data: InquiryData): Promise<void> {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return

  const lines = [
    `🌿 <b>Новая заявка с сайта</b>`,
    ``,
    `👤 <b>Имя:</b> ${escapeHtml(data.name)}`,
    `📧 <b>Email:</b> ${escapeHtml(data.email)}`,
  ]

  if (data.phone) lines.push(`📞 <b>Телефон:</b> ${escapeHtml(data.phone)}`)
  if (data.preferred_contact_method) lines.push(`💬 <b>Способ связи:</b> ${escapeHtml(data.preferred_contact_method)}`)
  if (data.service_type) lines.push(`🛠 <b>Услуга:</b> ${escapeHtml(data.service_type)}`)
  if (data.project_location) lines.push(`📍 <b>Локация:</b> ${escapeHtml(data.project_location)}`)
  lines.push(``, `📝 <b>Описание:</b>`, escapeHtml(data.short_request_description))
  if (data.optional_comment) lines.push(``, `💭 <b>Комментарий:</b>`, escapeHtml(data.optional_comment))

  const text = lines.join('\n')

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'HTML',
      }),
    })
  } catch (err) {
    console.error('[Notification] Telegram send failed:', err)
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
