
import React, { useState } from 'react';
import { 
  Wheat, 
  Plus, 
  Pencil, 
  Trash2, 
  AlertTriangle,
  ShoppingCart,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';

// Schema de validation pour le formulaire de produit
const productFormSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  quantity: z.string().min(1, {
    message: "La quantité est requise",
  }),
  quality: z.string().min(1, {
    message: "La qualité est requise",
  }),
  price: z.string().min(1, {
    message: "Le prix est requis",
  }),
  date: z.string().min(1, {
    message: "La date est requise",
  }),
  status: z.string().min(1, {
    message: "Le statut est requis",
  }),
  description: z.string().optional(),
});

const FarmerProducts = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  
  // État local pour les produits
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Maïs',
      quantity: '500 kg',
      quality: 'Premium',
      price: '900 BIF/kg',
      date: '15/07/2023',
      status: 'Disponible',
      description: 'Maïs de haute qualité cultivé dans la région de Gitega.'
    },
    {
      id: 2,
      name: 'Haricots',
      quantity: '300 kg',
      quality: 'Standard',
      price: '1200 BIF/kg',
      date: '18/07/2023',
      status: 'Disponible',
      description: 'Haricots frais récoltés la semaine dernière.'
    },
    {
      id: 3,
      name: 'Tomates',
      quantity: '200 kg',
      quality: 'Premium',
      price: '1500 BIF/kg',
      date: '20/07/2023',
      status: 'Réservé',
      description: 'Tomates mûres et juteuses, idéales pour la cuisine.'
    },
    {
      id: 4,
      name: 'Pommes de terre',
      quantity: '400 kg',
      quality: 'Standard',
      price: '700 BIF/kg',
      date: '22/07/2023',
      status: 'Disponible',
      description: 'Pommes de terre de taille moyenne, parfaites pour la cuisson.'
    }
  ]);
  
  const sidebarItems = [
    {
      icon: Wheat,
      label: 'Tableau de bord',
      href: '/dashboard/farmer',
    },
    {
      icon: Wheat,
      label: 'Mes Produits',
      href: '/dashboard/farmer/products',
      active: true,
    },
    {
      icon: ShoppingCart,
      label: 'Mes Ventes',
      href: '/dashboard/farmer/sales',
    },
    {
      icon: Wheat,
      label: 'Subventions',
      href: '/dashboard/farmer/subsidies',
    },
    {
      icon: Wheat,
      label: 'Prix du Marché',
      href: '/dashboard/farmer/market',
    },
    {
      icon: Wheat,
      label: 'Coopératives',
      href: '/dashboard/farmer/cooperatives',
    },
  ];

  // Formulaire d'ajout/édition de produit
  const form = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      quantity: "",
      quality: "Standard",
      price: "",
      date: new Date().toISOString().split('T')[0],
      status: "Disponible",
      description: "",
    },
  });

  // Gestion de l'ouverture du formulaire d'édition
  const handleEdit = (product) => {
    setCurrentProduct(product);
    form.reset({
      name: product.name,
      quantity: product.quantity,
      quality: product.quality,
      price: product.price,
      date: product.date,
      status: product.status,
      description: product.description || "",
    });
    setIsEditDialogOpen(true);
  };

  // Gestion de l'ouverture du dialogue de suppression
  const handleDeleteClick = (product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  // Ajout d'un nouveau produit
  const handleAddProduct = (data) => {
    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      ...data
    };
    setProducts([...products, newProduct]);
    toast({
      title: "Produit ajouté",
      description: `${data.name} a été ajouté avec succès.`,
    });
    setIsAddDialogOpen(false);
    form.reset();
  };

  // Mise à jour d'un produit existant
  const handleUpdateProduct = (data) => {
    const updatedProducts = products.map(product => 
      product.id === currentProduct.id ? { ...product, ...data } : product
    );
    setProducts(updatedProducts);
    toast({
      title: "Produit mis à jour",
      description: `${data.name} a été mis à jour avec succès.`,
    });
    setIsEditDialogOpen(false);
  };

  // Suppression d'un produit
  const handleDeleteProduct = () => {
    const updatedProducts = products.filter(product => product.id !== currentProduct.id);
    setProducts(updatedProducts);
    toast({
      title: "Produit supprimé",
      description: `${currentProduct.name} a été supprimé avec succès.`,
      variant: "destructive",
    });
    setIsDeleteDialogOpen(false);
  };

  // Préparation du formulaire pour un nouveau produit
  const handleAddClick = () => {
    form.reset({
      name: "",
      quantity: "",
      quality: "Standard",
      price: "",
      date: new Date().toISOString().split('T')[0],
      status: "Disponible",
      description: "",
    });
    setIsAddDialogOpen(true);
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes Produits Agricoles</h1>
        <Button className="bg-agri hover:bg-agri/90" onClick={handleAddClick}>
          <Plus className="mr-2 h-4 w-4" /> Ajouter un produit
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Stock de produits</CardTitle>
          <CardDescription>
            Gérez vos produits agricoles disponibles à la vente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Qualité</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Date de récolte</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Wheat className="h-4 w-4 text-agri mr-2" />
                        {product.name}
                      </div>
                    </TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.quality}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.date}</TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        product.status === 'Disponible' 
                          ? 'bg-green-100 text-green-800' 
                          : product.status === 'Réservé'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {product.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleEdit(product)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="text-red-500"
                          onClick={() => handleDeleteClick(product)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              Produits à surveiller
            </CardTitle>
            <CardDescription>
              Produits nécessitant votre attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-1">
                    <h4 className="font-medium">Tomates</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      Date de péremption proche (5 jours restants)
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Vendre rapidement
                  </Button>
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-1">
                    <h4 className="font-medium">Pommes de terre</h4>
                    <p className="text-sm text-red-700 mt-1">
                      Prix en baisse sur le marché (-15% cette semaine)
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Ajuster le prix
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Opportunités de marché</CardTitle>
            <CardDescription>
              Demandes actuelles sur le marché
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-1">
                    <h4 className="font-medium">Demande de maïs</h4>
                    <p className="text-sm text-green-700 mt-1">
                      La coopérative Abahinzi recherche 1000kg de maïs
                    </p>
                    <p className="text-sm font-medium text-green-800 mt-1">
                      Prix offert: 950 BIF/kg
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                    Postuler
                  </Button>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-1">
                    <h4 className="font-medium">Demande de haricots</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Exportateur recherche 500kg de haricots de qualité
                    </p>
                    <p className="text-sm font-medium text-green-800 mt-1">
                      Prix offert: 1300 BIF/kg
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                    Postuler
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialogue d'ajout de produit */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau produit</DialogTitle>
            <DialogDescription>
              Complétez le formulaire pour ajouter un nouveau produit agricole.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddProduct)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du produit</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Maïs, Haricots..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantité</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 500 kg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prix</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 900 BIF/kg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="quality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qualité</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez la qualité" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Premium">Premium</SelectItem>
                          <SelectItem value="Standard">Standard</SelectItem>
                          <SelectItem value="Économique">Économique</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Statut</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez le statut" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Disponible">Disponible</SelectItem>
                          <SelectItem value="Réservé">Réservé</SelectItem>
                          <SelectItem value="Vendu">Vendu</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de récolte</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optionnelle)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Décrivez votre produit..." 
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit" className="bg-agri hover:bg-agri/90">Ajouter</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Dialogue d'édition de produit */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier le produit</DialogTitle>
            <DialogDescription>
              Modifiez les informations du produit.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateProduct)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du produit</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Maïs, Haricots..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantité</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 500 kg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prix</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 900 BIF/kg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="quality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qualité</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez la qualité" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Premium">Premium</SelectItem>
                          <SelectItem value="Standard">Standard</SelectItem>
                          <SelectItem value="Économique">Économique</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Statut</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez le statut" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Disponible">Disponible</SelectItem>
                          <SelectItem value="Réservé">Réservé</SelectItem>
                          <SelectItem value="Vendu">Vendu</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de récolte</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optionnelle)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Décrivez votre produit..." 
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit" className="bg-agri hover:bg-agri/90">Mettre à jour</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Dialogue de confirmation de suppression */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          
          {currentProduct && (
            <div className="py-4">
              <p className="font-medium">{currentProduct.name}</p>
              <p className="text-sm text-muted-foreground">Quantité: {currentProduct.quantity}</p>
            </div>
          )}
          
          <DialogFooter className="flex space-x-2 sm:space-x-0">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Annuler</Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteProduct}
              className="bg-red-500 hover:bg-red-600"
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default FarmerProducts;
