import React, { useState } from 'react';
import { 
  Wheat, 
  Plus, 
  Pencil, 
  Trash2, 
  AlertTriangle,
  ShoppingCart
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { farmerApi } from "@/services/api/farmerApi";
import type { Product } from "@/services/api/farmerApi";

// Schéma de validation du formulaire
const productFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  quantity: z.string().min(1, { message: "La quantité est requise" }),
  quality: z.string().min(1, { message: "La qualité est requise" }),
  price: z.string().min(1, { message: "Le prix est requis" }),
  date: z.string().min(1, { message: "La date est requise" }),
  status: z.string().min(1, { message: "Le statut est requis" }),
  description: z.string().optional(),
});

type ProductFormData = z.infer<typeof productFormSchema>;

const FarmerProducts = (): JSX.Element => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const form = useForm<Omit<Product, 'id' | 'farmerId'>>({
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

  // Requête pour récupérer les produits
  const { data: products = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ['products', user?.id],
    queryFn: () => farmerApi.getProducts(user?.id as string),
    enabled: !!user?.id
  });

  // Mutations pour les opérations CRUD
  const addProductMutation = useMutation<void, Error, Omit<Product, 'id' | 'farmerId'>>({
    mutationFn: (data: Omit<Product, 'id' | 'farmerId'>) => farmerApi.addProduct(user?.id as string, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", user?.id] });
      setIsAddDialogOpen(false);
      toast({
        title: "Succès",
        description: "Le produit a été ajouté avec succès",
      });
    },
  });

  const updateProductMutation = useMutation<void, Error, { productId: string; updates: Partial<Product> }>({
    mutationFn: ({ productId, updates }: { productId: string; updates: Partial<Product> }) =>
      farmerApi.updateProduct(user?.id as string, productId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", user?.id] });
      setIsEditDialogOpen(false);
      toast({
        title: "Succès",
        description: "Le produit a été mis à jour avec succès",
      });
    },
  });

  const deleteProductMutation = useMutation<void, Error, string>({
    mutationFn: (productId: string) => farmerApi.deleteProduct(user?.id as string, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", user?.id] });
      setIsDeleteDialogOpen(false);
      toast({
        title: "Succès",
        description: "Le produit a été supprimé avec succès",
      });
    },
  });

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Une erreur est survenue</div>;

  // Gestion de l'ouverture du formulaire d'édition
  const handleEditClick = (product: Product) => {
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
  const handleDeleteClick = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  // Soumission du formulaire
  const onSubmit = async (data: Omit<Product, 'id' | 'farmerId'>) => {
    try {
      const productData = {
        ...data,
        farmerId: user?.id as string,
      };

      if (currentProduct && isEditDialogOpen) {
        // Mode édition
        await updateProductMutation.mutateAsync({
          productId: currentProduct.id,
          updates: productData
        });
      } else {
        // Mode ajout
        await addProductMutation.mutateAsync(productData);
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'opération',
        variant: 'destructive'
      });
    }
  };

  // Suppression d'un produit
  const handleDeleteProduct = () => {
    if (currentProduct) {
      deleteProductMutation.mutate(currentProduct.id);
    }
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
    <div className="p-6">
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
                  <TableHead>Nom</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Qualité</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Date de récolte</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.map((product) => (
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
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.status === 'Disponible'
                            ? 'bg-green-100 text-green-800'
                            : product.status === 'Réservé'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick(product)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
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

      {/* Dialogue d'ajout/édition de produit */}
      <Dialog open={isAddDialogOpen || isEditDialogOpen} onOpenChange={isAddDialogOpen ? setIsAddDialogOpen : setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isAddDialogOpen ? 'Ajouter un nouveau produit' : 'Modifier le produit'}</DialogTitle>
            <DialogDescription>
              {isAddDialogOpen ? 'Complétez le formulaire pour ajouter un nouveau produit agricole.' : 'Modifiez les informations du produit.'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <Button type="submit" className="bg-agri hover:bg-agri/90">
                  {isAddDialogOpen ? 'Ajouter' : 'Mettre à jour'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Dialogue de confirmation de suppression */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer {currentProduct?.name} ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FarmerProducts;
