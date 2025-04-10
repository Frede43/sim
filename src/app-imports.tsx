
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import About from '@/pages/About';
import FeaturesPage from '@/pages/FeaturesPage';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import NotFound from '@/pages/NotFound';
import Unauthorized from '@/pages/Unauthorized';
import ProtectedRoute from '@/components/ProtectedRoute';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from '@/components/ui/toaster';

// Dashboard imports
import BuyerDashboard from '@/pages/dashboard/BuyerDashboard';
import BuyerCatalog from '@/pages/dashboard/buyer/BuyerCatalog';
import BuyerOrders from '@/pages/dashboard/buyer/BuyerOrders';
import BuyerSuppliers from '@/pages/dashboard/buyer/BuyerSuppliers';
import ProductDetails from '@/pages/dashboard/buyer/ProductDetails';
import Checkout from '@/pages/dashboard/buyer/Checkout';

import FarmerDashboard from '@/pages/dashboard/FarmerDashboard';
import FarmerProducts from '@/pages/dashboard/farmer/FarmerProducts';
import FarmerSales from '@/pages/dashboard/farmer/FarmerSales';
import FarmerSubsidies from '@/pages/dashboard/farmer/FarmerSubsidies';
import FarmerMarket from '@/pages/dashboard/farmer/FarmerMarket';
import FarmerCooperatives from '@/pages/dashboard/farmer/FarmerCooperatives';

import CooperativeDashboard from '@/pages/dashboard/CooperativeDashboard';
import CooperativeMembers from '@/pages/dashboard/cooperative/CooperativeMembers';
import CooperativeProducts from '@/pages/dashboard/cooperative/CooperativeProducts';
import CooperativeStats from '@/pages/dashboard/cooperative/CooperativeStats';
import CooperativeSubsidies from '@/pages/dashboard/cooperative/CooperativeSubsidies';
import CooperativeReports from '@/pages/dashboard/cooperative/CooperativeReports';

import GovernmentDashboard from '@/pages/dashboard/GovernmentDashboard';
import GovernmentStats from '@/pages/dashboard/government/GovernmentStats';
import GovernmentMap from '@/pages/dashboard/government/GovernmentMap';
import GovernmentReports from '@/pages/dashboard/government/GovernmentReports';
import GovernmentAlerts from '@/pages/dashboard/government/GovernmentAlerts';

import FinancialDashboard from '@/pages/dashboard/FinancialDashboard';
import FinancialBorrowers from '@/pages/dashboard/financial/FinancialBorrowers';
import FinancialLoans from '@/pages/dashboard/financial/FinancialLoans';
import FinancialStats from '@/pages/dashboard/financial/FinancialStats';
import FinancialNotifications from '@/pages/dashboard/financial/FinancialNotifications';

import NgoDashboard from '@/pages/dashboard/NgoDashboard';
import NgoBeneficiaries from '@/pages/dashboard/ngo/NgoBeneficiaries';
import NgoProjects from '@/pages/dashboard/ngo/NgoProjects';
import NgoImpact from '@/pages/dashboard/ngo/NgoImpact';
import NgoMap from '@/pages/dashboard/ngo/NgoMap';
import NgoReports from '@/pages/dashboard/ngo/NgoReports';

// Service pages
import AgriculteurServices from '@/pages/services/AgriculteurServices';
import CooperativeServices from '@/pages/services/CooperativeServices';
import AcheteurServices from '@/pages/services/AcheteurServices';
