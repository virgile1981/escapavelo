'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

import { BlogPost } from '@/types/blog';
import { BlogService } from '@/services/blogService';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadedImagesUrl = process.env.NEXT_PUBLIC_UPLOADED_IMAGES_URL || '';

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const blogService = new BlogService();
        const posts = await blogService.getAllPosts("published");
        const found = posts.find((p: BlogPost) => p.slug === slug);
        if (!found) {
          setError('Article non trouvé');
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
          <img
            src={`${uploadedImagesUrl}/${post.imageUrl.url}`}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
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
