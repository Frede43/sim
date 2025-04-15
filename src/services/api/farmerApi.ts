import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface Farmer {
  id: string;
  name: string;
  location: string;
  joinedDate: string;
  status: 'active' | 'inactive';
}

export interface Product {
  id: string;
  name: string;
  quantity: string;
  quality: string;
  price: string;
  date: string;
  status: string;
  description?: string;
  farmerId: string;
}

export interface Sale {
  id: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  date: string;
  buyerId: string;
}

export interface Cooperative {
  id: string;
  name: string;
  memberCount: number;
  location: string;
}

export interface Subsidy {
  id: string;
  title: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  applicationDate: string;
}

export const farmerApi = {
  // Analytics
  getAnalytics: async (farmerId: string) => {
    const response = await axios.get(`${API_BASE_URL}/farmers/${farmerId}/analytics`);
    return response.data;
  },

  // Products
  getProducts: async (farmerId: string) => {
    const response = await axios.get(`${API_BASE_URL}/farmers/${farmerId}/products`);
    return response.data;
  },

  addProduct: async (farmerId: string, product: Omit<Product, 'id' | 'farmerId'>) => {
    const response = await axios.post(`${API_BASE_URL}/farmers/${farmerId}/products`, product);
    return response.data;
  },

  updateProduct: async (farmerId: string, productId: string, updates: Partial<Product>) => {
    const response = await axios.put(`${API_BASE_URL}/farmers/${farmerId}/products/${productId}`, updates);
    return response.data;
  },

  deleteProduct: async (farmerId: string, productId: string) => {
    const response = await axios.delete(`${API_BASE_URL}/farmers/${farmerId}/products/${productId}`);
    return response.data;
  },

  // Sales
  getSales: async (farmerId: string) => {
    const response = await axios.get(`${API_BASE_URL}/farmers/${farmerId}/sales`);
    return response.data;
  },

  addSale: async (farmerId: string, sale: Omit<Sale, 'id'>) => {
    const response = await axios.post(`${API_BASE_URL}/farmers/${farmerId}/sales`, sale);
    return response.data;
  },

  // Cooperatives
  getCooperatives: async (farmerId: string) => {
    const response = await axios.get(`${API_BASE_URL}/farmers/${farmerId}/cooperatives`);
    return response.data;
  },

  joinCooperative: async (farmerId: string, cooperativeId: string) => {
    const response = await axios.post(`${API_BASE_URL}/farmers/${farmerId}/cooperatives/${cooperativeId}/join`);
    return response.data;
  },

  // Market
  getMarketPrices: async () => {
    const response = await axios.get(`${API_BASE_URL}/market/prices`);
    return response.data;
  },

  getMarketDemand: async () => {
    const response = await axios.get(`${API_BASE_URL}/market/demand`);
    return response.data;
  },

  // Subsidies
  getSubsidies: async (farmerId: string) => {
    const response = await axios.get(`${API_BASE_URL}/farmers/${farmerId}/subsidies`);
    return response.data;
  },

  applyForSubsidy: async (farmerId: string, subsidyApplication: { programId: string; details: any }) => {
    const response = await axios.post(`${API_BASE_URL}/farmers/${farmerId}/subsidies/apply`, subsidyApplication);
    return response.data;
  }
};


