'use server';

import { contactService } from '@/services/contactService';
import { type State } from '@/types/actionState';
import { type ContactFields } from '@/types/contact';
import { z } from 'zod';

// Schema pour valider les données côté serveur
const contactSchema = z.object({
  name: z.string().min(2, 'Le nom est trop court'),
  email: z.string().email('Email invalide'),
  message: z.string().min(10, 'Le message est trop court'),
});

export async function contactAction(formData: FormData): Promise<State<ContactFields>> {
  const payload = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    message: String(formData.get('message') ?? '')
  } as ContactFields
  const parsed = contactSchema.safeParse(payload);   // Validation serveur

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      payload
    };
  }
  try {
    await contactService.sendEmail(payload);
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, errors: { general: ['Impossible d’envoyer le message.'] }, payload };
  }
}
