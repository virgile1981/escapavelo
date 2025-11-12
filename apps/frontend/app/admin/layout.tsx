'use client'

import { AuthService } from "@/services/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter()
    const authService = new AuthService();

    const handleLogout = () => {
        authService.logout();
        router.push('/login')
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Administration</h1>
                <div className="inline-flex items-center space-x-4">
                    <Link
                        href="/admin/blog"
                        className="bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors"
                    >
                        blog
                    </Link>
                    <Link
                        href="/admin/destination"
                        className="bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors"
                    >
                        destinations
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Déconnexion
                    </button>
                </div>
            </div>

            <div>

                <div>{children}</div>
            </div>
        </div>
    );
}
