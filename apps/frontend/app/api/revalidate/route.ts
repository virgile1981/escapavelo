import { NextRequest, NextResponse } from 'next/server';
import { blogService } from '@/services/blogService';
import { revalidatePath } from 'next/cache';
import { destinationService } from '@/services/destinationService';
import generateSitemap from '@/app/sitemap';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { secret } = body;

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // récupérer tous les slugs
    const blogSlugs = (await blogService.getAllPosts('published')).map(p => p.slug);
    const tripFrSlugs = (await destinationService.getAllTrips('fr', 'published')).map(t => t.slug);
    const tripEnSlugs = (await destinationService.getAllTrips('en', 'published')).map(t => t.slug);

    // revalider chaque page
    for (const slug of blogSlugs) {
      revalidatePath(`/blog/${slug}`);
    }
    for (const slug of tripFrSlugs) {
      revalidatePath(`/fr/destination/${slug}`);
    }

    for (const slug of tripEnSlugs) {
      revalidatePath(`/en/destination/${slug}`);
    }

    revalidatePath('/destination');
    revalidatePath('/blog');

    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', error: err }, { status: 500 });
  }
}
