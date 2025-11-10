export function cleanFilename(filePath: string): string {
  // Supprime les éventuels chemins
  const base = filePath.split('/').pop() ?? filePath

  // Supprime l'extension
  const nameWithoutExt = base.replace(/\.[^/.]+$/, '')

  return nameWithoutExt
}