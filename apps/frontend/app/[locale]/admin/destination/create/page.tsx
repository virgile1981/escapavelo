"use client";

import { useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import DestinationForm from "@/components/destination/DestinationForm";
import { destinationService } from "@/services/destinationService";
import Link from "next/link";
import type { DestinationDTO, Locale } from "@escapavelo/shared-types";

export default function CreateTripPage() {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    const params = useParams()
    if (Array.isArray(params.locale)) {
        notFound();
    }

    const locale = params.locale as Locale;
    const handleSubmit = async (destination: DestinationDTO) => {
        try {
            setIsSaving(true);
            setError("");

            destination.translations.forEach(translation => {
                translation.included = translation.included ? translation.included.filter(i => i.trim() !== '') : []
                translation.notIncluded = translation.notIncluded ? translation.notIncluded.filter(i => i.trim() !== '') : []
            })

            await destinationService.createTrip(destination);
            router.push("/admin/destination");
        } catch (err) {
            console.error("Erreur lors de la sauvegarde :", err);
            setError("Une erreur est survenue lors de la sauvegarde");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        router.push("/admin");
    };

    return (
        <div className="pt-24">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Créer un nouveau voyage</h1>
                    <Link
                        href="/admin"
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Retour
                    </Link>
                </div>

                <DestinationForm
                    locale={locale}
                    isSaving={isSaving}
                    error={error}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </div>
        </div>
    );
}
