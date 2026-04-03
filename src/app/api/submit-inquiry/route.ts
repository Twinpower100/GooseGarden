import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { checkRateLimit, checkSubmissionTiming } from '@/lib/rate-limiter'
import { sendEmailNotification, sendTelegramNotification } from '@/lib/notifications'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    // Honeypot check — bots fill hidden fields
    if (data.website_url) {
      // Silently accept to not tip off bots, but don't save
      return NextResponse.json({ success: true })
    }

    // Rate limiting by IP
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown'

    if (!checkRateLimit(ip, 5, 60000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 },
      )
    }

    // Anti-bot timing check
    if (data._form_rendered_at) {
      const renderedAt = Number(data._form_rendered_at)
      if (!checkSubmissionTiming(renderedAt, 2500)) {
        return NextResponse.json({ success: true }) // silently ignore
      }
    }

    // Server-side validation
    const errors: string[] = []
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
      errors.push('Name is required (min 2 characters)')
    }
    if (!data.email || typeof data.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Valid email is required')
    }
    if (!data.short_request_description || typeof data.short_request_description !== 'string' || data.short_request_description.trim().length < 10) {
      errors.push('Project description is required (min 10 characters)')
    }
    if (data.phone && typeof data.phone === 'string' && !/^[+\d\s\-()]{7,20}$/.test(data.phone)) {
      errors.push('Invalid phone number format')
    }
    if (data.consent_to_personal_data_processing !== true && data.consent_to_personal_data_processing !== 'true') {
      errors.push('Consent to data processing is required')
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join('; ') }, { status: 400 })
    }

    // Strip anti-spam fields before saving
    const cleanData = { ...data }
    delete cleanData.website_url
    delete cleanData._form_rendered_at

    // Convert consent to boolean
    cleanData.consent_to_personal_data_processing =
      cleanData.consent_to_personal_data_processing === 'true' ||
      cleanData.consent_to_personal_data_processing === true

    const payload = await getPayload({ config: configPromise })

    const doc = await payload.create({
      collection: 'inquiry-requests',
      data: cleanData,
    })

    // Send notifications (non-blocking, fire-and-forget)
    Promise.allSettled([
      sendEmailNotification(doc as any),
      sendTelegramNotification(doc as any),
    ])

    return NextResponse.json({ success: true, id: doc.id })
  } catch (error: any) {
    console.error('[Submit Inquiry] Error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    )
  }
}
