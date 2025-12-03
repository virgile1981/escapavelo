import PostPreview from '@/components/blog/PostPreview';
import { blogService } from '@/services/blogService';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense, use } from 'react';

export default async function BlogPage() {

  const posts = await blogService.getAllPosts("published")
  const t = await getTranslations('blogPage');

  return (
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12">Blog</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Suspense key={post.slug} fallback={<div>Chargement...</div>}>
              <h1>{t('title')}</h1>
              <p>{t('subtitle')}</p>
              <PostPreview post={post} />
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
}
