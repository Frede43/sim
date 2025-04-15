import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';
import Home from './pages/Index';
import BuyerDashboard from './pages/dashboard/BuyerDashboard';
import FarmerDashboard from './pages/dashboard/FarmerDashboard';
import CooperativeDashboard from './pages/dashboard/CooperativeDashboard';
import GovernmentDashboard from './pages/dashboard/GovernmentDashboard';
import NgoDashboard from './pages/dashboard/NgoDashboard';
import FinancialDashboard from './pages/dashboard/FinancialDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import PersistLogin from './components/PersistLogin';
import { ROLES, ALL_ROLES } from './constants/roles';
import Profile from "./pages/Profile";
import NotFound from './pages/NotFound';
import About from './pages/About';
import FeaturesPage from './pages/FeaturesPage';
import Contact from './pages/Contact';

// Service pages
import AgriculteurServices from './pages/services/AgriculteurServices';
import CooperativeServices from './pages/services/CooperativeServices';
import AcheteurServices from './pages/services/AcheteurServices';
import FinanciersServices from './pages/services/FinanciersServices';
import AutoritesServices from './pages/services/AutoritesServices';
import OngsServices from './pages/services/OngsServices';

// Buyer pages
import BuyerCatalog from './pages/dashboard/buyer/BuyerCatalog';
import Checkout from './pages/dashboard/buyer/Checkout';
import BuyerOrders from './pages/dashboard/buyer/BuyerOrders';
import BuyerSuppliers from './pages/dashboard/buyer/BuyerSuppliers';
import ProductDetails from './pages/dashboard/buyer/ProductDetails';

// Farmer pages
import FarmerProducts from './pages/dashboard/farmer/FarmerProducts';
import FarmerSales from './pages/dashboard/farmer/FarmerSales';
import FarmerSubsidies from './pages/dashboard/farmer/FarmerSubsidies';
import FarmerMarket from './pages/dashboard/farmer/FarmerMarket';
import FarmerCooperatives from './pages/dashboard/farmer/FarmerCooperatives';

// Cooperative pages
import CooperativeMembers from './pages/dashboard/cooperative/CooperativeMembers';
import CooperativeProducts from './pages/dashboard/cooperative/CooperativeProducts';
import CooperativeStats from './pages/dashboard/cooperative/CooperativeStats';
import CooperativeSubsidies from './pages/dashboard/cooperative/CooperativeSubsidies';
import CooperativeReports from './pages/dashboard/cooperative/CooperativeReports';

// Government pages
import GovernmentStats from './pages/dashboard/government/GovernmentStats';
import GovernmentMap from './pages/dashboard/government/GovernmentMap';
import GovernmentReports from './pages/dashboard/government/GovernmentReports';
import GovernmentAlerts from './pages/dashboard/government/GovernmentAlerts';

// Financial pages
import FinancialBorrowers from './pages/dashboard/financial/FinancialBorrowers';
import FinancialLoans from './pages/dashboard/financial/FinancialLoans';
import FinancialStats from './pages/dashboard/financial/FinancialStats';
import FinancialNotifications from './pages/dashboard/financial/FinancialNotifications';
import FinancialRisk from './pages/dashboard/financial/FinancialRisk';

// NGO pages
import NgoBeneficiaries from './pages/dashboard/ngo/NgoBeneficiaries';
import NgoProjects from './pages/dashboard/ngo/NgoProjects';
import NgoImpact from './pages/dashboard/ngo/NgoImpact';
import NgoMap from './pages/dashboard/ngo/NgoMap';
import NgoReports from './pages/dashboard/ngo/NgoReports';
import NgoFunding from './pages/dashboard/ngo/NgoFunding';
import FarmerDashboardLayout from './layouts/FarmerDashboardLayout';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/about" element={<About />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* Service pages */}
      <Route path="/services/agriculteurs" element={<AgriculteurServices />} />
      <Route path="/services/cooperatives" element={<CooperativeServices />} />
      <Route path="/services/acheteurs" element={<AcheteurServices />} />
      <Route path="/services/financiers" element={<FinanciersServices />} />
      <Route path="/services/autorites" element={<AutoritesServices />} />
      <Route path="/services/ongs" element={<OngsServices />} />
      
      {/* Protected routes */}
      <Route element={<PersistLogin />}>
        <Route path="/profile" element={<ProtectedRoute component={Profile} roles={ALL_ROLES} />} />
        
        {/* Buyer routes */}
        <Route path="/dashboard/buyer" element={<ProtectedRoute component={BuyerDashboard} roles={[ROLES.BUYER]} />}>
          <Route path="catalog" element={<ProtectedRoute component={BuyerCatalog} roles={[ROLES.BUYER]} />} />
          <Route path="checkout" element={<ProtectedRoute component={Checkout} roles={[ROLES.BUYER]} />} />
          <Route path="orders" element={<ProtectedRoute component={BuyerOrders} roles={[ROLES.BUYER]} />} />
          <Route path="suppliers" element={<ProtectedRoute component={BuyerSuppliers} roles={[ROLES.BUYER]} />} />
          <Route path="products/:id" element={<ProtectedRoute component={ProductDetails} roles={[ROLES.BUYER]} />} />
        </Route>

        {/* Farmer routes */}
        <Route path="/dashboard/farmer" element={<ProtectedRoute component={FarmerDashboardLayout} roles={[ROLES.FARMER]} />}>
          <Route index element={<ProtectedRoute component={FarmerDashboard} roles={[ROLES.FARMER]} />} />
          <Route path="products" element={<ProtectedRoute component={FarmerProducts} roles={[ROLES.FARMER]} />} />
          <Route path="sales" element={<ProtectedRoute component={FarmerSales} roles={[ROLES.FARMER]} />} />
          <Route path="subsidies" element={<ProtectedRoute component={FarmerSubsidies} roles={[ROLES.FARMER]} />} />
          <Route path="market" element={<ProtectedRoute component={FarmerMarket} roles={[ROLES.FARMER]} />} />
          <Route path="cooperatives" element={<ProtectedRoute component={FarmerCooperatives} roles={[ROLES.FARMER]} />} />
        </Route>

        {/* Cooperative routes */}
        <Route path="/dashboard/cooperative" element={<ProtectedRoute component={CooperativeDashboard} roles={[ROLES.COOPERATIVE]} />}>
          <Route path="members" element={<ProtectedRoute component={CooperativeMembers} roles={[ROLES.COOPERATIVE]} />} />
          <Route path="products" element={<ProtectedRoute component={CooperativeProducts} roles={[ROLES.COOPERATIVE]} />} />
          <Route path="stats" element={<ProtectedRoute component={CooperativeStats} roles={[ROLES.COOPERATIVE]} />} />
          <Route path="subsidies" element={<ProtectedRoute component={CooperativeSubsidies} roles={[ROLES.COOPERATIVE]} />} />
          <Route path="reports" element={<ProtectedRoute component={CooperativeReports} roles={[ROLES.COOPERATIVE]} />} />
        </Route>

        {/* Government routes */}
        <Route path="/dashboard/government" element={<ProtectedRoute component={GovernmentDashboard} roles={[ROLES.GOVERNMENT]} />}>
          <Route path="stats" element={<ProtectedRoute component={GovernmentStats} roles={[ROLES.GOVERNMENT]} />} />
          <Route path="map" element={<ProtectedRoute component={GovernmentMap} roles={[ROLES.GOVERNMENT]} />} />
          <Route path="reports" element={<ProtectedRoute component={GovernmentReports} roles={[ROLES.GOVERNMENT]} />} />
          <Route path="alerts" element={<ProtectedRoute component={GovernmentAlerts} roles={[ROLES.GOVERNMENT]} />} />
        </Route>

        {/* Financial routes */}
        <Route path="/dashboard/financial" element={<ProtectedRoute component={FinancialDashboard} roles={[ROLES.FINANCIAL]} />}>
          <Route path="borrowers" element={<ProtectedRoute component={FinancialBorrowers} roles={[ROLES.FINANCIAL]} />} />
          <Route path="loans" element={<ProtectedRoute component={FinancialLoans} roles={[ROLES.FINANCIAL]} />} />
          <Route path="stats" element={<ProtectedRoute component={FinancialStats} roles={[ROLES.FINANCIAL]} />} />
          <Route path="notifications" element={<ProtectedRoute component={FinancialNotifications} roles={[ROLES.FINANCIAL]} />} />
          <Route path="risk" element={<ProtectedRoute component={FinancialRisk} roles={[ROLES.FINANCIAL]} />} />
        </Route>

        {/* NGO routes */}
        <Route path="/dashboard/ngo" element={<ProtectedRoute component={NgoDashboard} roles={[ROLES.NGO]} />}>
          <Route path="beneficiaries" element={<ProtectedRoute component={NgoBeneficiaries} roles={[ROLES.NGO]} />} />
          <Route path="projects" element={<ProtectedRoute component={NgoProjects} roles={[ROLES.NGO]} />} />
          <Route path="impact" element={<ProtectedRoute component={NgoImpact} roles={[ROLES.NGO]} />} />
          <Route path="map" element={<ProtectedRoute component={NgoMap} roles={[ROLES.NGO]} />} />
          <Route path="reports" element={<ProtectedRoute component={NgoReports} roles={[ROLES.NGO]} />} />
          <Route path="funding" element={<ProtectedRoute component={NgoFunding} roles={[ROLES.NGO]} />} />
        </Route>
      </Route>

      {/* 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    </QueryClientProvider>
  );
};

export default App;
