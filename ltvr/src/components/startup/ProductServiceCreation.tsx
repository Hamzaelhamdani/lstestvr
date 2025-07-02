import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  BoxIcon,
  FileIcon,
  HeadphonesIcon,
  Code2Icon,
  ShoppingBagIcon,
  TagIcon,
  PackageIcon,
  CalendarIcon,
  ClockIcon,
  ImageIcon,
  TrashIcon,
  GlobeIcon,
  SendIcon,
  InfoIcon,
  PlusIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  PercentIcon,
  StoreIcon,
  BriefcaseIcon,
  StarIcon,
  ArrowUpIcon,
  LightbulbIcon,
  CreditCardIcon,
  RepeatIcon,
  CodeIcon,
  BarChartIcon,
  PenToolIcon,
  MegaphoneIcon,
  ActivityIcon,
  BrainIcon,
  BuildingIcon,
  GraduationCapIcon,
  HeartPulseIcon,
  DollarSignIcon
} from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { supabase } from "../../services/supabaseClient";

// Update JWT interface to match the actual token structure
interface JwtPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  exp: number;
  iss: string;
  aud: string;
}

// Update interfaces to match API exactly
interface ProductResponse {
  id: number;
  name: string;
  description: string;
  categoryId: string;
  type: ProductType;
  sellerId: string;
  images: string[];
  createdByUserId: string;
  originalPrice: number;
  discountedPrice: number;
}

type ProductType = 'product' | 'service';

interface ProductServiceCreationProps {
  limit?: number;
  showHeader?: boolean;
  onProductCreated?: (product: ProductService) => void;
}

// Add missing interfaces
interface ProductFormState {
  name: string;
  description: string;
  type: ProductType;
  price: number;
  categoryId: string;
  sellerId: string;
  imagePreview?: string;
  images?: string[];
}

interface ProductService {
  id: string | number;
  name: string;
  description: string;
  type: ProductType;
  price: number;
  categoryId: string;
  sellerId: string;
  images: string[];
  createdByUserId: string;
  originalPrice?: number;
  discountedPrice?: number;
  category?: string;
  createdAt?: string;
}
export function ProductServiceCreation({
  limit,
  showHeader = true,
  onProductCreated
}: ProductServiceCreationProps) {
  // Catégories et types de produits (déclarées en haut, une seule fois)
  const CATEGORIES = [
    { name: "SaaS Tools", icon: CodeIcon, description: "Software as a Service applications" },
    { name: "Web Development", icon: GlobeIcon, description: "Website and web application development" },
    { name: "Mobile Apps", icon: ShoppingBagIcon, description: "iOS, Android and cross-platform applications" },
    { name: "Design Services", icon: PenToolIcon, description: "UI/UX, graphic design and branding services" },
    { name: "Marketing", icon: MegaphoneIcon, description: "Marketing, advertising and promotion services" },
    { name: "Consulting", icon: BriefcaseIcon, description: "Business, technology and strategic consulting" },
    { name: "Hardware", icon: BoxIcon, description: "Physical tech products and devices" },
    { name: "Education", icon: GraduationCapIcon, description: "Courses, tutorials and educational content" },
    { name: "AI Solutions", icon: BrainIcon, description: "Artificial intelligence and machine learning" },
    { name: "Fintech", icon: DollarSignIcon, description: "Financial technology products and services" },
    { name: "Healthcare", icon: HeartPulseIcon, description: "Health tech and medical solutions" },
    { name: "Other", icon: TagIcon, description: "Other product or service types" }
  ] as const;

  const productTypes = [
    {
      type: 'product' as ProductType,
      title: 'Physical Product',
      description: 'Tangible items that require shipping',
      icon: BoxIcon
    },
    {
      type: 'service' as ProductType,
      title: 'Service',
      description: 'Consulting, development, or other services',
      icon: HeadphonesIcon
    }
  ];


  // Hooks d'état (une seule déclaration de chaque)
  // --- Helpers avancés placés juste après les hooks d'état ---
  // Récupérer les produits de l'utilisateur

  // Handler de création de produit via Supabase
  const handleCreateProduct = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Récupérer l'utilisateur connecté via Supabase
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error('Utilisateur non authentifié');
      if (!newProduct.name || !newProduct.description || !newProduct.type || !newProduct.price) {
        toast.error('Veuillez remplir tous les champs obligatoires');
        return;
      }
      const { data, error } = await supabase
        .from('products')
        .insert([
          {
            name: newProduct.name,
            description: newProduct.description,
            type: newProduct.type,
            price: newProduct.price,
            categoryId: newProduct.categoryId,
            sellerId: user.id,
            created_by: user.id,
            // TODO: gestion image si besoin
          }
        ]);
      if (error) throw error;
      toast.success('Produit créé avec succès', {
        style: { background: '#22c55e', color: 'white', fontWeight: 'bold', fontSize: '1.1em' },
        duration: 3500
      });
      handleCloseDialog();
      fetchUserProducts();
      if (onProductCreated && data && data[0]) {
        onProductCreated(data[0]);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur lors de la création du produit');
      toast.error(error instanceof Error ? error.message : 'Erreur lors de la création du produit', {
        style: { background: '#ef4444', color: 'white', fontWeight: 'bold', fontSize: '1.1em' },
        duration: 4000
      });
    } finally {
      setIsLoading(false);
    }
  };
  const [showDialog, setShowDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState<ProductType>('product');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [products, setProducts] = useState<ProductService[]>([]);
  const [startupInfo, setStartupInfo] = useState<{
    id: string;
    email: string;
    role: string;
    name: string;
  } | null>(null);
  const [newProduct, setNewProduct] = useState<ProductFormState>({
    name: "",
    description: "",
    type: "product",
    price: 0,
    categoryId: "",
    sellerId: "string"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handlers et helpers (une seule déclaration de chaque, SANS doublons)
  const getCategoryIcon = (categoryName: string) => {
    const category = CATEGORIES.find(c => c.name === categoryName);
    return category?.icon || TagIcon;
  };

  const handleCategoryChange = (value: string) => {
    setNewProduct(prev => ({ ...prev, categoryId: value }));
  };

  const handleNextStep = () => {
    if (currentStep === 1 && (!newProduct.name || !newProduct.description || !newProduct.type || !newProduct.categoryId)) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (currentStep === 2 && !newProduct.price) {
      toast.error('Please enter a price');
      return;
    }
    if (currentStep === 2) {
      setCurrentStep(4);
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setNewProduct(prev => ({
        ...prev,
        imagePreview: previewUrl
      }));
    }
  };

  const handleOpenDialog = () => {
    setNewProduct({
      name: "",
      description: "",
      type: "product",
      price: 0,
      categoryId: "",
      sellerId: "string"
    });
    setCurrentStep(1);
    setSelectedType('product');
    setShowDialog(true);
  };

  const isFormDirty = () => {
    return newProduct.name || newProduct.description || newProduct.price || newProduct.categoryId || selectedFile;
  };

  const handleCloseDialog = () => {
    if (isLoading) return;
    if (isFormDirty()) {
      if (!window.confirm('Vous allez perdre les informations saisies. Fermer le formulaire ?')) return;
    }
    setShowDialog(false);
    setTimeout(() => {
      setCurrentStep(1);
      setSelectedType('product');
      setNewProduct({
        name: "",
        description: "",
        type: "product",
        price: 0,
        categoryId: "",
        sellerId: "string"
      });
      setSelectedFile(null);
    }, 300);
  };

  const handleTypeSelect = (type: ProductType) => {
    setSelectedType(type);
    setNewProduct((prev: ProductFormState) => ({
      ...prev,
      type
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "price" || name === "discountedPrice" || name === "inventory" ||
        name === "supportStructureCommission") {
      setNewProduct(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setNewProduct(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // --- Helpers avancés placés juste après les hooks d'état ---
  // Décoder l'ID utilisateur depuis le JWT



  // (SUPPRESSION DES DOUBLONS de handlers avancés)



  // --- Handlers avancés placés AVANT le return ---
  // Get user ID from JWT
  // --- SUPPRESSION DES DOUBLONS DE HANDLERS ---


  // Add function to decode and validate token


  // Fetch user's products on mount



  // Fetch products on mount (après hooks et helpers)
  React.useEffect(() => {
    fetchUserProducts();
  }, []);

  // Handler de création de produit (doit être avant le return)


  // Filter products if limit is specified


  // --- RENDER ---
  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      {showHeader && (
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Your Products & Services</h3>
            <p className="text-sm text-muted-foreground">Manage your offerings and reach new customers</p>
          </div>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleOpenDialog}
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add New Product
          </Button>
        </div>
      )}
      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <ImageWithFallback
                src={`http://localhost:5139${product.images[0] || ""}`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-primary text-white">
                {product.type === 'product' ? 'Product' : 'Service'}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">
                ${product.discountedPrice}
                {product.originalPrice !== product.discountedPrice && (
                  <span className="ml-2 text-sm line-through text-muted-foreground">
                    ${product.originalPrice}
                  </span>
                )}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Product Creation Dialog */}
      <Dialog
        open={showDialog}
        onOpenChange={(open) => {
          if (!isLoading && !open) handleCloseDialog();
          else if (!isLoading && open) setShowDialog(true);
        }}
      >
        <DialogContent
          className="sm:max-w-3xl animate-fade-in"
          style={{ zIndex: 99999, background: 'rgba(0,0,0,0.85)' }}
          onPointerDownOutside={isLoading ? (e) => e.preventDefault() : undefined}
          onInteractOutside={isLoading ? (e) => e.preventDefault() : undefined}
          onEscapeKeyDown={isLoading ? (e) => e.preventDefault() : undefined}
        >
          {/* ...le reste du JSX du Dialog (inchangé)... */}
          {/* Step indicator, steps, etc. */}
          {/* ... */}
          {/* Step 4: Images */}
          {currentStep === 4 && (
            <>
              <ScrollArea className="max-h-[60vh] pr-4">
                {/* ...existing code... */}
              </ScrollArea>
              <DialogFooter className="flex justify-between sm:justify-between">
                <Button variant="outline" onClick={handlePrevStep}>
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button onClick={handleCreateProduct} disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center"><svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Création...</span>
                  ) : (
                    'Create Product'
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );




  // Get user ID from JWT
  const getUserId = (): string => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const decoded = jwtDecode<JwtPayload>(token);
      return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    } catch (error) {
      console.error('Error decoding token:', error);
      return '';
    }
  };

  // Fonction utilitaire pour récupérer l'utilisateur connecté via Supabase
  // (remplace toute logique de décodage JWT custom)
  // Voir fetchUserProducts et handleCreateProduct pour usage

  // Récupérer les produits de l'utilisateur connecté via Supabase
  const fetchUserProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error('Utilisateur non authentifié');
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('created_by', user.id);
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur lors du chargement des produits');
      toast.error('Erreur lors du chargement des produits');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch products on mount
  React.useEffect(() => {
    fetchUserProducts();
  }, []);

  // Update create product handler to match API exactly


  // Filter products if limit is specified
  const displayProducts = limit ? products.slice(0, limit) : products;

  // ...existing code...
}