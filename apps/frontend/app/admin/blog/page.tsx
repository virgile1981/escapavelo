'use client'

import { useEffect, useState } from 'react'
import { BlogService } from '@/services/blogService'

export default function AdminBlogPage() {

    const blogService = new BlogService()

    const [posts, setPosts] = useState<any[]>([])
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await blogService.getAllPosts()
                setPosts(postsData)
            } catch (err) {
                setError("Erreur lors du chargement des articles")
                console.error('Erreur:', err)
            }
        }
        fetchPosts()
    }, [])

    const deletePost = async (id: string) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return

        try {
            setDeletingId(id)
            await blogService.deletePost(id)
            setPosts((prev) => prev.filter((post) => post.id !== id))
        } catch (err) {
            alert("Erreur lors de la suppression de l'article")
            console.error('Erreur:', err)
        } finally {
            setDeletingId(null)
        }
    }



    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Administration du blog</h1>
                <div className="flex items-center space-x-4">
                    <a
                        href="/admin/blog/create"
                        className="bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors"
                    >
                        Nouvel article
                    </a>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{post.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{post.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.status === 'published'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                    >
                                        {post.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a
                                        href={`/admin/blog/${post.id}`}
                                        className="text-green-900 hover:text-green-700 mr-4"
                                    >
                                        Modifier
                                    </a>
                                    <button
                                        onClick={() => deletePost(post.id)}
                                        className="text-red-600 hover:text-red-900"
                                        disabled={deletingId === post.id}
                                    >
                                        {deletingId === post.id ? 'Suppression...' : 'Supprimer'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </div>
    )
}
