import { 
  Home,
  Wheat,
  Users,
  Store,
  LineChart,
  AlertTriangle,
  Banknote,
  FileText
} from 'lucide-react';

export const sidebarItems = [
  {
    label: "Tableau de bord",
    href: "/dashboard/farmer",
    icon: Home
  },
  {
    label: "Mes Produits",
    href: "/dashboard/farmer/products",
    icon: Wheat,
    active: true
  },
  {
    label: "Coopératives",
    href: "/dashboard/farmer/cooperatives",
    icon: Users
  },
  {
    label: "Marché",
    href: "/dashboard/farmer/market",
    icon: Store
  },
  {
    label: "Analytiques",
    href: "/dashboard/farmer/analytics",
    icon: LineChart
  },
  {
    label: "Risques",
    href: "/dashboard/farmer/risks",
    icon: AlertTriangle
  },
  {
    label: "Subventions",
    href: "/dashboard/farmer/subsidies",
    icon: Banknote
  },
  {
    label: "Rapports",
    href: "/dashboard/farmer/reports",
    icon: FileText
  }
];
