import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { blogService } from '@/services/blogService';
import { i18n } from '@/i18n.config';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

interface PostPageSSGProps {
  params: { locale: string, slug: string };
}

const uploadedImagesUrl = process.env.NEXT_PUBLIC_UPLOADED_BLOG_IMAGES_URL || '';

export async function generateMetadata({ params }: PostPageSSGProps) {
  const { slug } = params;
  const post = await blogService.getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article non trouvé',
      description: 'Cet article n’existe pas.',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    image: post.imageUrl ? `${uploadedImagesUrl}/${post.imageUrl.resizedUrl}` : undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.imageUrl ? [`${uploadedImagesUrl}/${post.imageUrl.resizedUrl}`] : [],
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  const posts = await blogService.getAllPosts('published');

  return i18n.locales.flatMap((locale) => posts.map(v => ({ locale: locale })))
}


export default async function BlogPostPage({ params }: PostPageSSGProps) {
  const { locale, slug } = params;
  const t = await getTranslations({ locale, namespace: 'blogPage' });

  if (Array.isArray(params.slug)) {
    notFound();
  }

  const post = await blogService.getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="pt-24">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <article className="prose prose-lg mx-auto">
          {post.imageUrl && (<Image
            src={`${uploadedImagesUrl}/${post.imageUrl.url}`}
            height={150} width={300}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />)}
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-600 mb-4">{formatDate(post.date)}</div>
          {/* contenu HTML directement injecté */}
          <div
            className="prose prose-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>

          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-green-900 hover:text-green-700"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              {t('backToPosts')}
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
