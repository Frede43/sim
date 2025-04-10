import { UserRole } from '@/types/auth';

export const getDashboardPathByRole = (role: UserRole): string => {
  switch (role) {
    case 'buyer':
      return '/dashboard/buyer';
    case 'farmer':
      return '/dashboard/farmer';
    case 'cooperative':
      return '/dashboard/cooperative';
    case 'financial':
      return '/dashboard/financial';
    case 'government':
      return '/dashboard/government';
    case 'ngo':
      return '/dashboard/ngo';
    case 'admin':
      return '/admin';
    default:
      return '/dashboard';
  }
};

export const isValidRole = (role: string): role is UserRole => {
  return ['buyer', 'farmer', 'cooperative', 'financial', 'government', 'ngo', 'admin'].includes(role);
};

export const getRoleLabel = (role: UserRole): string => {
  switch (role) {
    case 'buyer':
      return 'Acheteur';
    case 'farmer':
      return 'Agriculteur';
    case 'cooperative':
      return 'Coopérative';
    case 'financial':
      return 'Institution financière';
    case 'government':
      return 'Autorité gouvernementale';
    case 'ngo':
      return 'ONG';
    case 'admin':
      return 'Administrateur';
    default:
      return 'Utilisateur';
  }
};
