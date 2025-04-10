import { UserRole } from '@/types/auth';

export const ROLES: Record<string, UserRole> = {
  BUYER: 'buyer',
  FARMER: 'farmer',
  COOPERATIVE: 'cooperative',
  FINANCIAL: 'financial',
  GOVERNMENT: 'government',
  NGO: 'ngo',
  ADMIN: 'admin'
} as const;

export const ALL_ROLES = Object.values(ROLES);
