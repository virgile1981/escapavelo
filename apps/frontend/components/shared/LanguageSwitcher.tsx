'use client';
import { i18n } from '@/i18n.config';
import type { Locale } from '@escapavelo/shared-types';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher(params: { currentLocale: Locale }) {
    const currentLocale = params.currentLocale;
    const router = useRouter();
    const pathname = usePathname();
    const switchLanguage = (locale: string) => {
        // Découpe le path
        const segments = pathname.split("/").filter(Boolean); // ex "/en/blog/x" → ["en","blog","x"]

        // Si le premier segment est une locale, on l'enlève
        if (i18n.locales.includes(segments[0] as Locale)) {
            segments.shift(); // → ["blog","x"]
        }

        // Reconstruction du path dans la nouvelle langue
        const newPath = "/" + [locale, ...segments].join("/");

        router.push(newPath);
    };
    // Appliquer la classe de base PLUS la classe d'état
    return (
        <div className="flex items-center space-x-1 p-1 bg-gray-100 rounded-full dark:bg-gray-800">
            {i18n.locales.map(locale => {
                const isActive = locale === currentLocale;
                const classNames = `lang-button ${isActive ? 'lang-button-active' : 'lang-button-default'}`;
                return <button
                    key={locale}
                    onClick={() => switchLanguage(locale)}
                    className={classNames}
                    aria-current={isActive ? "true" : "false"}
                    aria-label={isActive ? `Langue sélectionnée : ${locale}` : `Langue disponible : ${locale}`}
                >
                    {locale}
                </button>
            }
            )}
        </div>
    );
}
