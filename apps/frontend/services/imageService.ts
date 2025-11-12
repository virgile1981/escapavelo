import { MultiFormatImageUrl } from "@/types/common";

class ImageService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL;


  async upload(file: string | Blob): Promise<MultiFormatImageUrl> {
    const formData = new FormData();
    formData.append('file', file);

    // Envoi du fichier vers le serveur
    const response = await fetch(`${this.baseUrl}/upload/image`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })
    return response.json();
  }

  async delete(fileName: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/upload/${fileName}`, { method: 'DELETE', credentials: 'include' });
    return response.json();
  }
}

export const imageService = new ImageService();