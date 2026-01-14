'use client'

import { useState } from 'react'
import { notFound, useParams, useRouter } from 'next/navigation'
import { AuthService } from '@/services/authService'
import type { Locale } from 'next-intl'

export default function LoginPage() {
    const params = useParams()
    if (Array.isArray(params.slug)) {
        notFound();
    }
    const locale = params.locale as Locale;

    const router = useRouter()
    const authService = new AuthService()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const response = await authService.login(username, password)

        if (!response.success) {
            const msg = await response.text();
            setError(msg || 'Identifiants invalides');
            throw new Error(msg || 'Identifiants invalides');
        }

        // Redirige après succès
        router.push(`${locale}/admin/blog`);
    }

    return (
        <div className="pt-24 flex items-center justify-center">
            <div className="max-w-md w-full mx-4">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-center mb-6">
                        Connexion Administration
                    </h1>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Identifiant
                            </label>
                            <input
                                id="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Mot de passe
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {error && (
                            <div className="text-red-600 text-sm text-center">{error}</div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-green-900 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition-colors"
                        >
                            Se connecter
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
