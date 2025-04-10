// API configuration
export const API_URL = 'http://localhost:8000/api';

// File upload configuration
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

// Pagination configuration
export const DEFAULT_PAGE_SIZE = 10;

// Date format configuration
export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm';

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
};

// Theme configuration
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

// Language configuration
export const LANGUAGES = {
  FR: 'fr',
  EN: 'en',
} as const;

// Role-specific colors
export const ROLE_COLORS = {
  farmer: 'bg-agri',
  cooperative: 'bg-earth',
  government: 'bg-lavender',
  ngo: 'bg-water',
  financial: 'bg-sunset',
  buyer: 'bg-berry',
  admin: 'bg-primary',
} as const;
