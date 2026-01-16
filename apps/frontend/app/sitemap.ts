import { blogService } from "@/services/blogService";
import { destinationService } from "@/services/destinationService";
import type { MetadataRoute } from "next";

export const revalidate = 60; // 1 hour
export const dynamic = 'force-dynamic';
export default async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
    console.log("Generating sitemap...");
    const destinationsFr = await destinationService.getAllTrips('fr', 'published');
    const destinationsEn = await destinationService.getAllTrips('en', 'published');
    let urls: MetadataRoute.Sitemap = [
        {
            url: 'https://escapavelo.fr/',
            lastModified: new Date(),
            alternates: {
                languages: {
                    fr: 'https://escapavelo.fr/fr',
                    en: 'https://escapavelo.fr/en',
                },
            },
            changeFrequency: 'weekly'
        },
        {
            url: 'https://escapavelo.fr/destinations',
            lastModified: new Date(),
            alternates: {
                languages: {
                    fr: 'https://escapavelo.fr/fr/destinations',
                    en: 'https://escapavelo.fr/en/destinations',
                },
            },
            changeFrequency: 'weekly'
        },
        {
            url: 'https://escapavelo.fr/blog',
            lastModified: new Date(),
            alternates: {
                languages: {
                    fr: 'https://escapavelo.fr/fr/blog',
                    en: 'https://escapavelo.fr/en/blog',
                },
            },
            changeFrequency: 'weekly'
        },
    ]
    urls = urls.concat(destinationsEn.map((dest) => ({
        url: `https://escapavelo.fr/en/destination/${dest.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const
    })))

    urls = urls.concat(destinationsFr.map(dest => ({
        url: `https://escapavelo.fr/fr/destination/${dest.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly'
    })))


    const posts = await blogService.getAllPosts('published');
    urls = urls.concat(posts.map(post => ({
        url: `https://escapavelo.fr/blog/${post.slug}`,
        lastModified: new Date()
    })));

    return urls;

}