import { BlogPost } from "../types/blog"


export class BlogService {
   
  private baseUrl = process.env.NEXT_PUBLIC_API_URL + '/blog'

  async getPost(id: string): Promise<BlogPost> {
    const response = await fetch(`${this.baseUrl}/${id}`)
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération de l\'article')
    }
    return response.json()
  }

  async updatePost(id: string, post: BlogPost): Promise<BlogPost> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post)
    })
    
    if (!response.ok) {
      throw new Error('Erreur lors de la sauvegarde de l\'article')
    }
    
    return response.json()
  }

  async getAllPosts(status: 'draft' | 'published' | undefined): Promise<BlogPost[]> {
    const statusQuery = status ? `?status=${status}` : ''

    const response = await fetch(`${this.baseUrl}${statusQuery}`)
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des articles')
    }
    return response.json()
  }

  async getLastPosts(limit: number = 3): Promise<BlogPost[]> {
    const response = await fetch(`${this.baseUrl}/latest?limit=${limit}`)
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des articles')
    }
    return response.json()
  }

  async createPost(post: BlogPost): Promise<BlogPost> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post)
    })
    
    if (!response.ok) {
      throw new Error('Erreur lors de la création de l\'article')
    }
    
    return response.json()
  }

  async deletePost(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de l\'article')
    }
  }
}