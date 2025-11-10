'use client';

import { useEffect, useState } from 'react';
import { BlogService } from '@/services/blogService';
import PostPreview from '@/components/blog/PostPreview';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const blogService = new BlogService();
        const postData = await blogService.getAllPosts("published");
        setPosts(postData);
      } catch (err) {
        console.error('Erreur lors du chargement des articles :', err);
        setError("Erreur lors du chargement de l'article");
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12">Blog</h1>

        {error ? (
          <div className="text-red-600 text-center py-12">{error}</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostPreview key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
