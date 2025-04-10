
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, Mail, Phone, Send, MessageSquare } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Schéma de validation du formulaire
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  subject: z.string().min(5, {
    message: "Le sujet doit contenir au moins 5 caractères.",
  }),
  message: z.string().min(10, {
    message: "Le message doit contenir au moins 10 caractères.",
  }),
});

const Contact = () => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message envoyé!",
      description: "Nous vous répondrons bientôt.",
    });
    form.reset();
  }

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-muted/20 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Contactez-nous</h1>
            <p className="text-lg text-muted-foreground">
              Nous sommes là pour répondre à vos questions et vous aider dans vos démarches.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Infos de contact */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <Card className="overflow-hidden border-none shadow-md">
                  <CardHeader className="bg-agri text-white">
                    <CardTitle className="flex items-center">
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Nous contacter
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-3 text-agri mt-0.5" />
                        <div>
                          <h3 className="font-medium">Adresse</h3>
                          <p className="text-muted-foreground">123 Avenue Centrale<br />Bujumbura, Burundi</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 mr-3 text-agri mt-0.5" />
                        <div>
                          <h3 className="font-medium">Téléphone</h3>
                          <p className="text-muted-foreground">+257 12 345 678</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 mr-3 text-agri mt-0.5" />
                        <div>
                          <h3 className="font-medium">Email</h3>
                          <p className="text-muted-foreground">contact@agrimarket.bi</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-none shadow-md">
                  <CardHeader className="bg-agri text-white pb-3">
                    <CardTitle>Heures d'ouverture</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Lundi - Vendredi:</span>
                        <span>8h00 - 17h00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Samedi:</span>
                        <span>9h00 - 13h00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dimanche:</span>
                        <span>Fermé</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="lg:col-span-2">
              <Card className="shadow-md border-none">
                <CardHeader>
                  <CardTitle>Envoyez-nous un message</CardTitle>
                  <CardDescription>
                    Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom</FormLabel>
                              <FormControl>
                                <Input placeholder="Votre nom" {...field} />
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
                                <Input placeholder="votre@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sujet</FormLabel>
                            <FormControl>
                              <Input placeholder="Sujet de votre message" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Détaillez votre demande ici..."
                                className="min-h-[150px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full md:w-auto bg-agri hover:bg-agri-dark">
                        <Send className="mr-2 h-4 w-4" /> Envoyer
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Carte */}
          <div className="mt-12">
            <Card className="overflow-hidden border-none shadow-md">
              <CardHeader>
                <CardTitle>Notre localisation</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-video w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63774.61291258667!2d29.362254!3d-3.38195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19c18367489b1ca5%3A0x656743324c331e4!2sBujumbura%2C%20Burundi!5e0!3m2!1sfr!2sfr!4v1661787763010!5m2!1sfr!2sfr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localisation AgriMarket"
                    className="w-full h-[400px]"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
