
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, BarChart, Truck, ShoppingBag, Plus, Pencil, Trash2, FileEdit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';

// Schema de validation du formulaire
const productFormSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  category: z.string().min(1, {
    message: "La catégorie est requise",
  }),
  stock: z.string().min(1, {
    message: "Le stock est requis",
  }),
  price: z.string().min(1, {
    message: "Le prix est requis",
  }),
  description: z.string().optional(),
});

const CooperativeProducts = () => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  // État local pour les produits
  const [products, setProducts] = useState([
    { id: 1, name: 'Maïs', category: 'Céréales', stock: '1500 kg', price: '900 BIF/kg', description: 'Maïs de qualité produit par nos agriculteurs locaux.' },
    { id: 2, name: 'Haricots', category: 'Légumineuses', stock: '850 kg', price: '1200 BIF/kg', description: 'Haricots rouges riches en protéines.' },
    { id: 3, name: 'Tomates', category: 'Légumes', stock: '320 kg', price: '1500 BIF/kg', description: 'Tomates fraîches cultivées en saison.' },
    { id: 4, name: 'Café', category: 'Export', stock: '750 kg', price: '3200 BIF/kg', description: 'Café arabica de haute qualité pour l\'exportation.' },
    { id: 5, name: 'Pommes de terre', category: 'Tubercules', stock: '1200 kg', price: '700 BIF/kg', description: 'Pommes de terre cultivées dans les hauts plateaux.' },
    { id: 6, name: 'Bananes', category: 'Fruits', stock: '900 kg', price: '600 BIF/kg', description: 'Bananes plantains idéales pour la cuisine locale.' },
  ]);

  // Recent deliveries state
  const [deliveries, setDeliveries] = useState([
    { id: 1, farmer: 'Jean Ndayishimiye', product: 'Maïs', quantity: '250 kg', date: '15/05/2023', quality: 'Excellente' },
    { id: 2, farmer: 'Marie Niyonzima', product: 'Haricots', quantity: '150 kg', date: '14/05/2023', quality: 'Bonne' },
    { id: 3, farmer: 'Pierre Hakizimana', product: 'Café', quantity: '100 kg', date: '10/05/2023', quality: 'Excellente' },
    { id: 4, farmer: 'Claudine Uwase', product: 'Tomates', quantity: '80 kg', date: '09/05/2023', quality: 'Moyenne' },
  ]);
  
  // Sidebar items for the dashboard
  const sidebarItems = [
    {
      icon: Package,
      label: 'Tableau de bord',
      href: '/dashboard/cooperative',
    },
    {
      icon: Package,
      label: 'Membres',
      href: '/dashboard/cooperative/members',
    },
    {
      icon: Package,
      label: 'Produits',
      href: '/dashboard/cooperative/products',
      active: true,
    },
    {
      icon: BarChart,
      label: 'Statistiques',
      href: '/dashboard/cooperative/stats',
    },
    {
      icon: FileEdit,
      label: 'Subventions',
      href: '/dashboard/cooperative/subsidies',
    },
    {
      icon: FileEdit,
      label: 'Rapports',
      href: '/dashboard/cooperative/reports',
    },
  ];

  // Formulaire d'ajout/édition de produit
  const form = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      category: "",
      stock: "",
      price: "",
      description: "",
    },
  });

  // Filtrer les produits selon l'onglet actif
  const getFilteredProducts = () => {
    if (activeTab === "all") return products;
    
    // Simple filter simulation - in a real app, you'd have more complex logic
    if (activeTab === "in-stock") 
      return products.filter(p => parseInt(p.stock) > 500);
    if (activeTab === "out-of-stock") 
      return products.filter(p => parseInt(p.stock) < 500);
    if (activeTab === "seasonal") 
      return products.filter(p => p.category === 'Fruits' || p.category === 'Légumes');
    
    return products;
  };

  // Ajouter un nouveau produit
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

  // Ouvrir le formulaire d'édition
  const handleEdit = (product) => {
    setCurrentProduct(product);
    form.reset({
      name: product.name,
      category: product.category,
      stock: product.stock,
      price: product.price,
      description: product.description || "",
    });
    setIsEditDialogOpen(true);
  };

  // Mettre à jour un produit
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

  // Préparer la suppression
  const handleDeleteClick = (product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  // Supprimer un produit
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

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestion des Produits</h1>
          <Button 
            className="bg-agri hover:bg-agri-dark"
            onClick={() => {
              form.reset({
                name: "",
                category: "",
                stock: "",
                price: "",
                description: "",
              });
              setIsAddDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Ajouter un produit
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Tous les produits</TabsTrigger>
            <TabsTrigger value="in-stock">En stock</TabsTrigger>
            <TabsTrigger value="out-of-stock">Rupture de stock</TabsTrigger>
            <TabsTrigger value="seasonal">Saisonniers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredProducts().map((product) => (
                <Card key={product.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between">
                      <span>{product.name}</span>
                      <span className="text-agri">{product.price}</span>
                    </CardTitle>
                    <CardDescription>{product.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm mb-3">Stock: {product.stock}</div>
                    {product.description && (
                      <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                    )}
                    <div className="flex space-x-2 justify-end">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                        <Pencil className="h-4 w-4 mr-1" /> Modifier
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500" onClick={() => handleDeleteClick(product)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Supprimer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="in-stock" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredProducts().map((product) => (
                <Card key={product.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between">
                      <span>{product.name}</span>
                      <span className="text-agri">{product.price}</span>
                    </CardTitle>
                    <CardDescription>{product.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm mb-3">Stock: {product.stock}</div>
                    {product.description && (
                      <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                    )}
                    <div className="flex space-x-2 justify-end">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                        <Pencil className="h-4 w-4 mr-1" /> Modifier
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500" onClick={() => handleDeleteClick(product)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Supprimer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="out-of-stock" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredProducts().map((product) => (
                <Card key={product.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between">
                      <span>{product.name}</span>
                      <span className="text-agri">{product.price}</span>
                    </CardTitle>
                    <CardDescription>{product.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm mb-3">Stock: {product.stock}</div>
                    {product.description && (
                      <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                    )}
                    <div className="flex space-x-2 justify-end">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                        <Pencil className="h-4 w-4 mr-1" /> Modifier
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500" onClick={() => handleDeleteClick(product)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Supprimer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="seasonal" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredProducts().map((product) => (
                <Card key={product.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between">
                      <span>{product.name}</span>
                      <span className="text-agri">{product.price}</span>
                    </CardTitle>
                    <CardDescription>{product.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm mb-3">Stock: {product.stock}</div>
                    {product.description && (
                      <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                    )}
                    <div className="flex space-x-2 justify-end">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                        <Pencil className="h-4 w-4 mr-1" /> Modifier
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500" onClick={() => handleDeleteClick(product)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Supprimer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Livraisons récentes</CardTitle>
            <CardDescription>Dernières livraisons de produits de nos agriculteurs membres</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agriculteur</TableHead>
                    <TableHead>Produit</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Qualité</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deliveries.map((delivery) => (
                    <TableRow key={delivery.id}>
                      <TableCell>{delivery.farmer}</TableCell>
                      <TableCell>{delivery.product}</TableCell>
                      <TableCell>{delivery.quantity}</TableCell>
                      <TableCell>{delivery.date}</TableCell>
                      <TableCell>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          delivery.quality === 'Excellente' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                            : delivery.quality === 'Bonne'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                        }`}>
                          {delivery.quality}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
              Complétez le formulaire pour ajouter un nouveau produit dans le stock de la coopérative.
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

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une catégorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Céréales">Céréales</SelectItem>
                        <SelectItem value="Légumineuses">Légumineuses</SelectItem>
                        <SelectItem value="Légumes">Légumes</SelectItem>
                        <SelectItem value="Fruits">Fruits</SelectItem>
                        <SelectItem value="Tubercules">Tubercules</SelectItem>
                        <SelectItem value="Export">Export</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
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

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une catégorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Céréales">Céréales</SelectItem>
                        <SelectItem value="Légumineuses">Légumineuses</SelectItem>
                        <SelectItem value="Légumes">Légumes</SelectItem>
                        <SelectItem value="Fruits">Fruits</SelectItem>
                        <SelectItem value="Tubercules">Tubercules</SelectItem>
                        <SelectItem value="Export">Export</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
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
              <p className="text-sm text-muted-foreground">Catégorie: {currentProduct.category}</p>
              <p className="text-sm text-muted-foreground">Stock: {currentProduct.stock}</p>
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

export default CooperativeProducts;
