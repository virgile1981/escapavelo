'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { BlogService } from '@/services/blogService'
import BlogForm from '@/components/blog/BlogForm'
import { BlogPost } from '@/types/blog'

export default function EditPostPage() {
    const router = useRouter()
    const params = useParams()
    const blogService = new BlogService()

    const [post, setPost] = useState<BlogPost>()

    const [error, setError] = useState('')
    const postId = params.slug;

    // Chargement du post existant
    useEffect(() => {
        const loadPost = async () => {
            try {
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
        } catch (err: any) {
            console.error('Erreur lors de la sauvegarde:', err)
            setError(err.message || 'Une erreur est survenue lors de la sauvegarde')
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
