import { Route, Routes } from 'react-router-dom';
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

// NGO pages
import NgoBeneficiaries from './pages/dashboard/ngo/NgoBeneficiaries';
import NgoProjects from './pages/dashboard/ngo/NgoProjects';
import NgoImpact from './pages/dashboard/ngo/NgoImpact';
import NgoMap from './pages/dashboard/ngo/NgoMap';
import NgoReports from './pages/dashboard/ngo/NgoReports';

const App = () => {
  return (
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
          <Route path="catalog" element={<BuyerCatalog />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<BuyerOrders />} />
          <Route path="suppliers" element={<BuyerSuppliers />} />
          <Route path="products/:id" element={<ProductDetails />} />
        </Route>

        {/* Farmer routes */}
        <Route path="/dashboard/farmer" element={<ProtectedRoute component={FarmerDashboard} roles={[ROLES.FARMER]} />}>
          <Route path="products" element={<FarmerProducts />} />
          <Route path="sales" element={<FarmerSales />} />
          <Route path="subsidies" element={<FarmerSubsidies />} />
          <Route path="market" element={<FarmerMarket />} />
          <Route path="cooperatives" element={<FarmerCooperatives />} />
        </Route>

        {/* Cooperative routes */}
        <Route path="/dashboard/cooperative" element={<ProtectedRoute component={CooperativeDashboard} roles={[ROLES.COOPERATIVE]} />}>
          <Route path="members" element={<CooperativeMembers />} />
          <Route path="products" element={<CooperativeProducts />} />
          <Route path="stats" element={<CooperativeStats />} />
          <Route path="subsidies" element={<CooperativeSubsidies />} />
          <Route path="reports" element={<CooperativeReports />} />
        </Route>

        {/* Government routes */}
        <Route path="/dashboard/government" element={<ProtectedRoute component={GovernmentDashboard} roles={[ROLES.GOVERNMENT]} />}>
          <Route path="stats" element={<GovernmentStats />} />
          <Route path="map" element={<GovernmentMap />} />
          <Route path="reports" element={<GovernmentReports />} />
          <Route path="alerts" element={<GovernmentAlerts />} />
        </Route>

        {/* Financial routes */}
        <Route path="/dashboard/financial" element={<ProtectedRoute component={FinancialDashboard} roles={[ROLES.FINANCIAL]} />}>
          <Route path="borrowers" element={<FinancialBorrowers />} />
          <Route path="loans" element={<FinancialLoans />} />
          <Route path="stats" element={<FinancialStats />} />
          <Route path="notifications" element={<FinancialNotifications />} />
        </Route>

        {/* NGO routes */}
        <Route path="/dashboard/ngo" element={<ProtectedRoute component={NgoDashboard} roles={[ROLES.NGO]} />}>
          <Route path="beneficiaries" element={<NgoBeneficiaries />} />
          <Route path="projects" element={<NgoProjects />} />
          <Route path="impact" element={<NgoImpact />} />
          <Route path="map" element={<NgoMap />} />
          <Route path="reports" element={<NgoReports />} />
        </Route>
      </Route>

      {/* 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
