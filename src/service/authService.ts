import axios, { AxiosError } from 'axios';
import { LoginCredentials, RegisterData, AuthResponse, User } from '@/types/auth';

const API_URL = import.meta.env.VITE_API_URL;

class AuthService {
  private setAuthHeader(token: string | null) {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }

  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('Tentative de connexion avec:', credentials);
      const response = await axios.post<AuthResponse>(`${API_URL}/token/`, credentials);
      console.log('Réponse brute de l\'API:', response);
      console.log('Données de la réponse:', response.data);
      console.log('Informations utilisateur:', response.data.user);
      
      // Vérification détaillée de la réponse
      if (!response.data) {
        throw new Error('La réponse de l\'API est vide');
      }
      
      if (!response.data.user) {
        throw new Error('La réponse de l\'API ne contient pas d\'informations utilisateur');
      }
      
      if (!response.data.user.role) {
        console.error('Données utilisateur reçues:', response.data.user);
        throw new Error('Le rôle de l\'utilisateur est manquant dans la réponse');
      }

      if (response.data.access) {
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        this.setAuthHeader(response.data.access);
      }
      return response.data;
    } catch (error) {
      console.error('Erreur détaillée:', error);
      if (error instanceof AxiosError) {
        console.error('Réponse d\'erreur complète:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers
        });
        throw new Error(error.response?.data?.detail || 'Erreur lors de la connexion');
      }
      throw error;
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, String(value));
          }
        }
      });

      const response = await axios.post<AuthResponse>(`${API_URL}/users/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.access) {
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        this.setAuthHeader(response.data.access);
      }
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        // Gestion détaillée des erreurs
        if (error.response?.data) {
          const errorData = error.response.data;
          if (typeof errorData === 'object') {
            // Si l'erreur contient plusieurs champs
            const errorMessages = Object.entries(errorData)
              .map(([field, messages]) => {
                if (Array.isArray(messages)) {
                  return `${field}: ${messages.join(', ')}`;
                }
                return `${field}: ${messages}`;
              })
              .join('\n');
            throw new Error(errorMessages);
          } else if (typeof errorData === 'string') {
            throw new Error(errorData);
          }
        }
        throw new Error('Erreur lors de l\'inscription. Veuillez vérifier vos informations.');
      }
      throw new Error('Une erreur inattendue est survenue.');
    }
  }

  async refreshToken(): Promise<string> {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) throw new Error('No refresh token');

    try {
      const response = await axios.post<{ access: string }>(`${API_URL}/token/refresh/`, {
        refresh,
      });
      const newToken = response.data.access;
      localStorage.setItem('token', newToken);
      this.setAuthHeader(newToken);
      return newToken;
    } catch (error) {
      this.logout();
      throw new Error('Session expirée');
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const response = await axios.get<User>(`${API_URL}/users/me/`, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      this.logout();
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    this.setAuthHeader(null);
  }

  async getDashboardPath(): Promise<string> {
    const user = await this.getCurrentUser();
    if (!user) return '/login';
    return `/${user.role}/dashboard`;
  }
}

export const authService = new AuthService();
export default authService;
