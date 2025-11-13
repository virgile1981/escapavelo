"use client";

import { Destination } from "@/types/trip";
import { useState } from "react";
import ImageUploader from "../form/ImageUploader";
import TinyMCE from "@/components/form/HtmlEditor";
import DestinationInclusionsSection from "./DestinationInclusionSection";
import DestinationItinerarySection from "./DestinationItinerarySection";
import { MultiFormatImageUrl } from "@/types/common";
import { Status, TravelType } from "@escapavelo/shared-types";

interface TravelFormProps {
    destination?: Destination;
    isSaving?: boolean;
    error?: string;
    onSubmit: (travel: Destination) => void;
    onCancel: () => void;
}

export default function DestinationForm({
    destination,
    isSaving = false,
    error = "",
    onSubmit,
    onCancel,
}: TravelFormProps) {
    const [localDestination, setLocalDestination] = useState<Destination>(
        destination ?? new Destination()
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(localDestination);
    };

    function handleChange<K extends keyof Destination>(
        name: K,
        value: Destination[K]
    ) {
        setLocalDestination(destination => ({
            ...destination,
            [name]: value,
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
                                value={localDestination.title}
                                onChange={(e) => handleChange("title", e.target.value)}
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
                                value={localDestination.slug}
                                onChange={(e) => handleChange("slug", e.target.value)}
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
                                value={localDestination.region}
                                onChange={(e) => handleChange("region", e.target.value)}
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
                                onChange={(e) => handleChange("duration", e.target.valueAsNumber)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* Images */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                            <ImageUploader
                                value={localDestination.imageUrls}
                                onChange={(imageUrls) => handleChange("imageUrls", imageUrls as MultiFormatImageUrl[])}
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
                                onChange={(e) => handleChange("price", e.target.valueAsNumber)}
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
                                onChange={(e) => handleChange("distance", e.target.valueAsNumber)}
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
                                onChange={(e) => handleChange("difficulty", Number(e.target.value))}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                                <option value="1">Facile</option>
                                <option value="2">Modéré</option>
                                <option value="3">Difficile</option>
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
                                onChange={(e) => handleChange("travelType", e.target.value as TravelType)}
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
                                onChange={(e) => handleChange("status", e.target.value as Status)}
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
                                    onChange={(e) => handleChange("promoted", Boolean(e.target.value))}
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
                            value={localDestination.description}
                            onChange={(e) => handleChange("description", e.target.value)}
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
                            value={localDestination.longDescription}
                            onChange={(content) => handleChange("longDescription", content)}
                            context="destination"
                        />
                    </div>

                    {/* Main Image */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <ImageUploader
                            value={localDestination.imageUrl}
                            onChange={(imageUrl) => handleChange("imageUrl", imageUrl as MultiFormatImageUrl | null)}
                            multiple={false}
                            context="destination"
                        />
                    </div>
                </div>

                {/* Inclus / Non inclus */}
                <DestinationInclusionsSection
                    included={localDestination.included}
                    notIncluded={localDestination.notIncluded}
                    onUpdateIncluded={(included) => handleChange("included", included)}
                    onUpdateNotIncluded={(notIncluded) => handleChange("notIncluded", notIncluded)}
                />

                {/* Itinéraire */}
                <DestinationItinerarySection
                    itinerary={localDestination.program}
                    onUpdateItinerary={(program) => handleChange("program", program)}
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
