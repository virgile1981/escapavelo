"use client";

import { FC } from "react";

export interface ItineraryDay {
    day: number;
    title: string;
    description: string;
    distance: number;
    accommodation?: string;
}

interface DestinationItinerarySectionProps {
    itinerary: ItineraryDay[];
    onUpdateItinerary: (itinerary: ItineraryDay[]) => void;
}

const TravelItinerarySection: FC<DestinationItinerarySectionProps> = ({
    itinerary,
    onUpdateItinerary,
}) => {
    const addDay = () => {
        const nextDay = itinerary.length + 1;
        onUpdateItinerary([
            ...itinerary,
            { day: nextDay, title: "", description: "", distance: 0, accommodation: "" },
        ]);
    };

    const removeDay = (index: number) => {
        const newItinerary = [...itinerary];
        newItinerary.splice(index, 1);
        // Réorganiser les numéros de jours
        newItinerary.forEach((day, i) => {
            day.day = i + 1;
        });
        onUpdateItinerary(newItinerary);
    };

    const updateDay = (index: number, field: keyof ItineraryDay, value: any) => {
        const newItinerary = [...itinerary];
        newItinerary[index] = { ...newItinerary[index], [field]: value };
        onUpdateItinerary(newItinerary);
    };

    return (
        <div className="pb-6">
            <h3 className="text-lg font-semibold mb-4">Itinéraire</h3>
            <div className="space-y-4">
                {itinerary.map((day, index) => (
                    <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium">Jour {day.day}</h4>
                            <button
                                type="button"
                                onClick={() => removeDay(index)}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Supprimer
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Titre du jour
                                </label>
                                <input
                                    type="text"
                                    value={day.title}
                                    onChange={(e) => updateDay(index, "title", e.target.value)}
                                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Distance (km)
                                </label>
                                <input
                                    type="number"
                                    value={day.distance}
                                    onChange={(e) => updateDay(index, "distance", Number(e.target.value))}
                                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </div>

                        <div className="mt-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                rows={2}
                                value={day.description}
                                onChange={(e) => updateDay(index, "description", e.target.value)}
                                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div className="mt-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Hébergement (optionnel)
                            </label>
                            <input
                                type="text"
                                value={day.accommodation || ""}
                                onChange={(e) => updateDay(index, "accommodation", e.target.value)}
                                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addDay}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                >
                    + Ajouter un jour
                </button>
            </div>
        </div>
    );
};

export default TravelItinerarySection;
