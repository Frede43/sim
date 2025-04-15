import { 
  Home, 
  Wheat,
  ShoppingCart,
  CreditCard,
  Users,
  LineChart,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';

interface FarmerDashboardLayoutProps {
  children: React.ReactNode;
}

const FarmerDashboardLayout = ({ children }: FarmerDashboardLayoutProps) => {
  const location = useLocation();

  const sidebarItems = [
    {
      icon: Home,
      label: 'Tableau de bord',
      href: '/dashboard/farmer',
      active: location.pathname === '/dashboard/farmer',
    },
    {
      icon: Wheat,
      label: 'Mes Produits',
      href: '/dashboard/farmer/products',
      active: location.pathname === '/dashboard/farmer/products',
    },
    {
      icon: ShoppingCart,
      label: 'Mes Ventes',
      href: '/dashboard/farmer/sales',
      active: location.pathname === '/dashboard/farmer/sales',
    },
    {
      icon: Users,
      label: 'Coopératives',
      href: '/dashboard/farmer/cooperatives',
      active: location.pathname === '/dashboard/farmer/cooperatives',
    },
    {
      icon: LineChart,
      label: 'Analytiques',
      href: '/dashboard/farmer/analytics',
      active: location.pathname === '/dashboard/farmer/analytics',
    },
    {
      icon: AlertTriangle,
      label: 'Risques',
      href: '/dashboard/farmer/risks',
      active: location.pathname === '/dashboard/farmer/risks',
    },
    {
      icon: CreditCard,
      label: 'Subventions',
      href: '/dashboard/farmer/subsidies',
      active: location.pathname === '/dashboard/farmer/subsidies',
    },
    {
      icon: FileText,
      label: 'Rapports',
      href: '/dashboard/farmer/reports',
      active: location.pathname === '/dashboard/farmer/reports',
    },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      {children}
    </DashboardLayout>
  );
};

export default FarmerDashboardLayout;
