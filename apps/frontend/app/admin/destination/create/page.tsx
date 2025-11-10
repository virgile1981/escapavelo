"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Destination } from "@/types/trip"; // si vous avez renommé Travel → Destination
import DestinationForm from "@/components/destination/DestinationForm";
import { DestinationService } from "@/services/destinationService";

export default function CreateTripPage() {
    const router = useRouter();
    const destinationService = new DestinationService();

    const [travel, setTravel] = useState<Destination>();

    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (destination: Destination) => {
        try {
            setIsSaving(true);
            setError("");

            // Nettoyage des listes vides
            const cleanedTravel = {
                ...destination,
                included: destination.included.filter((i) => i.trim() !== ""),
                notIncluded: destination.notIncluded.filter((i) => i.trim() !== ""),
            };

            await destinationService.createTrip(cleanedTravel);
            router.push("/admin/destination");
        } catch (err: any) {
            console.error("Erreur lors de la sauvegarde :", err);
            setError(err.message || "Une erreur est survenue lors de la sauvegarde");
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
                    <a
                        href="/admin"
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Retour
                    </a>
                </div>

                <DestinationForm
                    isSaving={isSaving}
                    error={error}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </div>
        </div>
    );
}
