import { NextResponse } from 'next/server';
import { server_config } from '@/app/utils/server_config.js'

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const cookie = request.headers.get('cookie') || '';

    const res = await fetch(
      `https://${server_config.site_folder}/auth/me/${server_config.site_key}`,
      {
        headers: {
          cookie, // 🔥 прокидываем ВСЕ cookie как есть
        },
      }
    );

    if (!res.ok) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], //'/admin/:path*'
};