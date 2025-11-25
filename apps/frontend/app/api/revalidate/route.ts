import { NextRequest, NextResponse } from 'next/server';
import { blogService } from '@/services/blogService';
import { revalidatePath } from 'next/cache';
import { destinationService } from '@/services/destinationService';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { secret } = body;

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // récupérer tous les slugs
    const blogSlugs = (await blogService.getAllPosts('published')).map(p => p.slug);
    const tripSlugs = (await destinationService.getAllTrips('published')).map(t => t.slug);

    // revalider chaque page
    for (const slug of blogSlugs) {
      revalidatePath(`/blog/${slug}`);
    }
    for (const slug of tripSlugs) {
      revalidatePath(`/destination/${slug}`);
    }

    revalidatePath('/destination');
    revalidatePath('/blog');

    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', error: err }, { status: 500 });
  }
}
