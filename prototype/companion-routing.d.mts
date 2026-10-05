export function routeCompanion(characters: readonly ('tung' | 'ha-vy')[], message: string, target?: 'tung' | 'ha-vy' | null): {
  primary: 'tung' | 'ha-vy' | undefined;
  secondary?: 'tung' | 'ha-vy';
};
