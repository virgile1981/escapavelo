'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Facebook, Instagram, MapPin, Mail, Phone, ArrowRight } from 'lucide-react'

// Exemple : vous pouvez remplacer ceci par un vrai service ou une API route
async function subscribeToNewsletter(email: string) {
  const response = await fetch('/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  if (!response.ok) throw new Error('Erreur lors de l\'inscription')
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubscribe = async () => {
    if (!email) return alert('Veuillez entrer une adresse email valide.')
    setIsSubmitting(true)
    try {
      await subscribeToNewsletter(email)
      alert('Votre email a bien été enregistré.')
      setEmail('')
    } catch {
      alert('Votre email n\'a pas pu être enregistré.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="relative bg-black text-white py-12 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Liens rapides */}
          <div>
            <h3 className="text-xl font-bold mb-6">Liens rapides</h3>
            <ul className="space-y-3">
              <li><Link href="/">Accueil</Link></li>
              <li><Link href="/destination">Destinations</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-green-700" />
                <span className="text-gray-300 ml-3">contact@escapavelo.fr</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-green-700" />
                <span className="text-gray-300 ml-3">+33 7 82 23 20 16</span>
              </li>
              <li className="flex items-center">
                <MapPin className="w-5 h-5 text-green-700" />
                <span className="text-gray-300 ml-3">Toulouse, France</span>
              </li>
            </ul>
          </div>

          {/* Réseaux + Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6">Suivez-nous</h3>
            <p className="text-gray-300 mb-6">
              Découvrez les dernières actualités
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/escapavelo"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-xl hover:shadow-lg hover:shadow-pink-500/25 transition-all transform hover:scale-110"
              >
                <Instagram className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
              </a>
              <a
                href="https://www.facebook.com/carnetdespossibles/"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-blue-600 to-blue-800 p-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all transform hover:scale-110"
              >
                <Facebook className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
              </a>
            </div>

            {/* Newsletter */}
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-sm text-gray-300 mb-2">Newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  disabled={isSubmitting}
                  className="flex-1 bg-white/10 border border-white/20 rounded-l-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-700"
                />
                <button
                  onClick={handleSubscribe}
                  disabled={isSubmitting}
                  className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-r-lg transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Escapavélo. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
