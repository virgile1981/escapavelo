import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { blogService } from '@/services/blogService';
import PostPreview from '../blog/PostPreview';
import type { StyleProps } from '@/types/common';


export default async function BlogPreview({
  background = 'bg-green-900',
  textColor = 'text-white',
}: StyleProps) {

  const recentPosts = await blogService.getLastPosts();

  return (
    <div
      className={`${background} w-full relative py-20 bg-center pt-12 xs:pt-16 sm:pt-20 md:pt-24 pb-12 xs:pb-16 sm:pb-20 md:pb-24 scroll-my-28 z-10`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className={`text-3xl font-bold mb-12 text-center ${textColor}`}
        >
          Les derniers articles pour vous aider à préparer vos vacances à vélo
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
            <div key={index}>
              <PostPreview post={post} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center bg-green-900 text-white px-6 py-3 shadow-md text-lg font-medium hover:bg-green-800 transition-colors"
          >
            Voir tous les articles
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
