export type UserRole = 'buyer' | 'farmer' | 'cooperative' | 'financial' | 'government' | 'ngo' | 'admin';

export interface BaseUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  avatar?: string;
  phone: string;
  created_at: string;
  updated_at: string;
  name?: string;
  bio?: string;
  location?: string;
  joinDate?: string;
  statistics?: Record<string, number | string>;
}

// Champs spécifiques pour chaque rôle
export interface FarmerFields {
  farm_size: number;
  location: string;
  products?: string[];
}

export interface CooperativeFields {
  cooperative_name: string;
  registration_number: string;
  member_count: number;
  location: string;
}

export interface BuyerFields {
  company_name?: string;
  business_type?: string;
  purchase_volume?: number;
}

export interface FinancialFields {
  institution_name: string;
  license_number: string;
  services: string[];
}

export interface GovernmentFields {
  department: string;
  position: string;
  jurisdiction: string;
}

export interface NGOFields {
  organization_name: string;
  focus_areas: string[];
  registration_number: string;
}

// Type User complet avec les champs spécifiques au rôle
export type User = BaseUser & Partial<
  FarmerFields &
  CooperativeFields &
  BuyerFields &
  FinancialFields &
  GovernmentFields &
  NGOFields
>;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  phone: string;
  // Champs optionnels spécifiques au rôle
  farm_size?: number;
  location?: string;
  cooperative_name?: string;
  registration_number?: string;
  institution_name?: string;
}

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

export interface AuthResponse {
  user: User;
  access: string;
  refresh: string;
  message?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
