export function generateSearchParametersUrl<T extends Record<string, unknown>>(formData: T): string {
const searchParams = new URLSearchParams();

    // 1. Utilisation de Object.entries() pour parcourir les paires [clé, valeur]
    for (const [key, value] of Object.entries(formData)) {
        
        // Gère les valeurs null/undefined en les transformant en chaîne vide
        const stringValue = String(value ?? '').toString().trim();
        
        // 2. Ignorer les champs vides, nuls ou ne contenant que des espaces
        if (!stringValue) {
            continue;
        }
        
        // 3. Ajout à l'objet URLSearchParams
        searchParams.append(key, stringValue);
    }
    
    return searchParams.toString();
}

/**
 * Détermine l'URL de l'API en fonction de l'environnement d'exécution (serveur ou client).
 */
export const API_URL: string = (() => {
  if (typeof window === 'undefined') {
    // côté serveur : SSG / SSR
    return process.env.API_URL || 'http://localhost:3000';
  } else {
    // côté client : navigateur
    return process.env.NEXT_PUBLIC_API_URL || '';
  }
})();