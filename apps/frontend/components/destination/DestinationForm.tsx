"use client";

import { useState } from "react";
import ImageUploader from "../form/ImageUploader";
import TinyMCE from "@/components/form/HtmlEditor";
import DestinationInclusionsSection from "./DestinationInclusionSection";
import DestinationItinerarySection from "./DestinationItinerarySection";
import { DestinationDTO, DifficultyRecord, type DifficultyType, type Locale, type MultiFormatImageUrl, type Status, type TravelType } from "@escapavelo/shared-types";

interface TravelFormProps {
    destination?: DestinationDTO;
    locale: Locale;
    isSaving?: boolean;
    error?: string;
    onSubmit: (travel: DestinationDTO) => void;
    onCancel: () => void;
}

export default function DestinationForm({
    destination,
    locale,
    isSaving = false,
    error = "",
    onSubmit,
    onCancel,
}: TravelFormProps) {
    const [localDestination, setLocalDestination] = useState<DestinationDTO>(
        destination ?? new DestinationDTO(locale)
    );

    const translation = localDestination.translations.find(t => t.locale === locale)
    if (!translation) {
        throw new Error("la traduction en " + locale + " n'a pas été trouvée")
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(localDestination);
    };

    // fonction immutable
    function updateDestinationField<K extends keyof DestinationDTO>(
        name: K,
        value: DestinationDTO[K]
    ) {
        setLocalDestination(destination => ({
            ...destination,
            [name]: value,
        }));
    }

    function updateTranslationField<
        K extends keyof DestinationDTO["translations"][number]
    >(key: K, value: DestinationDTO["translations"][number][K]) {
        setLocalDestination(dest => ({
            ...dest,
            translations: dest.translations.map(t =>
                t.locale === locale
                    ? { ...t, [key]: value }
                    : t
            ),
        }));
    }



    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informations générales */}
                <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold mb-4">Informations générales</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Titre
                            </label>
                            <input
                                type="text"
                                value={translation.title}
                                onChange={(e) => updateTranslationField("title", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* Slug */}
                        <div>
                            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                                Slug
                            </label>
                            <input
                                id="slug"
                                type="text"
                                value={translation.slug}
                                onChange={(e) => updateTranslationField("slug", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* Region */}
                        <div>
                            <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                                Région
                            </label>
                            <input
                                id="region"
                                type="text"
                                value={translation.region}
                                onChange={(e) => updateTranslationField("region", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* Duration */}
                        <div>
                            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                                Durée (en jours)
                            </label>
                            <input
                                type="number"
                                value={localDestination.duration}
                                onChange={(e) => updateDestinationField("duration", e.target.valueAsNumber)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* Images */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                            <ImageUploader
                                value={localDestination.imageUrls}
                                onChange={(imageUrls) => updateDestinationField("imageUrls", imageUrls as MultiFormatImageUrl[])}
                                multiple={true}
                                context="destination"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                Prix (€)
                            </label>
                            <input
                                id="price"
                                type="number"
                                value={localDestination.price}
                                onChange={(e) => updateDestinationField("price", e.target.valueAsNumber)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* Distance */}
                        <div>
                            <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-1">
                                Distance totale (km)
                            </label>
                            <input
                                id="distance"
                                type="number"
                                value={localDestination.distance}
                                onChange={(e) => updateDestinationField("distance", e.target.valueAsNumber)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* Difficulty */}
                        <div>
                            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                                Difficulté
                            </label>
                            <select
                                id="difficulty"
                                value={localDestination.difficulty}
                                onChange={(e) => updateDestinationField("difficulty", e.target.value as DifficultyType)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                                {
                                    Object.keys(DifficultyRecord).map((key) => (
                                        <option key={key} value={key}>{key}</option>
                                    ))
                                }
                            </select>
                        </div>

                        {/* TravelType */}
                        <div>
                            <label htmlFor="travelType" className="block text-sm font-medium text-gray-700 mb-1">
                                Profil ciblé
                            </label>
                            <select
                                id="travelType"
                                value={localDestination.travelType}
                                onChange={(e) => updateDestinationField("travelType", e.target.value as TravelType)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                                <option value="friends">Entre amis</option>
                                <option value="family">En famille</option>
                                <option value="couple">En couple</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                Statut
                            </label>
                            <select
                                id="status"
                                value={localDestination.status}
                                onChange={(e) => updateDestinationField("status", e.target.value as Status)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                                <option value="draft">Brouillon</option>
                                <option value="published">Publié</option>
                            </select>
                        </div>

                        {/* Promoted */}
                        <div className="flex items-end pb-4">
                            <label className="inline-flex items-center gap-2 text-sm">
                                <input
                                    id="promoted"
                                    type="checkbox"
                                    checked={localDestination.promoted}
                                    onChange={(e) => updateDestinationField("promoted", Boolean(e.target.value))}
                                    className="w-5 h-5"
                                />
                                Mettre en avant
                            </label>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={translation.description}
                            onChange={(e) => updateTranslationField("description", e.target.value)}
                            rows={2}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    {/* Long Description */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description détaillée
                        </label>
                        <TinyMCE
                            value={translation.longDescription}
                            onChange={(content) => updateTranslationField("longDescription", content)}
                            context="destination"
                        />
                    </div>

                    {/* Main Image */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <ImageUploader
                            value={localDestination.imageUrl}
                            onChange={(imageUrl) => updateDestinationField("imageUrl", imageUrl as MultiFormatImageUrl | null)}
                            multiple={false}
                            context="destination"
                        />
                    </div>
                </div>

                {/* Inclus / Non inclus */}
                <DestinationInclusionsSection
                    included={translation.included}
                    notIncluded={translation.notIncluded}
                    onUpdateIncluded={(included) => updateTranslationField("included", included)}
                    onUpdateNotIncluded={(notIncluded) => updateTranslationField("notIncluded", notIncluded)}
                />

                {/* Itinéraire */}
                <DestinationItinerarySection
                    itinerary={translation.program}
                    onUpdateItinerary={(program) => updateTranslationField("program", program)}
                />

                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="bg-green-900 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? "Enregistrement..." : "Enregistrer"}
                    </button>
                </div>

                {error && <div className="text-red-600 text-sm text-center mt-4">{error}</div>}
            </form>
        </div>
    );
}
