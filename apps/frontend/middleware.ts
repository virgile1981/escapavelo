
// middleware.ts
import { createI18nMiddleware } from 'next-international/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const i18nMiddleware = createI18nMiddleware({
    locales: ['en', 'fr'], // Liste des locales supportées
    defaultLocale: 'fr', // Locale par défaut
});

export default function middleware(req: NextRequest) {

    if (isAdminRoute(req)) {
        const token = req.cookies.get('access_token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    return i18nMiddleware(req);
}

export const config = {
    matcher: ['/admin/:path*', '/((?!_next|.*\\..*).*)'],
    
};

function isAdminRoute(req: NextRequest) { return req.nextUrl.pathname.startsWith('/admin'); }