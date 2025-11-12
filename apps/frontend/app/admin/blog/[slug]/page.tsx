'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams, notFound } from 'next/navigation'
import BlogForm from '@/components/blog/BlogForm'
import { BlogPost, FullBlogPost } from '@/types/blog'
import { blogService } from '@/services/blogService'

export default function EditPostPage() {
    const params = useParams()
    if (Array.isArray(params.slug)) {
        notFound();
    }

    const router = useRouter()

    const [post, setPost] = useState<FullBlogPost>()

    const [error, setError] = useState('')
    const postId = params.slug as string;

    // Chargement du post existant
    useEffect(() => {
        const loadPost = async () => {
            try {
                if (!postId) setError("ID de l'article manquant")
                const postData = await blogService.getPost(postId)
                setPost(postData)
            } catch (err) {
                setError("Erreur lors du chargement de l'article")
                console.error('Erreur:', err)
            }
        }

        if (postId) loadPost()
    }, [postId])

    // Soumission du formulaire
    const handleSubmit = async (updatedPost: BlogPost) => {
        try {
            setError('')
            await blogService.updatePost(postId, updatedPost)
            router.push('/admin/blog')
        } catch (err) {
            console.error('Erreur lors de la sauvegarde:', err)
            setError('Une erreur est survenue lors de la sauvegarde')
        }
    }

    return (
        post && (
            <div className="pt-24">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    {error && <p className="text-red-600 mb-4">{error}</p>}
                    <BlogForm postToUpdate={post} onSubmit={handleSubmit} />
                </div>
            </div>)
    )
}
