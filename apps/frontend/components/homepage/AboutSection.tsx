'use client'

import { Send } from "lucide-react";
import { StyleProps } from "../../types/common";

export default function AboutSection({
  background = "bg-sable",
  textColor = "text-gray-900",
}: StyleProps) {
  return (
 <div>
    <div className={` ${background} relative py-20 z-10`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="/assets/portrait.webp"
              alt="Portrait du fondateur"
              className="shadow-xl relative z-10"
            />
            <img
              src="/assets/paysage.webp"
              alt="Voyage à vélo"
              className="shadow-xl absolute -bottom-12 -right-8 z-0"
            />
          </div>
          <div>
            <h2 className={` ${textColor} text-3xl font-bold mb-6 mt-6`}>Qui suis-je ?</h2>
            <p className={` ${textColor} opacity-80'text-lg mb-6`}>
              Je m'appelle Virgile et il y a vingt ans, je découvrais le
              voyage à vélo avec des amis. Au cours de cette aventure, un
              sentiment de liberté est né et ne m'a jamais quitté. Partir avec une
              tente, un réchaud, quelques vêtements et prendre le temps. Le
              temps de contempler, rencontrer.
            </p>
            <p className={`${textColor} opacity-80 text-lg mb-6`}>
              Cette expérience a planté une graine et, très vite, il m'a été impossible de partir sans un vélo.
              Les rêves ont grandi au fil des kilomètres jusqu'à ce grand départ où mes roues m'ont amené sur 
              les routes du monde pendant cinq années. Au retour, je m'imaginais déjà partager cette passion. 
            </p>
            <p className={`${textColor} opacity-80 text-lg mb-6`}>
              Après une formation de guide touristique, plusieurs
              expériences en tant qu'organisateur de séjours à vélo et comme guide touristique,
              l'idée de créer ma propre agence s'est imposée naturellement.
            </p>
            <p className={`${textColor} opacity-80 text-lg mb-6`}>                  
              Ce que je souhaite avant tout, c'est partager ce qui fait la magie de ce type de voyage.
              Vous emmener sur mes plus beaux itinéraires avec des prestations de qualité pour rendre chaque séjour unique.
              Et parce que ces voyages doivent vous ressembler, vos envies, vos besoins, sont au cœur de mes priorités. Votre voix compte !
            </p>
            <a
              href="https://forms.gle/J5ExJVYLDywT72KYA"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center bg-green-900 text-white px-8 py-4 text-lg font-medium hover:bg-green-700 transition-colors`}
            >
              Répondre au questionnaire
               <Send className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="w-full h-12 bg-contain bg-repeat-x relative z-20 border-dirt-brown -mb-12 bg-[url('/assets/border.png')] filter-sable"></div> 
  </div>
  );
}