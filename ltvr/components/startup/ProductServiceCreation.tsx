import React, { useState } from "react";
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
} from "lucide-react@0.487.0";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "../figma/ImageWithFallback";

// Types for product creation
export interface ProductService {
  id: string;
  name: string;
  type: 'physical' | 'digital' | 'service' | 'subscription';
  description: string;
  price: number;
  discountedPrice?: number;
  images: string[];
  category: string;
  tags: string[];
  inventory?: number;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
  features?: string[];
  specifications?: Record<string, string>;
  subscriptionDetails?: {
    billingCycle: 'monthly' | 'quarterly' | 'annually';
    trialPeriod?: number;
    setupFee?: number;
  };
  supportStructureCommission?: number;
}

// Category definitions with icons
interface Category {
  name: string;
  icon: React.ElementType;
  description: string;
}

// Placeholder for categories
const CATEGORIES: Category[] = [
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
];

// Example products for display
const EXAMPLE_PRODUCTS: ProductService[] = [
  {
    id: "prod1",
    name: "Cloud Analytics Platform",
    type: "subscription",
    description: "Enterprise-grade data analytics platform with advanced visualization and AI-powered insights.",
    price: 499,
    images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=200&auto=format&fit=crop"],
    category: "SaaS Tools",
    tags: ["analytics", "cloud", "enterprise"],
    status: "active",
    features: ["Real-time data processing", "Custom dashboards", "AI predictions", "Data integration"],
    createdAt: "2025-03-15",
    updatedAt: "2025-04-30",
    subscriptionDetails: {
      billingCycle: "monthly",
      trialPeriod: 14,
      setupFee: 999
    },
    supportStructureCommission: 10
  },
  {
    id: "prod2",
    name: "Mobile App Development",
    type: "service",
    description: "Professional mobile app development services for iOS and Android platforms.",
    price: 15000,
    images: ["https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=200&auto=format&fit=crop"],
    category: "Mobile Apps",
    tags: ["development", "mobile", "iOS", "Android"],
    status: "active",
    createdAt: "2025-02-20",
    updatedAt: "2025-04-25",
    features: ["UI/UX design", "Native development", "Backend integration", "App store submission"],
    supportStructureCommission: 8
  },
  {
    id: "prod3",
    name: "Marketing Automation Suite",
    type: "digital",
    description: "All-in-one marketing automation software for small to medium businesses.",
    price: 299,
    discountedPrice: 249,
    images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=200&auto=format&fit=crop"],
    category: "Marketing",
    tags: ["automation", "email", "analytics"],
    status: "active",
    createdAt: "2025-01-10",
    updatedAt: "2025-04-15",
    features: ["Email campaigns", "Social media scheduling", "Analytics dashboard", "Lead scoring"],
    supportStructureCommission: 12
  },
  {
    id: "prod4",
    name: "Smart Office IoT Kit",
    type: "physical",
    description: "Transform your office with smart sensors for temperature, occupancy, and energy monitoring.",
    price: 1299,
    inventory: 45,
    images: ["https://images.unsplash.com/photo-1586349125659-35f4165b3df9?q=80&w=200&auto=format&fit=crop"],
    category: "Hardware",
    tags: ["IoT", "smart office", "sensors"],
    status: "active",
    createdAt: "2025-03-01",
    updatedAt: "2025-04-10",
    specifications: {
      "Dimensions": "120mm x 80mm x 30mm",
      "Power": "USB-C, 5V",
      "Connectivity": "WiFi, Bluetooth 5.0",
      "Sensors": "Temperature, Humidity, Motion, Light"
    },
    supportStructureCommission: 5
  }
];

interface ProductServiceCreationProps {
  limit?: number;
  showHeader?: boolean;
  onProductCreated?: (product: ProductService) => void;
}

export function ProductServiceCreation({ 
  limit, 
  showHeader = true,
  onProductCreated
}: ProductServiceCreationProps) {
  // State for product list
  const [products, setProducts] = useState<ProductService[]>(EXAMPLE_PRODUCTS);
  const [showDialog, setShowDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState<ProductService['type']>('physical');
  
  // New product form state
  const [newProduct, setNewProduct] = useState<Partial<ProductService>>({
    name: "",
    type: "physical",
    description: "",
    price: 0,
    images: [],
    category: "",
    tags: [],
    status: "draft",
    features: [],
    specifications: {},
    supportStructureCommission: 5
  });
  
  // Tag input state
  const [tagInput, setTagInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  
  // Specification form state
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");
  
  // Handle dialog opening
  const handleOpenDialog = () => {
    // Reset form state when opening dialog
    setNewProduct({
      name: "",
      type: "physical",
      description: "",
      price: 0,
      images: [],
      category: "",
      tags: [],
      status: "draft",
      features: [],
      specifications: {},
      supportStructureCommission: 5
    });
    setCurrentStep(1);
    setSelectedType('physical');
    setShowDialog(true);
  };
  
  // Handle dialog closing
  const handleCloseDialog = () => {
    setShowDialog(false);
  };
  
  // Handle type selection
  const handleTypeSelect = (type: ProductService['type']) => {
    setSelectedType(type);
    setNewProduct(prev => ({ ...prev, type }));
  };
  
  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric values
    if (name === "price" || name === "discountedPrice" || name === "inventory" || 
        name === "supportStructureCommission" || 
        name === "subscriptionDetails.trialPeriod" || 
        name === "subscriptionDetails.setupFee") {
      
      if (name.includes("subscriptionDetails")) {
        const field = name.split(".")[1];
        setNewProduct(prev => ({
          ...prev,
          subscriptionDetails: {
            ...prev.subscriptionDetails,
            [field]: parseFloat(value) || 0
          }
        }));
      } else {
        setNewProduct(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
      }
    } 
    // Handle billing cycle specifically
    else if (name === "subscriptionDetails.billingCycle") {
      setNewProduct(prev => ({
        ...prev,
        subscriptionDetails: {
          ...prev.subscriptionDetails,
          billingCycle: value as 'monthly' | 'quarterly' | 'annually'
        }
      }));
    }
    // Handle all other string fields
    else {
      setNewProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle category selection using ShadCN's Select component
  const handleCategoryChange = (value: string) => {
    setNewProduct(prev => ({ ...prev, category: value }));
  };
  
  // Handle tag addition
  const handleAddTag = () => {
    if (tagInput.trim() && !newProduct.tags?.includes(tagInput.trim())) {
      setNewProduct(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()]
      }));
      setTagInput("");
    }
  };
  
  // Handle tag removal
  const handleRemoveTag = (tag: string) => {
    setNewProduct(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || []
    }));
  };
  
  // Handle feature addition
  const handleAddFeature = () => {
    if (featureInput.trim() && !newProduct.features?.includes(featureInput.trim())) {
      setNewProduct(prev => ({
        ...prev,
        features: [...(prev.features || []), featureInput.trim()]
      }));
      setFeatureInput("");
    }
  };
  
  // Handle feature removal
  const handleRemoveFeature = (feature: string) => {
    setNewProduct(prev => ({
      ...prev,
      features: prev.features?.filter(f => f !== feature) || []
    }));
  };
  
  // Handle specification addition
  const handleAddSpecification = () => {
    if (specKey.trim() && specValue.trim()) {
      setNewProduct(prev => ({
        ...prev,
        specifications: {
          ...(prev.specifications || {}),
          [specKey.trim()]: specValue.trim()
        }
      }));
      setSpecKey("");
      setSpecValue("");
    }
  };
  
  // Handle specification removal
  const handleRemoveSpecification = (key: string) => {
    if (!newProduct.specifications) return;
    
    const updatedSpecs = { ...newProduct.specifications };
    delete updatedSpecs[key];
    
    setNewProduct(prev => ({
      ...prev,
      specifications: updatedSpecs
    }));
  };
  
  // Handle image URL addition
  const handleAddImage = (url: string) => {
    if (url.trim() && !newProduct.images?.includes(url.trim())) {
      setNewProduct(prev => ({
        ...prev,
        images: [...(prev.images || []), url.trim()]
      }));
    }
  };
  
  // Handle image removal
  const handleRemoveImage = (url: string) => {
    setNewProduct(prev => ({
      ...prev,
      images: prev.images?.filter(img => img !== url) || []
    }));
  };
  
  // Move to next step
  const handleNextStep = () => {
    // Validate current step
    if (currentStep === 1) {
      if (!newProduct.name || !newProduct.description || !newProduct.category) {
        toast.error("Please fill out all required fields");
        return;
      }
    } else if (currentStep === 2) {
      if (!newProduct.price) {
        toast.error("Please enter a price");
        return;
      }
      
      if (selectedType === 'physical' && !newProduct.inventory) {
        toast.error("Please enter inventory quantity");
        return;
      }
      
      if (selectedType === 'subscription' && !newProduct.subscriptionDetails?.billingCycle) {
        toast.error("Please select a billing cycle");
        return;
      }
    }
    
    setCurrentStep(prev => prev + 1);
  };
  
  // Move to previous step
  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };
  
  // Handle product creation
  const handleCreateProduct = () => {
    // Validate final step
    if (!newProduct.images || newProduct.images.length === 0) {
      toast.error("Please add at least one product image");
      return;
    }
    
    // Create product
    const createdProduct: ProductService = {
      ...newProduct as ProductService,
      id: `prod${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active'
    };
    
    // Add to product list
    setProducts(prev => [createdProduct, ...prev]);
    
    // Call callback if provided
    if (onProductCreated) {
      onProductCreated(createdProduct);
    }
    
    // Show success message
    toast.success("Product created successfully", {
      description: `${createdProduct.name} has been added to your product catalog`
    });
    
    // Close dialog
    handleCloseDialog();
  };
  
  // Filter products if limit is specified
  const displayProducts = limit ? products.slice(0, limit) : products;

  // Find the selected category object
  const getCategoryIcon = (categoryName: string) => {
    const category = CATEGORIES.find(c => c.name === categoryName);
    return category ? category.icon : TagIcon;
  };

  return (
    <div className="space-y-6">
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
        {displayProducts.map(product => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <ImageWithFallback
                src={product.images[0] || ""}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-1.5">
                <Badge className={`${
                  product.type === 'physical' ? 'bg-chart-4' : 
                  product.type === 'digital' ? 'bg-chart-5' : 
                  product.type === 'subscription' ? 'bg-tertiary' : 
                  'bg-primary'
                } text-white`}>
                  {product.type === 'physical' ? 'Product' : 
                   product.type === 'digital' ? 'Digital' : 
                   product.type === 'subscription' ? 'Subscription' : 
                   'Service'}
                </Badge>
                {product.discountedPrice && (
                  <Badge className="bg-destructive text-white">
                    Sale
                  </Badge>
                )}
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-1">{product.category}</CardDescription>
                </div>
                <div className="text-right">
                  {product.discountedPrice ? (
                    <div>
                      <span className="text-sm line-through text-muted-foreground">${product.price}</span>
                      <span className="text-lg font-bold ml-2">${product.discountedPrice}</span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold">${product.price}</span>
                  )}
                  {product.type === 'subscription' && (
                    <span className="text-xs text-muted-foreground block">
                      {product.subscriptionDetails?.billingCycle || 'monthly'}
                    </span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex flex-wrap gap-1.5 mt-2">
                {product.tags?.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {(product.tags?.length || 0) > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{(product.tags?.length || 0) - 3} more
                  </Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="flex justify-between items-center w-full">
                <div className="text-xs text-muted-foreground">
                  Added {new Date(product.createdAt).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-8">
                    Edit
                  </Button>
                  <Button size="sm" variant="default" className="h-8">
                    View
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Product Creation Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add New Product or Service</DialogTitle>
            <DialogDescription>
              Create a new product or service to showcase on your storefront.
            </DialogDescription>
          </DialogHeader>
          
          {/* Step indicator */}
          <div className="relative mb-6 mt-2">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted transform -translate-y-1/2"></div>
            <div className="relative flex justify-between">
              <div className={`z-10 flex flex-col items-center ${currentStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  1
                </div>
                <span className="text-xs mt-1">Basics</span>
              </div>
              <div className={`z-10 flex flex-col items-center ${currentStep >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  2
                </div>
                <span className="text-xs mt-1">Pricing</span>
              </div>
              <div className={`z-10 flex flex-col items-center ${currentStep >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  3
                </div>
                <span className="text-xs mt-1">Details</span>
              </div>
              <div className={`z-10 flex flex-col items-center ${currentStep >= 4 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 4 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  4
                </div>
                <span className="text-xs mt-1">Images</span>
              </div>
            </div>
          </div>
          
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <>
              <ScrollArea className="max-h-[60vh] pr-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="product-type" className="text-base mb-2 block">Product Type</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card 
                          className={`cursor-pointer transition-all hover:border-primary ${selectedType === 'physical' ? 'border-primary bg-primary/5' : ''}`}
                          onClick={() => handleTypeSelect('physical')}
                        >
                          <CardContent className="p-4 flex flex-col items-center text-center">
                            <BoxIcon className={`h-8 w-8 mb-2 ${selectedType === 'physical' ? 'text-primary' : ''}`} />
                            <h4 className="text-sm font-medium">Physical Product</h4>
                            <p className="text-xs text-muted-foreground mt-1">Tangible items that require shipping</p>
                          </CardContent>
                        </Card>
                        
                        <Card 
                          className={`cursor-pointer transition-all hover:border-primary ${selectedType === 'digital' ? 'border-primary bg-primary/5' : ''}`}
                          onClick={() => handleTypeSelect('digital')}
                        >
                          <CardContent className="p-4 flex flex-col items-center text-center">
                            <FileIcon className={`h-8 w-8 mb-2 ${selectedType === 'digital' ? 'text-primary' : ''}`} />
                            <h4 className="text-sm font-medium">Digital Product</h4>
                            <p className="text-xs text-muted-foreground mt-1">Downloadable items like software or PDFs</p>
                          </CardContent>
                        </Card>
                        
                        <Card 
                          className={`cursor-pointer transition-all hover:border-primary ${selectedType === 'service' ? 'border-primary bg-primary/5' : ''}`}
                          onClick={() => handleTypeSelect('service')}
                        >
                          <CardContent className="p-4 flex flex-col items-center text-center">
                            <HeadphonesIcon className={`h-8 w-8 mb-2 ${selectedType === 'service' ? 'text-primary' : ''}`} />
                            <h4 className="text-sm font-medium">Service</h4>
                            <p className="text-xs text-muted-foreground mt-1">Consulting, development, or other services</p>
                          </CardContent>
                        </Card>
                        
                        <Card 
                          className={`cursor-pointer transition-all hover:border-primary ${selectedType === 'subscription' ? 'border-primary bg-primary/5' : ''}`}
                          onClick={() => handleTypeSelect('subscription')}
                        >
                          <CardContent className="p-4 flex flex-col items-center text-center">
                            <RepeatIcon className={`h-8 w-8 mb-2 ${selectedType === 'subscription' ? 'text-primary' : ''}`} />
                            <h4 className="text-sm font-medium">Subscription</h4>
                            <p className="text-xs text-muted-foreground mt-1">Recurring payment products or services</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base">Product Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter product name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-base">Description *</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe your product or service"
                        value={newProduct.description}
                        onChange={handleInputChange}
                        className="min-h-[120px]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-base">Category *</Label>
                      <Select 
                        value={newProduct.category} 
                        onValueChange={handleCategoryChange}
                      >
                        <SelectTrigger id="category" className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            {CATEGORIES.map(category => (
                              <SelectItem 
                                key={category.name} 
                                value={category.name}
                                className="flex items-center cursor-pointer"
                              >
                                <div className="flex items-center gap-2">
                                  {React.createElement(category.icon, { 
                                    className: "h-4 w-4 text-primary mr-2",
                                    "aria-hidden": true 
                                  })}
                                  <span>{category.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {newProduct.category && (
                        <p className="text-xs text-muted-foreground mt-1.5">
                          {CATEGORIES.find(c => c.name === newProduct.category)?.description || ""}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tags" className="text-base">Tags</Label>
                      <div className="flex gap-2">
                        <Input
                          id="tags"
                          placeholder="Add tag and press Enter"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddTag();
                            }
                          }}
                        />
                        <Button type="button" onClick={handleAddTag} variant="outline">
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {newProduct.tags && newProduct.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {newProduct.tags.map(tag => (
                            <Badge 
                              key={tag} 
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              {tag}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0 hover:bg-transparent"
                                onClick={() => handleRemoveTag(tag)}
                              >
                                <TrashIcon className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollArea>
              
              <DialogFooter>
                <Button variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button onClick={handleNextStep}>
                  Next Step
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </DialogFooter>
            </>
          )}
          
          {/* Step 2: Pricing */}
          {currentStep === 2 && (
            <>
              <ScrollArea className="max-h-[60vh] pr-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-base">Price ($) *</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={newProduct.price || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="discountedPrice" className="text-base">Sale Price ($)</Label>
                      <Input
                        id="discountedPrice"
                        name="discountedPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={newProduct.discountedPrice || ""}
                        onChange={handleInputChange}
                      />
                      <p className="text-xs text-muted-foreground">
                        Leave empty if not on sale
                      </p>
                    </div>
                  </div>
                  
                  {selectedType === 'physical' && (
                    <div className="space-y-2">
                      <Label htmlFor="inventory" className="text-base">Inventory Quantity *</Label>
                      <Input
                        id="inventory"
                        name="inventory"
                        type="number"
                        min="0"
                        placeholder="0"
                        value={newProduct.inventory || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                  
                  {selectedType === 'subscription' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="billingCycle" className="text-base">Billing Cycle *</Label>
                        <select
                          id="billingCycle"
                          name="subscriptionDetails.billingCycle"
                          className="w-full h-10 px-3 py-2 rounded-md border border-input bg-transparent text-sm"
                          value={newProduct.subscriptionDetails?.billingCycle || "monthly"}
                          onChange={handleInputChange}
                        >
                          <option value="monthly">Monthly</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="annually">Annually</option>
                        </select>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="trialPeriod" className="text-base">Trial Period (days)</Label>
                          <Input
                            id="trialPeriod"
                            name="subscriptionDetails.trialPeriod"
                            type="number"
                            min="0"
                            placeholder="0"
                            value={newProduct.subscriptionDetails?.trialPeriod || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="setupFee" className="text-base">Setup Fee ($)</Label>
                          <Input
                            id="setupFee"
                            name="subscriptionDetails.setupFee"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            value={newProduct.subscriptionDetails?.setupFee || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="supportStructureCommission" className="text-base">Support Structure Commission (%)</Label>
                        <Badge variant={newProduct.supportStructureCommission! > 15 ? "destructive" : "outline"}>
                          {newProduct.supportStructureCommission || 5}%
                        </Badge>
                      </div>
                      <Input
                        id="supportStructureCommission"
                        name="supportStructureCommission"
                        type="range"
                        min="0"
                        max="20"
                        step="0.5"
                        value={newProduct.supportStructureCommission || 5}
                        onChange={handleInputChange}
                        className="cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0%</span>
                        <span>10%</span>
                        <span>20%</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Percentage commission offered to support structures (incubators, accelerators, etc.) 
                        who help promote and sell your product.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
              
              <DialogFooter className="flex justify-between sm:justify-between">
                <Button variant="outline" onClick={handlePrevStep}>
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button onClick={handleNextStep}>
                  Next Step
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </DialogFooter>
            </>
          )}
          
          {/* Step 3: Additional Details */}
          {currentStep === 3 && (
            <>
              <ScrollArea className="max-h-[60vh] pr-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="features" className="text-base">Key Features</Label>
                      <div className="flex gap-2">
                        <Input
                          id="features"
                          placeholder="Add feature and press Enter"
                          value={featureInput}
                          onChange={(e) => setFeatureInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddFeature();
                            }
                          }}
                        />
                        <Button type="button" onClick={handleAddFeature} variant="outline">
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {newProduct.features && newProduct.features.length > 0 && (
                        <div className="space-y-2 mt-2">
                          {newProduct.features.map((feature, index) => (
                            <div 
                              key={index}
                              className="flex items-center justify-between p-2 bg-muted/30 rounded-md"
                            >
                              <div className="flex items-center">
                                <StarIcon className="h-4 w-4 text-primary mr-2" />
                                <span>{feature}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handleRemoveFeature(feature)}
                              >
                                <TrashIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {(selectedType === 'physical' || selectedType === 'digital') && (
                      <div className="space-y-2">
                        <Label className="text-base">Technical Specifications</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            placeholder="Specification name"
                            value={specKey}
                            onChange={(e) => setSpecKey(e.target.value)}
                          />
                          <Input
                            placeholder="Specification value"
                            value={specValue}
                            onChange={(e) => setSpecValue(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end mt-2">
                          <Button 
                            type="button" 
                            onClick={handleAddSpecification} 
                            variant="outline"
                            size="sm"
                          >
                            <PlusIcon className="h-4 w-4 mr-1.5" />
                            Add Specification
                          </Button>
                        </div>
                        
                        {newProduct.specifications && Object.keys(newProduct.specifications).length > 0 && (
                          <div className="mt-4 border rounded-md overflow-hidden">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-muted/30">
                                  <th className="px-4 py-2 text-left text-sm font-medium">Specification</th>
                                  <th className="px-4 py-2 text-left text-sm font-medium">Value</th>
                                  <th className="px-4 py-2 text-right text-sm font-medium w-16">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Object.entries(newProduct.specifications).map(([key, value]) => (
                                  <tr key={key} className="border-t border-border">
                                    <td className="px-4 py-2 text-sm">{key}</td>
                                    <td className="px-4 py-2 text-sm">{value}</td>
                                    <td className="px-4 py-2 text-right">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                        onClick={() => handleRemoveSpecification(key)}
                                      >
                                        <TrashIcon className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollArea>
              
              <DialogFooter className="flex justify-between sm:justify-between">
                <Button variant="outline" onClick={handlePrevStep}>
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button onClick={handleNextStep}>
                  Next Step
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </DialogFooter>
            </>
          )}
          
          {/* Step 4: Images */}
          {currentStep === 4 && (
            <>
              <ScrollArea className="max-h-[60vh] pr-4">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-base">Product Images *</Label>
                    <p className="text-sm text-muted-foreground">
                      Add images to showcase your product or service. You can add up to 5 images.
                    </p>
                    
                    <div className="grid grid-cols-1 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <div className="flex gap-2">
                          <Input
                            id="imageUrl"
                            placeholder="https://example.com/image.jpg"
                          />
                          <Button 
                            type="button" 
                            onClick={(e) => {
                              const input = document.getElementById('imageUrl') as HTMLInputElement;
                              if (input.value) {
                                handleAddImage(input.value);
                                input.value = '';
                              }
                            }} 
                            variant="outline"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Add image URLs from Unsplash or other sources
                        </p>
                      </div>
                      
                      {/* Image preview */}
                      {newProduct.images && newProduct.images.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                          {newProduct.images.map((image, index) => (
                            <div key={index} className="relative group rounded-md overflow-hidden">
                              <ImageWithFallback
                                src={image}
                                alt={`Product image ${index + 1}`}
                                className="w-full h-32 object-cover"
                              />
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleRemoveImage(image)}
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </Button>
                              </div>
                              {index === 0 && (
                                <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                                  Primary
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-40 border-2 border-dashed border-muted-foreground/25 rounded-md">
                          <div className="text-center">
                            <ImageIcon className="mx-auto h-10 w-10 text-muted-foreground/50" />
                            <p className="mt-2 text-sm text-muted-foreground">
                              No images added yet
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-md border border-border">
                    <div className="flex items-start">
                      <InfoIcon className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium">Product Preview</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Here's how your product will appear in the marketplace. Make sure all information is accurate before publishing.
                        </p>
                        
                        {/* Mini product preview */}
                        {newProduct.name && (
                          <div className="mt-4 border border-border rounded-md p-3 bg-background">
                            <div className="flex items-start gap-3">
                              <div className="relative h-14 w-14 rounded-md overflow-hidden flex-shrink-0">
                                {newProduct.images && newProduct.images.length > 0 ? (
                                  <ImageWithFallback
                                    src={newProduct.images[0]}
                                    alt={newProduct.name}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full bg-muted flex items-center justify-center">
                                    <ImageIcon className="h-6 w-6 text-muted-foreground/50" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between">
                                  <h4 className="font-medium text-sm truncate">{newProduct.name}</h4>
                                  <span className="text-sm font-bold">${newProduct.price || 0}</span>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                  {newProduct.description || "No description provided"}
                                </p>
                                {newProduct.category && (
                                  <div className="flex items-center mt-2">
                                    {React.createElement(getCategoryIcon(newProduct.category), { 
                                      className: "h-3.5 w-3.5 text-primary mr-1.5", 
                                      "aria-hidden": "true" 
                                    })}
                                    <Badge variant="outline" className="text-xs">
                                      {newProduct.category}
                                    </Badge>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
              
              <DialogFooter className="flex justify-between sm:justify-between">
                <Button variant="outline" onClick={handlePrevStep}>
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button onClick={handleCreateProduct}>
                  Create Product
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}