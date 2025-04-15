export interface DashboardData {
  monthlyRevenue: number;
  activeOrders: {
    total: number;
    pendingDelivery: number;
  };
  availableSubsidies: {
    amount: number;
    expiryDate: string | null;
  };
  recentSales: {
    id: number;
    product: string;
    quantity: number;
    unit: string;
    date: string;
    amount: number;
    status: string;
  }[];
  marketPrices: {
    product: string;
    price: number;
    priceChange: number;
  }[];
  fundingOpportunities: {
    title: string;
    provider: string;
    amount: number;
    deadline: string;
  }[];
}
