import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { RegisterData } from '@/types/auth';
import { toast } from 'sonner';
import RegisterForm from '@/components/auth/RegisterForm';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';


const Register = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const handleRegister = async (data: RegisterData) => {
    try {
      await auth.register(data);
      toast.success('Inscription réussie ! Redirection vers la connexion...');
      navigate('/login');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erreur lors de l\'inscription');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <div className="flex-grow flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Rejoignez AgriMarket
          </h1>
          <RegisterForm onSubmit={handleRegister} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
