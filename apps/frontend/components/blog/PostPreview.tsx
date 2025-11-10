import { BlogPost } from '@/types/blog';
import Link from 'next/link';

interface Props {
  post: BlogPost;
}

export default function PostPreview({ post }: Props) {
  const uploadedImagesUrl =
    process.env.NEXT_PUBLIC_UPLOADED_IMAGES_URL || '';

  return (
    <article className="bg-white shadow-md overflow-hidden">
      <img
        src={`${uploadedImagesUrl}/${post.imageUrl.resizedUrl}`}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="text-green-900 font-medium hover:text-green-700"
        >
          Lire la suite →
        </Link>
      </div>
    </article>
  );
}
