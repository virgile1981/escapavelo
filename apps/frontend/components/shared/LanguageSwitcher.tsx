'use client';
import { i18n } from '@/i18n.config';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();

    const switchLanguage = (locale: string) => {
        // Découpe le path
        const segments = pathname.split("/").filter(Boolean); // ex "/en/blog/x" → ["en","blog","x"]

        // Si le premier segment est une locale, on l'enlève
        if (i18n.locales.includes(segments[0])) {
            segments.shift(); // → ["blog","x"]
        }

        // Reconstruction du path dans la nouvelle langue
        const newPath = "/" + [locale, ...segments].join("/");

        router.push(newPath);
    };

    return (
        <div>
            <button onClick={() => switchLanguage('fr')}>FR</button>
            <button onClick={() => switchLanguage('en')}>EN</button>
        </div>
    );
}
