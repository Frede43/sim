import axios from 'axios';
import authService from '@/service/authService';
import { DashboardData } from '@/types/dashboard';

const API_URL = import.meta.env.VITE_API_URL;

export const dashboardApi = {
  async getFarmerDashboard(): Promise<DashboardData> {
    try {
      const response = await axios.get<DashboardData>(`${API_URL}/dashboard/farmer/`, {
        headers: authService.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données du tableau de bord:', error);
      throw error;
    }
  }
};
