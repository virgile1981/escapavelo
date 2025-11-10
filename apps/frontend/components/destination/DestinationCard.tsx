import { Destination } from "@/types/trip";
import { Calendar, Link, MapPin } from "lucide-react";
import DifficultyIndicator from "../shared/DifficultyIndicator";


export default function DestinationCard({ destination }: { destination: Destination }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <div
      key={destination.id}
      className="bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >

      {destination.imageUrl && (
        <img
          src={`${baseUrl}/uploads/${destination.imageUrl.resizedUrl}`}
          alt={destination.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-6">
        <div className="flex justify-between mb-2 text-sm text-gray-500">
          <span>{destination.region}</span>
          <DifficultyIndicator level={destination.difficulty} />
        </div>
        <h3 className="text-xl font-semibold mb-2">{destination.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>

        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{destination.duration} jours / {destination.duration - 1} nuits</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{destination.distance} kms</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <div>À partir de</div>
            <div className="text-2xl font-bold text-green-900">{destination.price}€</div>
          </div>
          <a
            href={`/destination/${destination.slug}`}
            className="bg-green-900 text-white px-4 py-2 hover:bg-green-800 transition-colors"
          >
            Voir le détail
          </a>
        </div>
      </div>
    </div>
  );
}