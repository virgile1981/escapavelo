// Générer automatiquement les interfaces de validation à partir des formulaires
export type State<T> = {
  success: boolean;
  payload?: T;
  errors?: {
    [K in keyof T]?: string[] | undefined; // erreurs pour chaque champ
  } & { general?: string[] | undefined;} // erreurs générales
};