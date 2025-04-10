import axios from 'axios';
import { API_URL } from '@/config/constants';
import { User } from '@/types/auth';

export interface ProfileUpdateData {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  location?: string;
  farm_size?: number;
  cooperative_name?: string;
  registration_number?: string;
  institution_name?: string;
  avatar?: File;
}

class ProfileService {
  async updateProfile(userId: number, data: ProfileUpdateData): Promise<User> {
    const formData = new FormData();
    
    // Ajouter tous les champs au FormData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const response = await axios.patch<User>(
      `${API_URL}/users/${userId}/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  }

  async uploadAvatar(userId: number, file: File): Promise<User> {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await axios.patch<User>(
      `${API_URL}/users/${userId}/avatar/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  }

  async getProfileStatistics(userId: number): Promise<any> {
    const response = await axios.get(`${API_URL}/users/${userId}/statistics/`);
    return response.data;
  }
}

export default new ProfileService();
