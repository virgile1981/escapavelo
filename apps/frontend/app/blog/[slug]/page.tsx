'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { FullBlogPost } from '@/types/blog';
import { blogService } from '@/services/blogService';

export default function BlogPostPage() {
  const params = useParams()
  if (Array.isArray(params.slug)) {
    notFound();
  }

  const slug = params?.slug as string;

  const [post, setPost] = useState<FullBlogPost>();
  const [error, setError] = useState<string | null>(null);

  const uploadedImagesUrl = process.env.NEXT_PUBLIC_UPLOADED_IMAGES_URL || '';

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const posts = await blogService.getAllPosts("published");
        const found = posts.find((p: FullBlogPost) => p.slug === slug);
        if (!found) {
          notFound();
        } else {
          setPost(found);
        }
      } catch (err) {
        console.error('Erreur lors du chargement de l’article :', err);
        setError("Erreur lors du chargement de l'article");
      }
    };

    if (slug) fetchPost();
  }, [slug]);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  if (error) {
    return (
      <div className="pt-24">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Article non trouvé</h2>
          <p className="text-gray-600 mb-8">
            L&apos;article que vous recherchez n&apos;existe pas ou a été déplacé.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center bg-green-900 text-white px-6 py-3 rounded-lg hover:bg-green-800"
          >
            Retour aux articles
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-24 text-center text-gray-600">
        Chargement de l&apos;article...
      </div>
    );
  }

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
              Retour aux articles
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
