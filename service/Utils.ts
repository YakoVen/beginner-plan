export async function urlToFile(url: string, filename: string): Promise<File> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch file from ${url}: ${response.status}`);
  }
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}

/**
 * Formats a DZD amount with at most 2 decimals (fr-FR: "15 609,25").
 * Always use this for rendered money: raw JS floats produce artifacts like
 * 15609.2499999 that overflow stat cards and look broken.
 */
export function formatPrice(value: number): string {
  if (!Number.isFinite(value)) return '0';
  return value.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}
