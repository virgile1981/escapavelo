'use client';

import { useState, FormEvent } from 'react';
import { ContactService } from '../../services/contactService';
import {FormData} from '../../types/contact';
interface Props {
  background?: string;
  textColor?: string;
  onSubmit?: () => void; // équivalent du `emit('submit')`
}


export default function ContactForm({
  background = 'bg-green-900',
  textColor = 'text-white',
  onSubmit,
}: Props) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactService = new ContactService();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await contactService.sendEmail(formData);
      alert('Message envoyé avec succès !');
      setFormData({ name: '', email: '', message: '' });
      onSubmit?.(); // équivalent à `emit('submit')`
    } catch (error) {
      console.error('Erreur:', error);
      alert("Erreur lors de l'envoi du message. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-6 bg-white/10 p-6 rounded-lg backdrop-blur-sm ${background}`}
    >
      <div>
        <label
          htmlFor="name"
          className={`block text-sm font-medium mb-1 ${textColor}`}
        >
          Nom
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-white/90 border-0 rounded-lg focus:ring-2 focus:ring-white focus:bg-white transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className={`block text-sm font-medium mb-1 ${textColor}`}
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-white/90 border-0 rounded-lg focus:ring-2 focus:ring-white focus:bg-white transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className={`block text-sm font-medium mb-1 ${textColor}`}
        >
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-white/90 border-0 rounded-lg focus:ring-2 focus:ring-white focus:bg-white transition-colors"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-white text-green-900 px-6 py-3 rounded-lg text-lg font-medium transition-colors ${
          isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-white/90'
        }`}
      >
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>
    </form>
  );
}
