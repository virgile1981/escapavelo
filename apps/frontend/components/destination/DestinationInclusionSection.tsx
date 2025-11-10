"use client";

import { FC } from "react";

interface DestinationInclusionsSectionProps {
    included: string[];
    notIncluded: string[];
    onUpdateIncluded: (included: string[]) => void;
    onUpdateNotIncluded: (notIncluded: string[]) => void;
}

const DestinationInclusionsSection: FC<DestinationInclusionsSectionProps> = ({
    included,
    notIncluded,
    onUpdateIncluded,
    onUpdateNotIncluded,
}) => {
    const addIncluded = () => {
        onUpdateIncluded([...included, ""]);
    };

    const removeIncluded = (index: number) => {
        const newIncluded = [...included];
        newIncluded.splice(index, 1);
        onUpdateIncluded(newIncluded);
    };

    const updateIncluded = (index: number, value: string) => {
        const newIncluded = [...included];
        newIncluded[index] = value;
        onUpdateIncluded(newIncluded);
    };

    const addNotIncluded = () => {
        onUpdateNotIncluded([...notIncluded, ""]);
    };

    const removeNotIncluded = (index: number) => {
        const newNotIncluded = [...notIncluded];
        newNotIncluded.splice(index, 1);
        onUpdateNotIncluded(newNotIncluded);
    };

    const updateNotIncluded = (index: number, value: string) => {
        const newNotIncluded = [...notIncluded];
        newNotIncluded[index] = value;
        onUpdateNotIncluded(newNotIncluded);
    };

    return (
        <div className="grid md:grid-cols-2 gap-6 border-b pb-6">
            {/* Inclus */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Inclus</h3>
                <div className="space-y-2">
                    {included.map((item, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Service inclus"
                                value={item}
                                onChange={(e) => updateIncluded(index, e.target.value)}
                                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                            <button
                                type="button"
                                onClick={() => removeIncluded(index)}
                                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addIncluded}
                        className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                    >
                        + Ajouter
                    </button>
                </div>
            </div>

            {/* Non inclus */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Non inclus</h3>
                <div className="space-y-2">
                    {notIncluded.map((item, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Service non inclus"
                                value={item}
                                onChange={(e) => updateNotIncluded(index, e.target.value)}
                                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                            <button
                                type="button"
                                onClick={() => removeNotIncluded(index)}
                                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addNotIncluded}
                        className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                    >
                        + Ajouter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DestinationInclusionsSection;
