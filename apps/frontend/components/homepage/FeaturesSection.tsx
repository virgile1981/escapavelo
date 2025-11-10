'use client';

import { StyleProps } from '@/types/common';
import { Search, HeartHandshake, Sparkles } from 'lucide-react';


interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

export default function FeaturesSection({
  background = 'bg-green-900',
  textColor = 'text-white',
}: StyleProps) {

  const features: Feature[] = [
    {
      icon: Search,
      title: 'Une étude minutieuse',
      description:
        "Chaque itinéraire est le fruit d'une exploration minutieuse, pensée pour vous assurer les plus belles aventures.",
    },
    {
      icon: HeartHandshake,
      title: 'À votre écoute',
      description:
        "Vos besoins et envies nourrissent chaque étape de la création pour dessiner des séjours qui vous ressemblent.",
    },
    {
      icon: Sparkles,
      title: 'Le goût du partage',
      description:
        "Chaque séjour est empreint d'une invitation à découvrir ce qui m'a inspiré, émerveillé ou fasciné au long du chemin.",
    },
  ];

  return (
    <div
      className={`${background} relative py-20 bg-center pt-12 xs:pt-16 sm:pt-20 md:pt-24 pb-12 xs:pb-16 sm:pb-20 md:pb-24 scroll-my-28 z-10`}
    >
      <div className="max-w-7xl mx-auto px-4 relative z-20">
        <h2 className={`${textColor} text-3xl font-bold text-center mb-16`}>
          La recette des futures escapades
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="text-center"
              >
                <div className="bg-white/90 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-green-900" />
                </div>
                <h3 className={`${textColor} text-xl font-semibold mb-3`}>
                  {feature.title}
                </h3>
                <p className={`${textColor} opacity-80`}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
