'use client'

import { useState } from 'react'
import * as motion from 'motion/react-client'

export function InquiryForm({ locale }: { locale: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    
    // Convert checkbox to boolean
    data.consent_to_personal_data_processing = data.consent_to_personal_data_processing ? 'true' : 'false'

    try {
      const res = await fetch(`/api/inquiry-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus('success')
        e.currentTarget.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const isRu = locale === 'ru'

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="p-8 border border-accent/30 text-center bg-white/5 backdrop-blur-sm"
      >
        <h3 className="text-2xl font-serif mb-2">
          {isRu ? 'Спасибо за заявку!' : 'Thank you for your request!'}
        </h3>
        <p className="opacity-70">
          {isRu ? 'Мы свяжемся с вами в ближайшее время.' : 'We will get back to you shortly.'}
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm opacity-60 mb-2 uppercase tracking-wider">{isRu ? 'Имя' : 'Name'} *</label>
          <input required name="name" className="w-full bg-transparent border-b border-premium-600 focus:border-accent py-2 outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-sm opacity-60 mb-2 uppercase tracking-wider">Email *</label>
          <input required type="email" name="email" className="w-full bg-transparent border-b border-premium-600 focus:border-accent py-2 outline-none transition-colors" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm opacity-60 mb-2 uppercase tracking-wider">{isRu ? 'Телефон' : 'Phone'}</label>
          <input name="phone" className="w-full bg-transparent border-b border-premium-600 focus:border-accent py-2 outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-sm opacity-60 mb-2 uppercase tracking-wider">{isRu ? 'Услуга' : 'Service Type'}</label>
          <select name="service_type" className="w-full bg-transparent border-b border-premium-600 focus:border-accent py-2 outline-none transition-colors [&>option]:bg-premium-900">
            <option value="landscape_design">{isRu ? 'Ландшафтный дизайн' : 'Landscape Design'}</option>
            <option value="consultation">{isRu ? 'Консультация' : 'Consultation'}</option>
            <option value="maintenance">{isRu ? 'Уход за садом' : 'Maintenance'}</option>
            <option value="other">{isRu ? 'Другое' : 'Other'}</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm opacity-60 mb-2 uppercase tracking-wider">{isRu ? 'Описание проекта' : 'Project Description'} *</label>
        <textarea required name="short_request_description" rows={3} className="w-full bg-transparent border-b border-premium-600 focus:border-accent py-2 outline-none transition-colors resize-none" />
      </div>

      <div className="flex items-start gap-4 text-sm opacity-70">
        <input required type="checkbox" name="consent_to_personal_data_processing" defaultChecked id="consent" className="mt-1 accent-white" />
        <label htmlFor="consent">
          {isRu 
            ? 'Я согласен на обработку персональных данных' 
            : 'I consent to the processing of personal data'} *
        </label>
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm">{isRu ? 'Произошла ошибка. Попробуйте еще раз.' : 'An error occurred. Please try again.'}</p>
      )}

      <button 
        disabled={status === 'loading'}
        className="w-full bg-accent text-premium-950 px-8 py-4 uppercase tracking-widest font-semibold hover:bg-white transition-colors"
      >
        {status === 'loading' ? 'ОТПРАВКА...' : (isRu ? 'Отправить запрос' : 'Submit Request')}
      </button>
    </form>
  )
}
