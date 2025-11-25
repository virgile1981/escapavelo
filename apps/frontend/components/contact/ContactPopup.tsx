"use client";

import { useState } from "react";
import ContactForm from "@/components/contact/ContactForm";
import Image from "next/image";
import type { MultiFormatImageUrl } from "@/types/common";

interface ContactPopupProps {
    /** Texte du bouton d'ouverture */
    buttonText?: string;
}

export default function ContactPopup({
    buttonText = "Demander des informations",
}: ContactPopupProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Bouton d’ouverture */}
            <button
                onClick={() => setIsOpen(true)}
                className="w-full border border-green-900 text-green-900 py-3 px-4 rounded-lg hover:bg-green-50 transition-colors font-medium"
            >
                {buttonText}
            </button>

            {/* Overlay + popup */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg relative max-w-lg w-full">
                        {/* Bouton de fermeture */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                            aria-label="Fermer"
                        >
                            ×
                        </button>

                        <ContactForm
                            background="bg-green-900 bg-[url('/assets/heightmap.webp')]"
                            textColor="text-white"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
