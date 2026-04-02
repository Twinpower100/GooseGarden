import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'ru']
const defaultLocale = 'ru'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip if it's admin or api
  if (pathname.startsWith('/admin') || pathname.startsWith('/api') || pathname.match(/\.(.*)$/)) {
    return
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    '/((?!_next|admin|api|media).*)',
  ],
}
