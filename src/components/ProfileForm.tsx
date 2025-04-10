
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserRole } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Schéma de base pour tous les utilisateurs
const baseProfileSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  phone: z.string().optional(),
  address: z.string().optional(),
});

// Schémas spécifiques aux rôles
const farmerProfileSchema = baseProfileSchema.extend({
  farmSize: z.string().optional(),
  mainCrops: z.string().optional(),
  registrationNumber: z.string().optional(),
});

const cooperativeProfileSchema = baseProfileSchema.extend({
  cooperativeName: z.string().min(2, {
    message: "Le nom de la coopérative doit contenir au moins 2 caractères.",
  }),
  registrationNumber: z.string(),
  foundedDate: z.string().optional(),
  memberCount: z.string().optional(),
});

const buyerProfileSchema = baseProfileSchema.extend({
  companyName: z.string().optional(),
  businessType: z.string().optional(),
  taxId: z.string().optional(),
});

const governmentProfileSchema = baseProfileSchema.extend({
  department: z.string(),
  position: z.string(),
  officialId: z.string().optional(),
});

const ngoProfileSchema = baseProfileSchema.extend({
  organizationName: z.string(),
  mission: z.string().optional(),
  foundedDate: z.string().optional(),
});

const financialProfileSchema = baseProfileSchema.extend({
  institutionName: z.string(),
  position: z.string(),
  licenseNumber: z.string().optional(),
});

// Fonction pour obtenir le schéma en fonction du rôle
const getProfileSchema = (role: UserRole) => {
  switch(role) {
    case "farmer":
      return farmerProfileSchema;
    case "cooperative":
      return cooperativeProfileSchema;
    case "buyer":
      return buyerProfileSchema;
    case "government":
      return governmentProfileSchema;
    case "ngo":
      return ngoProfileSchema;
    case "financial":
      return financialProfileSchema;
    default:
      return baseProfileSchema;
  }
};

// Données initiales fictives pour démonstration
const mockProfileData = {
  farmer: {
    name: "Jean Niyonzima",
    email: "jean.niyonzima@example.com",
    phone: "+257 79 123 456",
    address: "Commune Gitega, Burundi",
    farmSize: "2.5 hectares",
    mainCrops: "Café, maïs, haricots",
    registrationNumber: "F-1234-BDI",
  },
  cooperative: {
    name: "Coopérative de Ngozi",
    email: "coop.ngozi@example.com",
    phone: "+257 77 987 654",
    address: "Ngozi, Province de Ngozi, Burundi",
    cooperativeName: "Coopérative Agricole de Ngozi",
    registrationNumber: "COOP-789-BDI",
    foundedDate: "2010-05-12",
    memberCount: "145",
  },
  buyer: {
    name: "Marie Bukuru",
    email: "marie.bukuru@example.com",
    phone: "+257 76 543 210",
    address: "Bujumbura, Burundi",
    companyName: "Bukuru Export Ltd",
    businessType: "Exportation",
    taxId: "TAX-BDI-5678",
  },
  government: {
    name: "Pierre Nduwimana",
    email: "p.nduwimana@gov.bi",
    phone: "+257 71 234 567",
    address: "Ministère de l'Agriculture, Bujumbura",
    department: "Direction de la production agricole",
    position: "Directeur adjoint",
    officialId: "GOV-2345",
  },
  ngo: {
    name: "Claudine Iradukunda",
    email: "claudine@ngo.org",
    phone: "+257 78 765 432",
    address: "Quartier Asiatique, Bujumbura, Burundi",
    organizationName: "AgriSoutien",
    mission: "Soutenir les petits agriculteurs et faciliter l'accès aux marchés",
    foundedDate: "2015-03-20",
  },
  financial: {
    name: "François Hakizimana",
    email: "f.hakizimana@banque.bi",
    phone: "+257 72 345 678",
    address: "Avenue de la Paix, Bujumbura, Burundi",
    institutionName: "Banque Agricole du Burundi",
    position: "Responsable crédits agricoles",
    licenseNumber: "FIN-456-BDI",
  },
  admin: {
    name: "Admin Système",
    email: "admin@agrimarket.bi",
    phone: "+257 70 111 222",
    address: "Bujumbura, Burundi",
  },
};

// Fonction pour obtenir les données initiales en fonction du rôle
const getInitialData = (role: UserRole) => {
  return mockProfileData[role] || mockProfileData.admin;
};

// Composant des champs spécifiques au rôle Agriculteur
const FarmerFields = () => (
  <>
    <FormField
      name="farmSize"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Taille de l'exploitation (hectares)</FormLabel>
          <FormControl>
            <Input placeholder="Ex: 2.5" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="mainCrops"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Cultures principales</FormLabel>
          <FormControl>
            <Input placeholder="Ex: Café, maïs, haricots" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="registrationNumber"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Numéro d'enregistrement</FormLabel>
          <FormControl>
            <Input placeholder="Numéro d'enregistrement agricole" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);

// Composant des champs spécifiques au rôle Coopérative
const CooperativeFields = () => (
  <>
    <FormField
      name="cooperativeName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nom de la coopérative</FormLabel>
          <FormControl>
            <Input placeholder="Nom officiel de la coopérative" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="registrationNumber"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Numéro d'enregistrement</FormLabel>
          <FormControl>
            <Input placeholder="Numéro d'enregistrement officiel" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="foundedDate"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Date de fondation</FormLabel>
          <FormControl>
            <Input type="date" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="memberCount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nombre de membres</FormLabel>
          <FormControl>
            <Input type="number" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);

// Composant des champs spécifiques au rôle Acheteur
const BuyerFields = () => (
  <>
    <FormField
      name="companyName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nom de l'entreprise</FormLabel>
          <FormControl>
            <Input placeholder="Nom de votre entreprise" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="businessType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Type d'activité</FormLabel>
          <FormControl>
            <Input placeholder="Ex: Grossiste, Exportateur, etc." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="taxId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Identifiant fiscal</FormLabel>
          <FormControl>
            <Input placeholder="Numéro d'identification fiscale" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);

// Composant des champs spécifiques au rôle Gouvernement
const GovernmentFields = () => (
  <>
    <FormField
      name="department"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Département/Ministère</FormLabel>
          <FormControl>
            <Input placeholder="Ex: Ministère de l'Agriculture" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="position"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Poste/Fonction</FormLabel>
          <FormControl>
            <Input placeholder="Votre poste" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="officialId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Identifiant officiel</FormLabel>
          <FormControl>
            <Input placeholder="Identifiant de fonction" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);

// Composant des champs spécifiques au rôle ONG
const NGOFields = () => (
  <>
    <FormField
      name="organizationName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nom de l'organisation</FormLabel>
          <FormControl>
            <Input placeholder="Nom officiel de l'ONG" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="mission"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Mission</FormLabel>
          <FormControl>
            <Textarea placeholder="Mission et objectifs de l'organisation" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="foundedDate"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Date de fondation</FormLabel>
          <FormControl>
            <Input type="date" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);

// Composant des champs spécifiques au rôle Institution Financière
const FinancialFields = () => (
  <>
    <FormField
      name="institutionName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nom de l'institution</FormLabel>
          <FormControl>
            <Input placeholder="Nom de l'institution financière" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="position"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Poste/Fonction</FormLabel>
          <FormControl>
            <Input placeholder="Votre poste" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="licenseNumber"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Numéro de licence</FormLabel>
          <FormControl>
            <Input placeholder="Numéro de licence bancaire" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);

// Fonction pour rendre les champs spécifiques au rôle
const getRoleSpecificFields = (role: UserRole) => {
  switch(role) {
    case "farmer":
      return <FarmerFields />;
    case "cooperative":
      return <CooperativeFields />;
    case "buyer":
      return <BuyerFields />;
    case "government":
      return <GovernmentFields />;
    case "ngo":
      return <NGOFields />;
    case "financial":
      return <FinancialFields />;
    default:
      return null;
  }
};

// Traduire le rôle en français
const getRoleLabel = (role: UserRole) => {
  switch(role) {
    case "farmer": return "Agriculteur";
    case "cooperative": return "Coopérative";
    case "buyer": return "Acheteur";
    case "government": return "Gouvernement";
    case "ngo": return "ONG";
    case "financial": return "Institution Financière";
    case "admin": return "Administrateur";
    default: return "Utilisateur";
  }
};

// Composant principal du formulaire de profil
interface ProfileFormProps {
  userRole: UserRole;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ userRole }) => {
  const profileSchema = getProfileSchema(userRole);
  const initialData = getInitialData(userRole);
  
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData,
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    console.log(values);
    // Dans une application réelle, vous enverriez ces données à une API
    toast.success("Profil mis à jour avec succès!");
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profil {getRoleLabel(userRole)}</CardTitle>
        <CardDescription>
          Gérez vos informations personnelles et professionnelles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre nom complet" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="votre.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input placeholder="+257 XX XXX XXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Votre adresse complète" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Champs spécifiques au rôle */}
              {getRoleSpecificFields(userRole)}
            </div>
            
            <Button type="submit" className="w-full">Mettre à jour le profil</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
