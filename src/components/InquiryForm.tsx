'use client'

import { useState, useRef, useEffect } from 'react'
import * as motion from 'motion/react-client'

const translations = {
  ru: {
    name: 'Имя',
    email: 'Email',
    phone: 'Телефон',
    preferred_contact: 'Предпочитаемый способ связи',
    project_location: 'Локация проекта',
    service_type: 'Тип услуги',
    description: 'Описание проекта',
    optional_comment: 'Дополнительный комментарий',
    consent: 'Я согласен на обработку персональных данных',
    submit: 'Отправить запрос',
    submitting: 'Отправка...',
    success_title: 'Спасибо за заявку!',
    success_text: 'Мы свяжемся с вами в ближайшее время.',
    error_text: 'Произошла ошибка. Попробуйте еще раз.',
    rate_limit: 'Слишком много запросов. Подождите немного.',
    contact_email: 'Email',
    contact_phone: 'Телефон',
    contact_telegram: 'Telegram',
    contact_whatsapp: 'WhatsApp',
    landscape_design: 'Ландшафтный дизайн',
    water_features: 'Водные объекты',
    paving_terraces: 'Мощение и террасы',
    consultation: 'Консультация',
    maintenance: 'Уход за садом',
    planting: 'Озеленение',
    other: 'Другое',
  },
  en: {
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    preferred_contact: 'Preferred contact method',
    project_location: 'Project location',
    service_type: 'Service type',
    description: 'Project description',
    optional_comment: 'Additional comments',
    consent: 'I consent to the processing of personal data',
    submit: 'Submit Request',
    submitting: 'Submitting...',
    success_title: 'Thank you for your request!',
    success_text: 'We will get back to you shortly.',
    error_text: 'An error occurred. Please try again.',
    rate_limit: 'Too many requests. Please wait.',
    contact_email: 'Email',
    contact_phone: 'Phone',
    contact_telegram: 'Telegram',
    contact_whatsapp: 'WhatsApp',
    landscape_design: 'Landscape Design',
    water_features: 'Water Features',
    paving_terraces: 'Paving & Terraces',
    consultation: 'Consultation',
    maintenance: 'Maintenance',
    planting: 'Planting & Greening',
    other: 'Other',
  },
}

const inputClass =
  'w-full bg-transparent border-b border-premium-600/50 focus:border-accent py-3 outline-none transition-colors duration-300 placeholder:text-premium-500/40'

const selectClass =
  'w-full bg-transparent border-b border-premium-600/50 focus:border-accent py-3 outline-none transition-colors duration-300 [&>option]:bg-premium-900 [&>option]:text-premium-100'

export function InquiryForm({ locale }: { locale: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'rate_limited'>('idle')
  const formRenderedAt = useRef(Date.now())
  const t = translations[locale as keyof typeof translations] || translations.en

  // Reset rendered-at on mount
  useEffect(() => {
    formRenderedAt.current = Date.now()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.currentTarget)
    const data: Record<string, string | boolean> = {}

    formData.forEach((value, key) => {
      data[key] = value as string
    })

    // Add anti-bot timing
    data._form_rendered_at = String(formRenderedAt.current)

    // Convert consent checkbox
    data.consent_to_personal_data_processing = formData.has('consent_to_personal_data_processing')
      ? 'true'
      : 'false'

    try {
      const res = await fetch('/api/submit-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.status === 429) {
        setStatus('rate_limited')
        return
      }

      if (res.ok) {
        setStatus('success')
        ;(e.target as HTMLFormElement).reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="py-16 text-center"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-accent flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-3xl font-serif mb-3">{t.success_title}</h3>
        <p className="opacity-60 font-light">{t.success_text}</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" id="inquiry-form">
      {/* Honeypot — hidden from humans, filled by bots */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
        <label htmlFor="website_url">Website</label>
        <input type="text" id="website_url" name="website_url" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-xs opacity-50 mb-2 uppercase tracking-[0.2em]">{t.name} *</label>
          <input
            required
            name="name"
            minLength={2}
            className={inputClass}
            id="inquiry-name"
          />
        </div>
        <div>
          <label className="block text-xs opacity-50 mb-2 uppercase tracking-[0.2em]">{t.email} *</label>
          <input
            required
            type="email"
            name="email"
            className={inputClass}
            id="inquiry-email"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-xs opacity-50 mb-2 uppercase tracking-[0.2em]">{t.phone}</label>
          <input
            name="phone"
            type="tel"
            className={inputClass}
            id="inquiry-phone"
          />
        </div>
        <div>
          <label className="block text-xs opacity-50 mb-2 uppercase tracking-[0.2em]">{t.preferred_contact}</label>
          <select name="preferred_contact_method" className={selectClass} id="inquiry-contact-method">
            <option value="email">{t.contact_email}</option>
            <option value="phone">{t.contact_phone}</option>
            <option value="telegram">{t.contact_telegram}</option>
            <option value="whatsapp">{t.contact_whatsapp}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-xs opacity-50 mb-2 uppercase tracking-[0.2em]">{t.project_location}</label>
          <input
            name="project_location"
            className={inputClass}
            id="inquiry-location"
          />
        </div>
        <div>
          <label className="block text-xs opacity-50 mb-2 uppercase tracking-[0.2em]">{t.service_type}</label>
          <select name="service_type" className={selectClass} id="inquiry-service-type">
            <option value="landscape_design">{t.landscape_design}</option>
            <option value="planting">{t.planting}</option>
            <option value="water_features">{t.water_features}</option>
            <option value="paving_terraces">{t.paving_terraces}</option>
            <option value="consultation">{t.consultation}</option>
            <option value="maintenance">{t.maintenance}</option>
            <option value="other">{t.other}</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs opacity-50 mb-2 uppercase tracking-[0.2em]">{t.description} *</label>
        <textarea
          required
          name="short_request_description"
          minLength={10}
          rows={3}
          className={`${inputClass} resize-none`}
          id="inquiry-description"
        />
      </div>

      <div>
        <label className="block text-xs opacity-50 mb-2 uppercase tracking-[0.2em]">{t.optional_comment}</label>
        <textarea
          name="optional_comment"
          rows={2}
          className={`${inputClass} resize-none`}
          id="inquiry-comment"
        />
      </div>

      <div className="flex items-start gap-4 text-sm">
        <input
          required
          type="checkbox"
          name="consent_to_personal_data_processing"
          defaultChecked
          id="inquiry-consent"
          className="mt-1 accent-accent-dark w-4 h-4 cursor-pointer"
        />
        <label htmlFor="inquiry-consent" className="opacity-60 cursor-pointer leading-relaxed">
          {t.consent} *
        </label>
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm">{t.error_text}</p>
      )}
      {status === 'rate_limited' && (
        <p className="text-amber-400 text-sm">{t.rate_limit}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        id="inquiry-submit"
        className="w-full bg-accent text-premium-950 px-8 py-4 uppercase tracking-[0.25em] text-sm font-semibold hover:bg-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? t.submitting : t.submit}
      </button>
    </form>
  )
}
