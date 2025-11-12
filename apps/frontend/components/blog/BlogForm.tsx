'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TinyMCE from '@/components/form/HtmlEditor'
import ImageUploader from '@/components/form/ImageUploader'
import { BlogAttribute, BlogPost } from '@/types/blog'
import { MultiFormatImageUrl } from '@/types/common'

interface BlogFormProps {
    postToUpdate?: BlogPost
    onSubmit: (post: any) => void
    isEdit?: boolean
    isSaving?: boolean
    error?: string
}

export default function BlogForm({
    postToUpdate,
    onSubmit,
    isEdit = false,
    isSaving = false,
    error = ''
}: BlogFormProps) {
    const router = useRouter();
    const uploadedImagesUrl = process.env.NEXT_PUBLIC_UPLOADED_IMAGES_URL as string; 
    // On stocke les données dans un état React
    const [localPost, setLocalPost] = useState<BlogPost>(postToUpdate ?? new BlogPost())
    const handleChange = (
        name: BlogAttribute, value: any
    ) => {
        console.log(`Changement de ${name} :`, value)
        setLocalPost(post => ({ ...post, [name]: value }))
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(localPost)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">{isEdit ? "Modifier l'article" : "Créer un article"}</h1>
                <a
                    href="/admin/blog"
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                    Retour
                </a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Titre
                        </label>
                        <input
                            type="text"
                            value={localPost.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                            Slug
                        </label>
                        <input
                            type="text"
                            value={localPost.slug || ''}
                            onChange={(e) => handleChange("slug", e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                            Extrait
                        </label>
                        <textarea
                            rows={2}
                            value={localPost.excerpt}
                            onChange={(e) => handleChange("excerpt", e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contenu
                        </label>
                        <TinyMCE value={localPost.content} onChange={(content: string) => handleChange("content", content)} uploadedImagesUrl={uploadedImagesUrl}/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Image URL
                        </label>
                        <ImageUploader
                            value={localPost.imageUrl}
                            onChange={(imageUrl) => handleChange("imageUrl", imageUrl)}
                            multiple={false}
                        />
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                            Statut
                        </label>
                        <select
                            value={localPost.status}
                            onChange={(e) => handleChange("status", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                            <option value="draft">Brouillon</option>
                            <option value="published">Publié</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => router.push('/admin/blog')}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="bg-green-900 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                    </div>

                    {error && <div className="text-red-600 text-sm text-center mt-4">{error}</div>}
                </form>
            </div>
        </div>
    )
}
