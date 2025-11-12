'use client';
import { useState } from 'react';

interface SearchFilters {
  region?: string;
  duration?: string;
  difficulty?: string;
  maxPrice?: string;
  search?: string;
}

export default function SearchForm({
  background = 'bg-green-900',
  textColor = 'text-white',
}: {
  background?: string;
  textColor?: string;
}) {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    region: '',
    duration: '',
    difficulty: '',
    maxPrice: '',
    search: '',
  });

  const durationMax = [{ id: 2, label: "1-2 jours" }, { id: 4, label: "3-4 jours" }, { id: 7, label: "5-7 jours" }, { id: 99, label: "8+ jours" }] as { id: number, label: string }[];

  const handleChange = (field: keyof SearchFilters, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recherche avec les filtres :', searchFilters);
    // Vous pouvez déclencher ici une requête API ou router.push() selon votre besoin
  };

  return (
    <div className={`w-full flex justify-center content-center flex-col p-5 ${background}`}>
      <div className="flex justify-center pt-5">
        <h3 className={`text-xl font-semibold ${textColor}`}>
          Trouvez votre prochaine aventure
        </h3>
      </div>

      <div className="p-5 mb-6">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Durée */}
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Durée
              </label>
              <select
                id="duration"
                value={searchFilters.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Toutes les durées</option>
                {durationMax.map((option) => (
                  <option value={option.id}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Difficulté */}
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
                Difficulté
              </label>
              <select
                id="difficulty"
                value={searchFilters.difficulty}
                onChange={(e) => handleChange('difficulty', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Toutes les difficultés</option>
                <option value="1">Facile</option>
                <option value="2">Modéré</option>
                <option value="3">Difficile</option>
              </select>
            </div>

            {/* Prix maximum */}
            <div>
              <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-2">
                Prix maximum
              </label>
              <select
                id="maxPrice"
                value={searchFilters.maxPrice}
                onChange={(e) => handleChange('maxPrice', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Tous les prix</option>
                <option value="300">Jusqu’à 300€</option>
                <option value="500">Jusqu’à 500€</option>
                <option value="800">Jusqu’à 800€</option>
                <option value="1000">Jusqu’à 1000€</option>
              </select>
            </div>

            {/* Bouton */}
            <div className="inline-block content-end justify-self-center">
              <button
                type="submit"
                className="bg-green-900 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition-colors"
              >
                Trouvez votre séjour
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
