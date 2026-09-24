export async function urlToFile(url: string, filename: string): Promise<File> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch file from ${url}: ${response.status}`);
  }
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}
