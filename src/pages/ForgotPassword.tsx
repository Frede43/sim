
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Veuillez entrer votre adresse email ou numéro de téléphone");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API request (replace with actual API call)
    try {
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      toast.success("Instructions de réinitialisation envoyées avec succès!");
    } catch (error) {
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="glass-card p-8 rounded-2xl animate-fade-in">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-2">
                    Réinitialisation du mot de passe
                  </h1>
                  <p className="text-muted-foreground">
                    Entrez votre email ou téléphone pour recevoir les instructions de réinitialisation
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email ou téléphone
                    </label>
                    <Input
                      id="email"
                      type="text"
                      placeholder="exemple@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-agri hover:bg-agri-dark hover-lift"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Envoi en cours..."
                    ) : (
                      <span className="flex items-center">
                        Envoyer les instructions <Send className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <Send className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Vérifiez votre boîte de réception</h2>
                <p className="text-muted-foreground mb-6">
                  Nous avons envoyé les instructions de réinitialisation à <strong>{email}</strong>
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  N'avez-vous pas reçu l'email? Vérifiez votre dossier spam ou{" "}
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-agri hover:underline"
                  >
                    essayez à nouveau
                  </button>
                </p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-border">
              <Button 
                variant="outline" 
                asChild 
                className="w-full group hover-lift"
              >
                <Link to="/login" className="flex items-center justify-center">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Retour à la connexion
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
