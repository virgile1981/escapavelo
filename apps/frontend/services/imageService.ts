import { type Context, type MultiFormatImageUrl } from "@escapavelo/shared-types";

class ImageService {
  private apiUrl = process.env.NEXT_PUBLIC_API_URL;


  async upload(file: string | Blob, context: Context): Promise<MultiFormatImageUrl> {
    const formData = new FormData();
    formData.append('file', file);

    // Envoi du fichier vers le serveur
    const response = await fetch(`${this.apiUrl}/upload/${context}/image`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })
    return response.json();
  }

  async delete(fileName: string): Promise<void> {
    const response = await fetch(`${this.apiUrl}/upload/${fileName}`, { method: 'DELETE', credentials: 'include' });
    return response.json();
  }
}

export const imageService = new ImageService();