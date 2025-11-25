'use client';
import { useState } from 'react';

export function RevalidateButton() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleRevalidate = async () => {
        setLoading(true);
        setMessage(null);

        try {
            const res = await fetch('/api/revalidate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ secret: process.env.NEXT_PUBLIC_REVALIDATE_SECRET })
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('Pages revalidées avec succès !');
            } else {
                setMessage(`Erreur : ${data.message}`);
            }
        } catch (err) {
            setMessage('Erreur réseau ou serveur');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={handleRevalidate}
                disabled={loading}
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                {loading ? 'Revalidation...' : 'Revalider toutes les pages'}
            </button>
            {message && <p className="mt-2 text-sm">{message}</p>}
        </div>
    );
}
