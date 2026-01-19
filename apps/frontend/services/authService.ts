
export class AuthService {

    private baseUrl = process.env.NEXT_PUBLIC_API_URL + '/auth'

    async login(login: string, password: string): Promise<any> {
        const response = await fetch(`${this.baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password }),
            credentials: 'include',
        })

        if (!response.ok) {
            throw new Error('Erreur lors de l\'authentification')
        }

        return response.json()
    }

    async logout() {

        await fetch(`${this.baseUrl}/logout`, {
            method: 'POST',
            credentials: 'include',
        });
    }
}