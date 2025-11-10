'use client'

import { useEffect, useState } from 'react'
import { DestinationService } from '../../services/destinationService';
import { Destination } from '../../types/trip';
import DestinationCard from '../destination/DestinationCard';

export default function PopularTrips({ background = 'bg-sable', textColor = 'text-green-900' }) {
  const [trips, setTrips] = useState<Destination[]>([]);
  const [error, setError] = useState<string>();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // équivalent à runtimeConfig.public.baseUrl
  const travelService = new DestinationService();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const travelsData = await travelService.getPromotedTrips();
        setTrips(travelsData);
      } catch (err) {
        console.error('Erreur :', err);
        setError('Erreur lors du chargement des séjours');
      }
    };
    fetchTrips();


  }, []);

  return (
    <div className={`${background} relative py-20 bg-center pt-12 xs:pt-16 sm:pt-20 md:pt-24 pb-12 xs:pb-16 sm:pb-20 md:pb-24 scroll-my-28 z-10`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className={`${textColor} text-3xl font-bold mb-12 text-center`}>
          Nos séjours les plus populaires
        </h2>

        {error && <div className="text-red-600 text-center mb-6">{error}</div>}

        <div className="grid md:grid-cols-3 gap-8">
          {trips.map((trip) => (
            <DestinationCard key={trip.id} destination={trip}></DestinationCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/destination"
            className="inline-flex items-center bg-sable text-black px-6 py-3 text-lg font-medium hover:bg-white/90 transition-colors"
          >
            Découvrez nos séjours à vélo
          </a>
        </div>
      </div>
    </div>
  );
}