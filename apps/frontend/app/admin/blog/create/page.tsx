'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BlogForm from '@/components/blog/BlogForm'
import { BlogPost } from '@/types/blog'
import { blogService } from '@/services/blogService'

export default function EditPostPage() {
    const router = useRouter()
    const [error, setError] = useState('')


    // Soumission du formulaire
    const handleSubmit = async (newPost: BlogPost) => {
        try {
            setError('')
            await blogService.createPost(newPost)
            router.push('/admin/blog')
        } catch (err) {
            console.error('Erreur lors de la sauvegarde:', err)
            setError('Une erreur est survenue lors de la sauvegarde')
        }
    }

    return (

        <div className="pt-24">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <BlogForm onSubmit={handleSubmit} />
            </div>
        </div>
    )
}
