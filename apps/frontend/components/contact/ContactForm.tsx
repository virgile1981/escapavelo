'use client';

import { useActionState } from 'react';
import { StyleProps } from '@/types/common';
import { contactAction } from './ContactAction';
import { State } from '@/types/actionState';
import { ContactFields } from '@/types/contact';
import { ErrorMessage } from '@/components/shared/ErrorMessage';

export default function ContactForm({
  background = 'bg-green-900',
  textColor = 'text-white',
}: StyleProps) {
  const initialState: State<ContactFields> = { success: false };
  const [state, formAction, pending] = useActionState<State<ContactFields>, FormData>(contactAction, initialState);

  return (
    <form
      action={formAction}
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
          name="name"
          required
          disabled={pending}
          defaultValue={state.payload?.name}
          className="w-full px-4 py-2 bg-white/90 border-0 rounded-lg focus:ring-2 focus:ring-white focus:bg-white transition-colors"
        />
        <div className="p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
          {state?.errors?.name && <p style={{ color: 'red' }}>{state.errors.name[0]}</p>}
        </div>
        <ErrorMessage messages={state?.errors?.name}></ErrorMessage>
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
          name="email"
          required
          disabled={pending}
          defaultValue={state.payload?.email}
          className="w-full px-4 py-2 bg-white/90 border-0 rounded-lg focus:ring-2 focus:ring-white focus:bg-white transition-colors"
        />
        <ErrorMessage messages={state?.errors?.email}></ErrorMessage>
      </div>

      <div>
        <label
          htmlFor="message"
          className={`block text-sm font-medium mb-1 ${textColor}`}
        >
          Message
        </label>
        <textarea
          name="message"
          rows={4}
          required
          disabled={pending}
          defaultValue={state.payload?.message}
          className="w-full px-4 py-2 bg-white/90 border-0 rounded-lg focus:ring-2 focus:ring-white focus:bg-white transition-colors"
        ></textarea>
        <ErrorMessage messages={state?.errors?.message}></ErrorMessage>
      </div>

      <button
        type="submit"
        disabled={pending}
        className={`w-full bg-white text-green-900 px-6 py-3 rounded-lg text-lg font-medium transition-colors ${pending ? 'opacity-75 cursor-not-allowed' : 'hover:bg-white/90'
          }`}
      >
        {pending ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>
      {state?.success && <p style={{ color: 'green' }}>Message envoyé avec succès !</p>}
      <ErrorMessage messages={state?.errors?.general}></ErrorMessage>
    </form>
  );
}
