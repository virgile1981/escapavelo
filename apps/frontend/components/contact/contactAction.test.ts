import { describe, it, expect, vi, beforeEach } from 'vitest';
import { contactService } from '@/services/contactService';
import { contactAction } from './ContactAction';

// 1. Simuler le module contactService
// Crée une fonction mock pour sendEmail
vi.mock('@/services/contactService', () => ({
  contactService: {
    sendEmail: vi.fn(), 
  },
}));

// Type pour les données de formulaire valides pour faciliter la création des FormData
const VALID_FORM_DATA = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  message: 'Ceci est un message de test qui contient plus de dix caractères.',
};

// Fonction utilitaire pour créer une instance de FormData à partir d'un objet
const createFormData = (data: Record<string, string>): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
};

// Réinitialiser le mock avant chaque test
beforeEach(() => {
  vi.clearAllMocks();
});

describe('contactAction (Server Action)', () => {
  // --- CAS 1: Succès avec des données valides ---
  it('devrait retourner success: true et appeler sendEmail pour des données valides', async () => {
    // 1. Configurer le mock: simuler un envoi d'email réussi
    (contactService.sendEmail as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);

    const formData = createFormData(VALID_FORM_DATA);
    
    // Act
    const result = await contactAction({}, formData);

    // Assert
    // 2. Vérifier que la réponse est un succès
    expect(result.success).toBe(true);
    // 3. Vérifier que sendEmail a été appelé avec le bon payload
    expect(contactService.sendEmail).toHaveBeenCalledWith(VALID_FORM_DATA);
    expect(contactService.sendEmail).toHaveBeenCalledTimes(1);
  });

  // --- CAS 2: Échec de la validation Zod (Nom trop court) ---
  it('devrait retourner success: false et les erreurs de validation (nom trop court)', async () => {
    // Arrange: Données invalides (name: 'A' => min(2) échoue)
    const invalidData = {
      ...VALID_FORM_DATA,
      name: 'A', 
    };
    const formData = createFormData(invalidData);
    
    // Act
    const result = await contactAction({}, formData);

    // Assert
    // 1. Vérifier que c'est un échec
    expect(result.success).toBe(false);
    // 2. Vérifier la structure de l'erreur
    expect(result.errors).toEqual({
      name: ['Le nom est trop court'],
    });
    // 3. Vérifier que le service n'a PAS été appelé
    expect(contactService.sendEmail).not.toHaveBeenCalled();
  });

  // --- CAS 3: Échec de la validation Zod (Email invalide) ---
  it('devrait retourner success: false et les erreurs de validation (email invalide)', async () => {
    // Arrange: Données invalides (email mal formaté)
    const invalidData = {
      ...VALID_FORM_DATA,
      email: 'not-an-email', 
    };
    const formData = createFormData(invalidData);
    
    // Act
    const result = await contactAction({}, formData);

    // Assert
    expect(result.success).toBe(false);
    expect(result.errors).toEqual({
      email: ['Email invalide'],
    });
    expect(contactService.sendEmail).not.toHaveBeenCalled();
  });

  // --- CAS 4: Échec interne du service (Exemple: erreur réseau) ---
  it('devrait retourner une erreur générale si sendEmail échoue', async () => {
    // 1. Configurer le mock: simuler une erreur
    const serviceError = new Error('Erreur de connexion au serveur SMTP');
    (contactService.sendEmail as ReturnType<typeof vi.fn>).mockRejectedValue(serviceError);

    const formData = createFormData(VALID_FORM_DATA);

    // Act
    const result = await contactAction({}, formData);

    // Assert
    // 2. Vérifier que c'est un échec
    expect(result.success).toBe(false);
    // 3. Vérifier la structure de l'erreur générale
    expect(result.errors?.general).toBeDefined();
    // 4. Vérifier que sendEmail a bien été appelé
    expect(contactService.sendEmail).toHaveBeenCalledTimes(1);
  });

});