
// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const i18nMiddleware = createMiddleware({
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
    matcher: ['/admin/:path*', '/((?!_next/|api/|.*\\..*).*)'],

};

function isAdminRoute(req: NextRequest) { return req.nextUrl.pathname.includes('/admin'); }