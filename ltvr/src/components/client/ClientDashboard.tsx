
import { useState } from "react";
import { 
  HomeIcon, 
  CreditCardIcon, 
  HistoryIcon, 
  SettingsIcon, 
  ShoppingCartIcon, 
  CreditCard, 
  Receipt, 
  Download, 
  ExternalLink, 
  ChevronRight,
  Calendar,
  Search,
  FilterIcon,
  CheckCircle2,
  Clock,
  X,
  Plus,
  BarChart3,
  Eye,
  Smartphone,
  Bitcoin,
  BuildingIcon,
  ShoppingBag,
  Wallet,
  ChevronsUpDown,
  Clipboard,
  QrCode,
  Copy,
  Sparkles,
  ShieldCheck,
  Upload,
  KeyRound,
  Save,
  User,
  Mail,
  Lock,
  Camera,
  CheckIcon
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Progress } from "../ui/progress";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Tabs as ProfileTabs, TabsList as ProfileTabsList, TabsTrigger as ProfileTabsTrigger, TabsContent as ProfileTabsContent } from "../ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Toast } from "../ui/toast";
import { ToastAction } from "../ui/toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  joinDate: string;
  bio?: string;
  company?: string;
  location?: string;
  website?: string;
  phone?: string;
}

interface ClientDashboardProps {
  user: User;
}

interface PaymentMethod {
  id: string;
  type: "card" | "paypal" | "bank" | "apple" | "google" | "crypto" | "amazon";
  label: string;
  last4?: string;
  expiry?: string;
  isDefault: boolean;
}

interface Purchase {
  id: string;
  productName: string;
  productType: "product" | "service" | "subscription";
  price: number;
  date: string;
  startupName: string;
  startupLogo?: string;
  status: "completed" | "pending" | "failed" | "refunded";
  receiptUrl: string;
  downloadUrl?: string;
  accessUrl?: string;
  renewalDate?: string;
  category: string;
  description?: string;
  image?: string;
}

export function ClientDashboard({ user }: ClientDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showPaymentMethodDialog, setShowPaymentMethodDialog] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
  const [showPurchaseDetails, setShowPurchaseDetails] = useState(false);
  const [pendingPaymentDetails, setPendingPaymentDetails] = useState<Purchase | null>(null);
  const [showPendingPaymentDetails, setShowPendingPaymentDetails] = useState(false);
  const [purchaseFilter, setPurchaseFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // New states for specific payment method dialogs
  const [showCardDialog, setShowCardDialog] = useState(false);
  const [showBankDialog, setShowBankDialog] = useState(false);
  const [showWalletDialog, setShowWalletDialog] = useState(false);
  const [showCryptoDialog, setShowCryptoDialog] = useState(false);
  
  // New states for card form
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [isDefaultCard, setIsDefaultCard] = useState(false);
  const [cardType, setCardType] = useState("visa");
  
  // New states for bank form
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [isDefaultBank, setIsDefaultBank] = useState(false);
  const [accountType, setAccountType] = useState("checking");
  
  // New states for digital wallet form
  const [walletType, setWalletType] = useState("paypal");
  const [walletEmail, setWalletEmail] = useState("");
  const [walletPhone, setWalletPhone] = useState("");
  const [isDefaultWallet, setIsDefaultWallet] = useState(false);
  
  // New states for crypto form
  const [cryptoType, setCryptoType] = useState("bitcoin");
  const [cryptoAddress, setCryptoAddress] = useState("");
  const [cryptoNetwork, setCryptoNetwork] = useState("mainnet");
  const [isDefaultCrypto, setIsDefaultCrypto] = useState(false);

  // New states for profile editing
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [profileTab, setProfileTab] = useState("general");
  const [editedName, setEditedName] = useState(user?.name || "");
  const [editedEmail, setEditedEmail] = useState(user?.email || "");
  const [editedBio, setEditedBio] = useState(user?.bio || "");
  const [editedCompany, setEditedCompany] = useState(user?.company || "");
  const [editedLocation, setEditedLocation] = useState(user?.location || "");
  const [editedWebsite, setEditedWebsite] = useState(user?.website || "");
  const [editedPhone, setEditedPhone] = useState(user?.phone || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Mock data
  const paymentMethods: PaymentMethod[] = [
    { 
      id: "pm_1", 
      type: "card", 
      label: "Visa ending in 4242", 
      last4: "4242", 
      expiry: "12/25", 
      isDefault: true 
    },
    { 
      id: "pm_2", 
      type: "paypal", 
      label: "PayPal account", 
      isDefault: false 
    },
    {
      id: "pm_3",
      type: "apple",
      label: "Apple Pay",
      isDefault: false
    },
    {
      id: "pm_4",
      type: "google",
      label: "Google Pay",
      isDefault: false
    },
    {
      id: "pm_5",
      type: "bank",
      label: "Bank Transfer (ACH)",
      last4: "5678",
      isDefault: false
    },
    {
      id: "pm_6",
      type: "crypto",
      label: "Bitcoin / Cryptocurrency",
      isDefault: false
    },
    {
      id: "pm_7",
      type: "amazon",
      label: "Amazon Pay",
      isDefault: false
    }
  ];

  const pendingPayments: Purchase[] = [
    {
      id: "p_pending_1",
      productName: "AI Integration Package",
      productType: "service",
      price: 349.99,
      date: "2025-05-28T10:30:00Z",
      startupName: "TechWizards AI",
      startupLogo: "https://images.unsplash.com/photo-1640535695910-78e297c159f0?w=400&auto=format&fit=crop&q=80",
      status: "pending",
      receiptUrl: "#",
      category: "AI Services",
      description: "Custom AI integration service for your business needs",
      image: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "p_pending_2",
      productName: "UX/UI Design Audit",
      productType: "service",
      price: 199.00,
      date: "2025-05-27T15:45:00Z",
      startupName: "DesignCraft",
      startupLogo: "https://images.unsplash.com/photo-1583675561609-b15767662673?w=400&auto=format&fit=crop&q=80",
      status: "pending",
      receiptUrl: "#",
      category: "Design Services",
      description: "Comprehensive UX/UI audit with actionable recommendations",
      image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=800&auto=format&fit=crop&q=80"
    }
  ];

  const purchaseHistory: Purchase[] = [
    {
      id: "p_1",
      productName: "Analytics Dashboard Pro",
      productType: "product",
      price: 79.99,
      date: "2025-05-20T14:30:00Z",
      startupName: "DataVision",
      startupLogo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format&fit=crop&q=80",
      status: "completed",
      receiptUrl: "#",
      downloadUrl: "#",
      category: "SaaS",
      description: "Advanced analytics dashboard with customizable widgets and real-time data processing",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "p_2",
      productName: "Marketing Strategy Consultation",
      productType: "service",
      price: 249.99,
      date: "2025-05-15T09:15:00Z",
      startupName: "GrowthHackers",
      startupLogo: "https://images.unsplash.com/photo-1579869847557-1f67382cc158?w=400&auto=format&fit=crop&q=80",
      status: "completed",
      receiptUrl: "#",
      accessUrl: "#",
      category: "Marketing",
      description: "Personalized marketing strategy consultation with experienced growth marketers",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f5a70d?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "p_3",
      productName: "Cloud Storage Premium",
      productType: "subscription",
      price: 9.99,
      date: "2025-05-01T11:20:00Z",
      startupName: "SecureCloud",
      startupLogo: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&auto=format&fit=crop&q=80",
      status: "completed",
      receiptUrl: "#",
      accessUrl: "#",
      renewalDate: "2025-06-01T11:20:00Z",
      category: "SaaS",
      description: "Secure cloud storage solution with advanced encryption and file sharing capabilities",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "p_4",
      productName: "Mobile App Template Bundle",
      productType: "product",
      price: 129.99,
      date: "2025-04-28T16:45:00Z",
      startupName: "AppFactory",
      startupLogo: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=400&auto=format&fit=crop&q=80",
      status: "completed",
      receiptUrl: "#",
      downloadUrl: "#",
      category: "Templates",
      description: "Comprehensive collection of mobile app UI templates for various platforms",
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "p_5",
      productName: "SEO Optimization Service",
      productType: "service",
      price: 199.99,
      date: "2025-04-15T13:10:00Z",
      startupName: "RankBoost",
      startupLogo: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=400&auto=format&fit=crop&q=80",
      status: "completed",
      receiptUrl: "#",
      category: "Marketing",
      description: "Complete SEO optimization service including keyword research and content strategy",
      image: "https://images.unsplash.com/photo-1562577308-9e66f0c65ce5?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "p_6",
      productName: "Website Monitoring Premium",
      productType: "subscription",
      price: 19.99,
      date: "2025-04-10T08:30:00Z",
      startupName: "SiteGuard",
      startupLogo: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=400&auto=format&fit=crop&q=80",
      status: "completed",
      receiptUrl: "#",
      accessUrl: "#",
      renewalDate: "2025-05-10T08:30:00Z",
      category: "SaaS",
      description: "Advanced website monitoring solution with real-time alerts and performance analytics",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "p_7",
      productName: "Social Media Content Package",
      productType: "product",
      price: 89.99,
      date: "2025-03-25T14:20:00Z",
      startupName: "ContentCraft",
      startupLogo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&auto=format&fit=crop&q=80",
      status: "refunded",
      receiptUrl: "#",
      category: "Marketing",
      description: "Ready-to-use social media content templates and graphics for various platforms",
      image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop&q=80"
    }
  ];

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };
  
  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return value;
  };
  
  // Handle card form submission
  const handleCardSubmit = () => {
    // In a real app, this would validate and process the card
    console.log("Card submitted:", {
      number: cardNumber,
      expiry: cardExpiry,
      cvc: cardCvc,
      name: cardName,
      isDefault: isDefaultCard,
      type: cardType
    });
    
    // Reset form and close dialog
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
    setCardName("");
    setIsDefaultCard(false);
    setShowCardDialog(false);
    
    // Show success message
    alert("Card added successfully!");
  };
  
  // Handle bank form submission
  const handleBankSubmit = () => {
    // In a real app, this would validate and process the bank account
    console.log("Bank account submitted:", {
      name: bankName,
      accountName: accountName,
      accountNumber: accountNumber,
      routingNumber: routingNumber,
      isDefault: isDefaultBank,
      type: accountType
    });
    
    // Reset form and close dialog
    setBankName("");
    setAccountName("");
    setAccountNumber("");
    setRoutingNumber("");
    setIsDefaultBank(false);
    setShowBankDialog(false);
    
    // Show success message
    alert("Bank account added successfully!");
  };
  
  // Handle wallet form submission
  const handleWalletSubmit = () => {
    // In a real app, this would validate and process the digital wallet
    console.log("Digital wallet submitted:", {
      type: walletType,
      email: walletEmail,
      phone: walletPhone,
      isDefault: isDefaultWallet
    });
    
    // Reset form and close dialog
    setWalletEmail("");
    setWalletPhone("");
    setIsDefaultWallet(false);
    setShowWalletDialog(false);
    
    // Show success message
    alert("Digital wallet added successfully!");
  };
  
  // Handle crypto form submission
  const handleCryptoSubmit = () => {
    // In a real app, this would validate and process the cryptocurrency
    console.log("Cryptocurrency submitted:", {
      type: cryptoType,
      address: cryptoAddress,
      network: cryptoNetwork,
      isDefault: isDefaultCrypto
    });
    
    // Reset form and close dialog
    setCryptoAddress("");
    setIsDefaultCrypto(false);
    setShowCryptoDialog(false);
    
    // Show success message
    alert("Cryptocurrency address added successfully!");
  };

  // Handle profile form submission
  const handleProfileSubmit = () => {
    // In a real app, this would update the user's profile
    console.log("Profile updated:", {
      name: editedName,
      email: editedEmail,
      bio: editedBio,
      company: editedCompany,
      location: editedLocation,
      website: editedWebsite,
      phone: editedPhone
    });
    
    // Show success message and close dialog
    setSuccessMessage("Profile updated successfully!");
    setShowSuccessToast(true);
    setShowProfileDialog(false);
  };

  // Handle password change
  const handlePasswordChange = () => {
    // Reset any previous errors
    setPasswordError("");
    
    // Validate passwords
    if (!currentPassword) {
      setPasswordError("Current password is required");
      return;
    }
    
    if (!newPassword) {
      setPasswordError("New password is required");
      return;
    }
    
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    // In a real app, this would update the user's password
    console.log("Password changed");
    
    // Reset form
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    
    // Show success message and close dialog
    setSuccessMessage("Password changed successfully!");
    setShowSuccessToast(true);
    setShowProfileDialog(false);
  };

  // Handle opening profile dialog and initializing fields
  const openProfileDialog = () => {
    // Initialize form fields with user data
    setEditedName(user?.name || "");
    setEditedEmail(user?.email || "");
    setEditedBio(user?.bio || "");
    setEditedCompany(user?.company || "");
    setEditedLocation(user?.location || "");
    setEditedWebsite(user?.website || "");
    setEditedPhone(user?.phone || "");
    
    // Reset password fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    
    // Set default tab and open dialog
    setProfileTab("general");
    setShowProfileDialog(true);
  };

  // Filter purchases based on type and search term
  const filteredPurchases = purchaseHistory.filter(purchase => {
    const matchesFilter = purchaseFilter === "all" || 
                         (purchaseFilter === "products" && purchase.productType === "product") ||
                         (purchaseFilter === "services" && purchase.productType === "service") ||
                         (purchaseFilter === "subscriptions" && purchase.productType === "subscription");
    
    const matchesSearch = searchTerm === "" || 
                         purchase.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         purchase.startupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         purchase.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Calculate total spent
  const totalSpent = purchaseHistory
    .filter(p => p.status === "completed")
    .reduce((sum, purchase) => sum + purchase.price, 0);

  // Get subscription count
  const subscriptionCount = purchaseHistory
    .filter(p => p.productType === "subscription" && p.status === "completed")
    .length;

  // Open purchase details dialog
  const viewPurchaseDetails = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
    setShowPurchaseDetails(true);
  };

  // Open pending payment details dialog
  const viewPendingPaymentDetails = (payment: Purchase) => {
    setPendingPaymentDetails(payment);
    setShowPendingPaymentDetails(true);
  };

  // Handle payment for a pending item
  const handlePayment = () => {
    // In a real app, this would process the payment
    setShowPendingPaymentDetails(false);
    // Show success message or redirect to confirmation
    alert("Payment processed successfully!");
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Client Dashboard</h1>
          <p className="text-muted-foreground">Manage your purchases, payments, and account</p>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-4 md:w-[600px]">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <HomeIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCardIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Payments</span>
          </TabsTrigger>
          <TabsTrigger value="purchase-history" className="flex items-center gap-2">
            <HistoryIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Purchase History</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">Across {purchaseHistory.length} purchases</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{subscriptionCount}</div>
                <p className="text-xs text-muted-foreground mt-1">Monthly recurring: ${purchaseHistory
                  .filter(p => p.productType === "subscription" && p.status === "completed")
                  .reduce((sum, p) => sum + p.price, 0).toFixed(2)}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingPayments.length}</div>
                <p className="text-xs text-muted-foreground mt-1">Total: ${pendingPayments.reduce((sum, p) => sum + p.price, 0).toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Purchases</CardTitle>
                <CardDescription>Your most recent transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchaseHistory.slice(0, 5).map((purchase) => (
                    <div key={purchase.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted overflow-hidden">
                          {purchase.startupLogo ? (
                            <ImageWithFallback 
                              src={purchase.startupLogo} 
                              alt={purchase.startupName} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ShoppingCartIcon className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{purchase.productName}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <span>{formatDate(purchase.date)}</span>
                            <span>•</span>
                            <span>{purchase.startupName}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-medium">${purchase.price.toFixed(2)}</div>
                          <Badge variant={
                            purchase.status === "completed" ? "outline" : 
                            purchase.status === "pending" ? "secondary" : 
                            purchase.status === "refunded" ? "destructive" : "default"
                          }>
                            {purchase.status}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => viewPurchaseDetails(purchase)}>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <Button variant="outline" onClick={() => setActiveTab("purchase-history")}>
                    View All Purchases
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Pending Payments</CardTitle>
                <CardDescription>Complete your pending transactions</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingPayments.length > 0 ? (
                  <div className="space-y-4">
                    {pendingPayments.map((payment) => (
                      <div key={payment.id} className="p-3 bg-muted/20 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <div className="font-medium">{payment.productName}</div>
                            <div className="text-sm text-muted-foreground">{payment.startupName}</div>
                          </div>
                          <div className="font-medium">${payment.price.toFixed(2)}</div>
                        </div>
                        <div className="mt-3">
                          <Button 
                            onClick={() => viewPendingPaymentDetails(payment)} 
                            className="w-full"
                          >
                            Complete Payment
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <CheckCircle2 className="h-12 w-12 mx-auto text-primary opacity-80 mb-3" />
                    <p className="text-muted-foreground">No pending payments</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Subscription Timeline</CardTitle>
              <CardDescription>Your active subscriptions and renewal dates</CardDescription>
            </CardHeader>
            <CardContent>
              {purchaseHistory.filter(p => p.productType === "subscription" && p.status === "completed").length > 0 ? (
                <div className="space-y-6">
                  {purchaseHistory
                    .filter(p => p.productType === "subscription" && p.status === "completed")
                    .map((subscription) => (
                      <div key={subscription.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted overflow-hidden">
                              {subscription.startupLogo ? (
                                <ImageWithFallback 
                                  src={subscription.startupLogo} 
                                  alt={subscription.startupName} 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <ShoppingCartIcon className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{subscription.productName}</div>
                              <div className="text-sm text-muted-foreground">{subscription.startupName}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${subscription.price.toFixed(2)}/month</div>
                            <div className="text-sm text-muted-foreground">
                              Renews: {subscription.renewalDate ? formatDate(subscription.renewalDate) : "N/A"}
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative pt-2">
                          <Progress value={70} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>Subscribed: {formatDate(subscription.date)}</span>
                            <span>Next renewal: {subscription.renewalDate ? formatDate(subscription.renewalDate) : "N/A"}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-3" />
                  <p className="text-muted-foreground">No active subscriptions</p>
                  <Button variant="outline" className="mt-4" onClick={() => setActiveTab("marketplace")}>
                    Browse Subscriptions
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your saved payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Methods</SelectItem>
                          <SelectItem value="card">Credit Cards</SelectItem>
                          <SelectItem value="digital">Digital Wallets</SelectItem>
                          <SelectItem value="bank">Bank Accounts</SelectItem>
                          <SelectItem value="crypto">Cryptocurrency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Badge variant="outline" className="font-normal gap-1 cursor-pointer hover:bg-muted" onClick={() => setShowPaymentMethodDialog(true)}>
                      <Plus className="h-3.5 w-3.5" />
                      Add New
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Credit & Debit Cards */}
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Credit & Debit Cards</h4>
                      {paymentMethods.filter(m => m.type === "card").map((method) => (
                        <div 
                          key={method.id} 
                          className={`p-4 rounded-lg border ${method.isDefault ? 'border-primary' : 'border-border'} relative mb-2`}
                        >
                          <div className="flex items-center gap-4">
                            {method.type === "card" && <CreditCard className="h-8 w-8 text-primary" />}
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div>
                                  <p className="font-medium">{method.label}</p>
                                  {method.expiry && (
                                    <p className="text-sm text-muted-foreground">Expires: {method.expiry}</p>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  {method.isDefault && (
                                    <Badge variant="outline" className="bg-primary/10">Default</Badge>
                                  )}
                                  <Button variant="ghost" size="icon">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Digital Wallets */}
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Digital Wallets</h4>
                      {paymentMethods.filter(m => ["paypal", "apple", "google", "amazon"].includes(m.type)).map((method) => (
                        <Card key={method.id} className="mb-3">
                          <CardContent className="p-4 flex items-center gap-4">
                            {method.type === "paypal" && (
                              <div className="h-8 w-8 flex items-center justify-center bg-[#0070ba] rounded text-white font-bold">
                                P
                              </div>
                            )}
                            {method.type === "apple" && (
                              <div className="h-8 w-8 flex items-center justify-center bg-black rounded-full text-white">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M16.78 9.08c1.9.1 4.13 1.28 4.13 4.12 0 2.62-1.74 3.87-3.5 3.9H6.34c-1.74-.03-3.47-1.28-3.47-3.9 0-2.84 2.22-4.02 4.13-4.12.94-1.25 2.12-2.43 3.43-2.43 1.32 0 2.5 1.18 3.44 2.43Z" />
                                  <path d="M7.76 10.29c.31.36.47.82.43 1.29-.04.47-.26.9-.62 1.21a1.66 1.66 0 0 1-2.53-.34 1.64 1.64 0 0 1 .21-2.15c.17-.15.38-.26.59-.33.22-.07.44-.1.67-.09.23.01.46.07.67.16.21.09.4.23.58.25Zm8.5 0a1.64 1.64 0 0 1 2.53-.34c.35.32.57.75.6 1.22.04.47-.12.93-.44 1.28-.17.03-.37.17-.58.26-.21.1-.44.15-.67.16-.23.01-.45-.02-.67-.09-.21-.07-.42-.18-.59-.33a1.66 1.66 0 0 1-.18-2.16Z" />
                                </svg>
                              </div>
                            )}
                            {method.type === "google" && (
                              <div className="h-8 w-8 flex items-center justify-center bg-white rounded-full">
                                <svg className="h-6 w-6" viewBox="0 0 24 24">
                                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                              </div>
                            )}
                            {method.type === "amazon" && (
                              <div className="h-8 w-8 flex items-center justify-center bg-[#ff9900] rounded">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="white">
                                  <path d="M19.45 14.15c-.34-.2-.75-.01-1.03.2-.71.59-1.48 1.06-2.3 1.39-.79.33-1.64.56-2.49.7-1.7.29-3.23.31-4.4.15-.86-.12-1.63-.31-2.31-.52-.68-.21-1.26-.44-1.75-.69-.35-.18-.74-.04-1 .25-.25.28-.31.67-.11 1.01.16.27.4.52.69.75.58.47 1.47.89 2.55 1.22 1.08.33 2.34.56 3.7.68 1.36.12 2.82.12 4.25-.04 1.43-.16 2.82-.45 4.09-.94 1.27-.49 2.42-1.18 3.27-2.1.25-.27.25-.7 0-.98-.12-.13-.27-.22-.42-.3-.15-.09-.31-.15-.48-.18-.17-.02-.35-.02-.52 0-.17.02-.33.07-.47.14-.13.07-.21.15-.28.25zm-9.4 4.93c1.98.15 3.97-.15 5.86-.77.22-.07.3-.35.08-.43-1.92-.92-3.84-1.24-5.74-.85-1.9.39-3.65 1.33-5.27 2.83-.15.14-.04.38.17.34 1.63-.4 3.25-.59 4.9-.45v-.67zm9.47-15.63c-.09-.09-.25-.12-.44-.11-.19.01-.4.06-.6.14-.2.08-.39.2-.56.32-.17.13-.29.29-.34.43-.06.15-.04.27.05.36.09.09.25.12.44.11.19-.01.4-.06.6-.14.2-.08.39-.2.56-.32.17-.13.29-.29.34-.43.06-.15.04-.27-.05-.36zm-.33-1.74c-.62-.14-1.26-.11-1.86.07-.6.19-1.17.52-1.65.97s-.87.96-1.1 1.54c-.22.58-.29 1.16-.19 1.73.1.57.36 1.08.76 1.44.4.36.9.57 1.42.64.52.07 1.06-.01 1.58-.22.52-.2 1.01-.54 1.41-.96.4-.42.72-.92.93-1.44.21-.52.3-1.05.27-1.55-.03-.51-.18-.98-.43-1.38-.24-.4-.58-.7-.99-.89-.21-.09-.43-.17-.66-.21-.23-.05-.48-.06-.72-.04-.24.02-.48.06-.7.14-.22.08-.43.18-.63.31-.2.13-.37.29-.52.47-.15.18-.26.38-.34.59-.07.22-.11.45-.09.66.01.22.08.42.2.61.06.1.18.15.3.09.12-.05.17-.18.11-.29-.08-.13-.12-.27-.13-.43-.01-.16.01-.33.06-.5.05-.17.14-.33.25-.48.11-.15.24-.29.4-.41.16-.12.33-.21.51-.28.18-.07.37-.11.56-.13.19-.01.39 0 .58.03.19.03.38.09.55.16.35.15.63.39.84.7.21.31.33.69.36 1.12.02.43-.05.89-.22 1.34-.17.45-.43.88-.78 1.26-.35.37-.76.67-1.22.85-.45.18-.92.24-1.36.19-.44-.06-.83-.22-1.13-.49-.3-.27-.51-.64-.59-1.1-.08-.46-.02-.99.16-1.49.18-.5.46-.96.83-1.35.36-.39.8-.7 1.27-.87.47-.16.97-.19 1.45-.08.14.03.26-.07.29-.21.03-.14-.07-.26-.21-.29zm-5.26-1.51c-.12-.12-.31-.15-.54-.1-.23.05-.48.19-.7.37-.22.19-.42.42-.55.69-.14.27-.2.57-.17.86.03.29.16.56.39.79.12.12.31.15.54.1.23-.05.48-.19.7-.37.22-.19.42-.42.55-.69.14-.27.2-.57.17-.86-.03-.29-.16-.56-.39-.79zm-2.09-.47c-.79-.18-1.58-.18-2.31-.01-.72.17-1.38.5-1.89.95s-.87 1-.95 1.6c-.08.59.11 1.18.5 1.71.39.53.99.98 1.71 1.26.72.27 1.56.36 2.39.28.83-.09 1.65-.35 2.33-.77.68-.42 1.22-.98 1.51-1.64.29-.65.32-1.39.07-2.09-.25-.7-.77-1.33-1.49-1.79-.72-.46-1.6-.75-2.5-.86-.45-.05-.84.36-.79.81.05.45.46.77.9.72.69.08 1.36.3 1.9.64.54.35.93.82 1.11 1.34.17.52.15 1.05-.07 1.49-.22.45-.63.81-1.14 1.09-.51.27-1.12.46-1.75.52-.62.07-1.27.01-1.81-.2-.54-.21-.97-.54-1.25-.91-.27-.38-.4-.78-.36-1.17.05-.39.26-.76.62-1.07.36-.31.85-.55 1.41-.68.56-.13 1.16-.14 1.75-.03.41.07.83-.19.94-.58.11-.39-.14-.79-.55-.87zm-7.35.73c.44-.18.89-.29 1.32-.35.43-.05.86-.03 1.25.04.39.07.74.19 1.05.36.31.17.56.38.76.62.19.24.33.5.4.78.07.28.07.57.02.86-.06.29-.17.56-.33.83-.16.26-.37.5-.63.72-.25.22-.55.4-.87.54-.33.14-.67.24-1.03.28-.36.04-.73.03-1.09-.04-.36-.07-.71-.19-1.04-.35-.33-.16-.64-.37-.9-.61-.26-.24-.49-.52-.66-.82-.17-.3-.28-.63-.31-.96-.04-.33 0-.67.13-.99.13-.32.33-.62.62-.89.28-.27.65-.5 1.08-.68.17-.07.25-.28.15-.43-.1-.15-.29-.22-.46-.15-.51.21-.96.49-1.3.82-.35.33-.61.71-.77 1.11-.16.4-.22.83-.18 1.25.04.43.18.85.39 1.24.21.39.5.73.83 1.04.33.3.71.55 1.11.76.4.2.83.35 1.26.43.43.09.87.11 1.29.07.42-.04.84-.15 1.21-.32.38-.17.72-.39 1.01-.67.29-.28.53-.61.69-.97.17-.36.28-.75.29-1.15.02-.4-.06-.8-.22-1.18-.16-.38-.41-.72-.73-1.03-.31-.31-.69-.56-1.12-.76-.42-.2-.89-.33-1.38-.39-.49-.06-1-.05-1.49.02-.49.07-1 .21-1.47.41-.25.1-.36.39-.24.62.11.23.4.34.65.23z"/>
                                </svg>
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div>
                                  <p className="font-medium">{method.label}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  {method.isDefault && (
                                    <Badge variant="outline" className="bg-primary/10">Default</Badge>
                                  )}
                                  <Button variant="ghost" size="icon">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    {/* Other Payment Methods */}
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Other Payment Methods</h4>
                      {paymentMethods.filter(m => ["bank", "crypto"].includes(m.type)).map((method) => (
                        <Card key={method.id} className="mb-3">
                          <CardContent className="p-4 flex items-center gap-4">
                            {method.type === "bank" && <BuildingIcon className="h-8 w-8 text-primary" />}
                            {method.type === "crypto" && <Bitcoin className="h-8 w-8 text-[#f7931a]" />}
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div>
                                  <p className="font-medium">{method.label}</p>
                                  {method.last4 && (
                                    <p className="text-sm text-muted-foreground">Account ending in {method.last4}</p>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  {method.isDefault && (
                                    <Badge variant="outline" className="bg-primary/10">Default</Badge>
                                  )}
                                  <Button variant="ghost" size="icon">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>Your recent payment activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {purchaseHistory.slice(0, 3).map((purchase) => (
                      <div key={purchase.id} className="p-3 bg-muted/20 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted overflow-hidden">
                            {purchase.startupLogo ? (
                              <ImageWithFallback 
                                src={purchase.startupLogo} 
                                alt={purchase.startupName} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <ShoppingCartIcon className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{purchase.productName}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <span>{formatDate(purchase.date)}</span>
                              <span>•</span>
                              <span>{purchase.startupName}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="font-medium">${purchase.price.toFixed(2)}</div>
                          <Button variant="ghost" size="sm" className="p-0 h-auto" onClick={() => viewPurchaseDetails(purchase)}>
                            <Receipt className="h-4 w-4 mr-1" />
                            <span className="text-xs">Receipt</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button variant="outline" onClick={() => setActiveTab("purchase-history")}>
                      View All Transactions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Add Payment Method</CardTitle>
                  <CardDescription>Select a payment type to add</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-2" 
                      onClick={() => setShowCardDialog(true)}
                    >
                      <CreditCard className="h-4 w-4" />
                      Add Credit or Debit Card
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-2"
                      onClick={() => setShowBankDialog(true)}
                    >
                      <BuildingIcon className="h-4 w-4" />
                      Add Bank Account
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-2"
                      onClick={() => setShowWalletDialog(true)}
                    >
                      <Smartphone className="h-4 w-4" />
                      Add Digital Wallet
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-2"
                      onClick={() => setShowCryptoDialog(true)}
                    >
                      <Bitcoin className="h-4 w-4" />
                      Add Cryptocurrency
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Billing Overview</CardTitle>
                  <CardDescription>Your monthly payment activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total spent this month</p>
                      <p className="text-2xl font-bold">$549.96</p>
                    </div>
                    <BarChart3 className="h-12 w-12 text-primary/70" />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <p className="text-sm">Subscriptions</p>
                      <p className="text-sm font-medium">$29.98</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">One-time purchases</p>
                      <p className="text-sm font-medium">$519.98</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">Pending payments</p>
                      <p className="text-sm font-medium">$549.99</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Purchase History Tab */}
        <TabsContent value="purchase-history" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Purchase History</CardTitle>
                  <CardDescription>All your transactions on VenturesRoom</CardDescription>
                </div>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search purchases..." 
                      className="pl-9 w-[220px]" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={purchaseFilter} onValueChange={setPurchaseFilter}>
                    <SelectTrigger className="w-[150px]">
                      <FilterIcon className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Purchases</SelectItem>
                      <SelectItem value="products">Products</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="subscriptions">Subscriptions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredPurchases.length > 0 ? (
                <div className="space-y-4">
                  {filteredPurchases.map((purchase) => (
                    <div key={purchase.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-muted/20 rounded-lg">
                      <div className="flex items-center gap-4 mb-3 md:mb-0">
                        <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden bg-muted">
                          {purchase.image ? (
                            <ImageWithFallback 
                              src={purchase.image} 
                              alt={purchase.productName} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ShoppingBag className="h-8 w-8 m-4 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{purchase.productName}</div>
                          <div className="text-sm text-muted-foreground">{purchase.startupName}</div>
                          <div className="text-sm flex items-center gap-2 mt-1">
                            <Badge variant="outline">
                              {purchase.productType === "product" ? "Product" : 
                               purchase.productType === "service" ? "Service" : "Subscription"}
                            </Badge>
                            <Badge variant="outline">{purchase.category}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-1">
                        <div className="font-medium">${purchase.price.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">{formatDate(purchase.date)}</div>
                        <Badge variant={
                          purchase.status === "completed" ? "outline" : 
                          purchase.status === "pending" ? "secondary" : 
                          purchase.status === "refunded" ? "destructive" : "default"
                        }>
                          {purchase.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2 mt-3 md:mt-0 ml-auto md:ml-4">
                        {purchase.downloadUrl && (
                          <Button variant="outline" size="sm" className="gap-1">
                            <Download className="h-4 w-4" />
                            <span className="hidden sm:inline">Download</span>
                          </Button>
                        )}
                        {purchase.accessUrl && (
                          <Button variant="outline" size="sm" className="gap-1">
                            <ExternalLink className="h-4 w-4" />
                            <span className="hidden sm:inline">Access</span>
                          </Button>
                        )}
                        <Button size="sm" onClick={() => viewPurchaseDetails(purchase)}>
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground opacity-50 mb-4" />
                  <p className="text-lg font-medium mb-2">No purchases found</p>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm 
                      ? "Try a different search term or filter"
                      : "You haven't made any purchases yet"}
                  </p>
                  <Button onClick={() => setActiveTab("marketplace")}>
                    Browse Marketplace
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <Avatar className="h-24 w-24">
                    {user?.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.name} />
                    ) : (
                      <AvatarFallback className="text-lg">
                        {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input value={user?.name || ""} disabled />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <Input value={user?.email || ""} disabled />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Account Type</label>
                      <Input value={user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ""} disabled />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Member Since</label>
                      <Input value={user?.joinDate ? formatDate(user.joinDate) : ""} disabled />
                    </div>
                  </div>
                  <Button onClick={openProfileDialog}>Edit Profile</Button>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Preferences</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive updates about your purchases and payments</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Subscription Reminders</p>
                      <p className="text-sm text-muted-foreground">Get notified before your subscriptions renew</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing Communications</p>
                      <p className="text-sm text-muted-foreground">Receive offers and updates from VenturesRoom</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Purchase Details Dialog */}
      <Dialog open={showPurchaseDetails} onOpenChange={setShowPurchaseDetails}>
        <DialogContent className="max-w-md">
          {selectedPurchase && (
            <>
              <DialogHeader>
                <DialogTitle>Purchase Details</DialogTitle>
                <DialogDescription>Transaction information</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="h-14 w-14 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    {selectedPurchase.image ? (
                      <ImageWithFallback 
                        src={selectedPurchase.image} 
                        alt={selectedPurchase.productName} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ShoppingBag className="h-8 w-8 m-3 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedPurchase.productName}</h3>
                    <p className="text-sm text-muted-foreground">{selectedPurchase.startupName}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Purchase Date</p>
                    <p className="font-medium">{formatDate(selectedPurchase.date)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Amount</p>
                    <p className="font-medium">${selectedPurchase.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-medium capitalize">{selectedPurchase.productType}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <Badge variant={
                      selectedPurchase.status === "completed" ? "outline" : 
                      selectedPurchase.status === "pending" ? "secondary" : 
                      selectedPurchase.status === "refunded" ? "destructive" : "default"
                    }>
                      {selectedPurchase.status}
                    </Badge>
                  </div>
                  {selectedPurchase.renewalDate && (
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Next Renewal</p>
                      <p className="font-medium">{formatDate(selectedPurchase.renewalDate)}</p>
                    </div>
                  )}
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Description</p>
                    <p className="font-medium">{selectedPurchase.description || "No description available"}</p>
                  </div>
                </div>
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                {selectedPurchase.downloadUrl && (
                  <Button variant="outline" className="w-full sm:w-auto gap-1">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                )}
                {selectedPurchase.accessUrl && (
                  <Button variant="outline" className="w-full sm:w-auto gap-1">
                    <ExternalLink className="h-4 w-4" />
                    Access Product
                  </Button>
                )}
                <Button variant="outline" className="w-full sm:w-auto gap-1">
                  <Receipt className="h-4 w-4" />
                  View Receipt
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Pending Payment Details Dialog */}
      <Dialog open={showPendingPaymentDetails} onOpenChange={setShowPendingPaymentDetails}>
        <DialogContent className="max-w-md">
          {pendingPaymentDetails && (
            <>
              <DialogHeader>
                <DialogTitle>Complete Payment</DialogTitle>
                <DialogDescription>Finalize your purchase</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="h-14 w-14 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    {pendingPaymentDetails.image ? (
                      <ImageWithFallback 
                        src={pendingPaymentDetails.image} 
                        alt={pendingPaymentDetails.productName} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ShoppingBag className="h-8 w-8 m-3 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{pendingPaymentDetails.productName}</h3>
                    <p className="text-sm text-muted-foreground">{pendingPaymentDetails.startupName}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Amount Due</p>
                    <p className="font-medium">${pendingPaymentDetails.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Payment Method</label>
                    <Select defaultValue="pm_1">
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map(method => (
                          <SelectItem key={method.id} value={method.id}>
                            {method.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <p className="text-sm">By proceeding with this payment, you agree to our terms of service and refund policy.</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowPendingPaymentDetails(false)}>Cancel</Button>
                <Button onClick={handlePayment}>Process Payment</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Generic Payment Method Dialog - Not used anymore */}
      <Dialog open={showPaymentMethodDialog} onOpenChange={setShowPaymentMethodDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>Select a payment type to add</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2" 
              onClick={() => { setShowPaymentMethodDialog(false); setShowCardDialog(true); }}
            >
              <CreditCard className="h-4 w-4" />
              Add Credit or Debit Card
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2"
              onClick={() => { setShowPaymentMethodDialog(false); setShowBankDialog(true); }}
            >
              <BuildingIcon className="h-4 w-4" />
              Add Bank Account
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2"
              onClick={() => { setShowPaymentMethodDialog(false); setShowWalletDialog(true); }}
            >
              <Smartphone className="h-4 w-4" />
              Add Digital Wallet
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2"
              onClick={() => { setShowPaymentMethodDialog(false); setShowCryptoDialog(true); }}
            >
              <Bitcoin className="h-4 w-4" />
              Add Cryptocurrency
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Credit Card Dialog */}
      <Dialog open={showCardDialog} onOpenChange={setShowCardDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Credit or Debit Card</DialogTitle>
            <DialogDescription>Enter your card details securely</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Card Type</label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant={cardType === "visa" ? "default" : "outline"}
                    size="sm"
                    className="h-8 px-3"
                    onClick={() => setCardType("visa")}
                  >
                    Visa
                  </Button>
                  <Button
                    type="button"
                    variant={cardType === "mastercard" ? "default" : "outline"}
                    size="sm"
                    className="h-8 px-3"
                    onClick={() => setCardType("mastercard")}
                  >
                    Mastercard
                  </Button>
                  <Button
                    type="button"
                    variant={cardType === "amex" ? "default" : "outline"}
                    size="sm"
                    className="h-8 px-3"
                    onClick={() => setCardType("amex")}
                  >
                    Amex
                  </Button>
                </div>
              </div>
              <div className="bg-gradient-to-br from-background/50 to-muted/50 p-4 rounded-lg border border-border mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/5 opacity-10"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/5 blur-sm"></div>
                <div className="relative">
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-8 w-12 rounded bg-gradient-to-br from-orange-400 to-red-500"></div>
                    <Sparkles className="h-6 w-6 text-primary/80" />
                  </div>
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground">Card Number</p>
                    <p className="font-mono text-lg">{cardNumber || "•••• •••• •••• ••••"}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Card Holder</p>
                      <p className="font-medium">{cardName || "YOUR NAME"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expires</p>
                      <p className="font-medium">{cardExpiry || "MM/YY"}</p>
                    </div>
                  </div>
                </div>
              </div>
              <label className="text-sm font-medium">Card Number</label>
              <Input 
                placeholder="4242 4242 4242 4242" 
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Expiration Date</label>
                <Input 
                  placeholder="MM/YY" 
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(formatExpiryDate(e.target.value))}
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Security Code (CVC)</label>
                <Input 
                  placeholder="CVC" 
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").substring(0, 4))}
                  maxLength={4}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Name on Card</label>
              <Input 
                placeholder="John Doe" 
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="default-card" 
                className="rounded"
                checked={isDefaultCard}
                onChange={(e) => setIsDefaultCard(e.target.checked)}
              />
              <label htmlFor="default-card" className="text-sm">Set as default payment method</label>
            </div>
            <div className="bg-muted/30 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="bg-primary/20 rounded-full p-1">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Your card information is securely encrypted</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCardDialog(false)}>Cancel</Button>
            <Button onClick={handleCardSubmit}>Add Card</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Bank Account Dialog */}
      <Dialog open={showBankDialog} onOpenChange={setShowBankDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Bank Account</DialogTitle>
            <DialogDescription>Connect your bank account for direct payments</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Bank Name</label>
              <Input 
                placeholder="Enter bank name" 
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Account Type</label>
              <Select value={accountType} onValueChange={setAccountType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checking">Checking Account</SelectItem>
                  <SelectItem value="savings">Savings Account</SelectItem>
                  <SelectItem value="business">Business Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Account Holder Name</label>
              <Input 
                placeholder="Enter full name" 
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Account Number</label>
              <Input 
                placeholder="Enter account number" 
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Routing Number</label>
              <Input 
                placeholder="Enter routing number" 
                value={routingNumber}
                onChange={(e) => setRoutingNumber(e.target.value.replace(/\D/g, ""))}
              />
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="default-bank" 
                className="rounded" 
                checked={isDefaultBank}
                onChange={(e) => setIsDefaultBank(e.target.checked)}
              />
              <label htmlFor="default-bank" className="text-sm">Set as default payment method</label>
            </div>
            <div className="bg-muted/30 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <BuildingIcon className="h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">Your bank account will be verified with micro-deposits</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBankDialog(false)}>Cancel</Button>
            <Button onClick={handleBankSubmit}>Add Bank Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Digital Wallet Dialog */}
      <Dialog open={showWalletDialog} onOpenChange={setShowWalletDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Digital Wallet</DialogTitle>
            <DialogDescription>Connect your preferred digital payment method</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Wallet Type</label>
              <div className="grid grid-cols-4 gap-2">
                <Button
                  variant={walletType === "paypal" ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-20 p-2"
                  onClick={() => setWalletType("paypal")}
                >
                  <div className="h-8 w-8 flex items-center justify-center bg-[#0070ba] rounded text-white font-bold mb-1">
                    P
                  </div>
                  <span className="text-xs">PayPal</span>
                </Button>
                <Button
                  variant={walletType === "apple" ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-20 p-2"
                  onClick={() => setWalletType("apple")}
                >
                  <div className="h-8 w-8 flex items-center justify-center bg-black rounded-full text-white mb-1">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.78 9.08c1.9.1 4.13 1.28 4.13 4.12 0 2.62-1.74 3.87-3.5 3.9H6.34c-1.74-.03-3.47-1.28-3.47-3.9 0-2.84 2.22-4.02 4.13-4.12.94-1.25 2.12-2.43 3.43-2.43 1.32 0 2.5 1.18 3.44 2.43Z" />
                    </svg>
                  </div>
                  <span className="text-xs">Apple Pay</span>
                </Button>
                <Button
                  variant={walletType === "google" ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-20 p-2"
                  onClick={() => setWalletType("google")}
                >
                  <div className="h-8 w-8 flex items-center justify-center bg-white rounded-full mb-1">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <span className="text-xs">Google Pay</span>
                </Button>
                <Button
                  variant={walletType === "amazon" ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-20 p-2"
                  onClick={() => setWalletType("amazon")}
                >
                  <div className="h-8 w-8 flex items-center justify-center bg-[#ff9900] rounded mb-1">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="white">
                      <path d="M19.45 14.15c-.34-.2-.75-.01-1.03.2-.71.59-1.48 1.06-2.3 1.39-.79.33-1.64.56-2.49.7-1.7.29-3.23.31-4.4.15-.86-.12-1.63-.31-2.31-.52-.68-.21-1.26-.44-1.75-.69-.35-.18-.74-.04-1 .25-.25.28-.31.67-.11 1.01.16.27.4.52.69.75.58.47 1.47.89 2.55 1.22 1.08.33 2.34.56 3.7.68 1.36.12 2.82.12 4.25-.04 1.43-.16 2.82-.45 4.09-.94 1.27-.49 2.42-1.18 3.27-2.1.25-.27.25-.7 0-.98-.12-.13-.27-.22-.42-.3-.15-.09-.31-.15-.48-.18-.17-.02-.35-.02-.52 0-.17.02-.33.07-.47.14-.13.07-.21.15-.28.25z"/>
                    </svg>
                  </div>
                  <span className="text-xs">Amazon Pay</span>
                </Button>
              </div>
            </div>
            
            {walletType === "paypal" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">PayPal Email</label>
                <Input 
                  type="email"
                  placeholder="example@email.com" 
                  value={walletEmail}
                  onChange={(e) => setWalletEmail(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">We'll redirect you to PayPal to complete the connection</p>
              </div>
            )}
            
            {(walletType === "apple" || walletType === "google") && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input 
                    type="email"
                    placeholder="example@email.com" 
                    value={walletEmail}
                    onChange={(e) => setWalletEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input 
                    placeholder="+1 (555) 123-4567" 
                    value={walletPhone}
                    onChange={(e) => setWalletPhone(e.target.value)}
                  />
                </div>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">You'll need to authenticate this connection using your device.</p>
                </div>
              </div>
            )}
            
            {walletType === "amazon" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Amazon Email</label>
                <Input 
                  type="email"
                  placeholder="example@email.com" 
                  value={walletEmail}
                  onChange={(e) => setWalletEmail(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">We'll redirect you to Amazon to complete the connection</p>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="default-wallet" 
                className="rounded"
                checked={isDefaultWallet}
                onChange={(e) => setIsDefaultWallet(e.target.checked)}
              />
              <label htmlFor="default-wallet" className="text-sm">Set as default payment method</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWalletDialog(false)}>Cancel</Button>
            <Button onClick={handleWalletSubmit}>Connect Wallet</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Cryptocurrency Dialog */}
      <Dialog open={showCryptoDialog} onOpenChange={setShowCryptoDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Cryptocurrency</DialogTitle>
            <DialogDescription>Set up cryptocurrency payments</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cryptocurrency</label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={cryptoType === "bitcoin" ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-20 p-2"
                  onClick={() => setCryptoType("bitcoin")}
                >
                  <Bitcoin className="h-8 w-8 text-[#f7931a] mb-1" />
                  <span className="text-xs">Bitcoin</span>
                </Button>
                <Button
                  variant={cryptoType === "ethereum" ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-20 p-2"
                  onClick={() => setCryptoType("ethereum")}
                >
                  <div className="h-8 w-8 flex items-center justify-center mb-1">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#627eea">
                      <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
                    </svg>
                  </div>
                  <span className="text-xs">Ethereum</span>
                </Button>
                <Button
                  variant={cryptoType === "usdc" ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-20 p-2"
                  onClick={() => setCryptoType("usdc")}
                >
                  <div className="h-8 w-8 flex items-center justify-center bg-[#2775ca] rounded-full text-white mb-1">
                    <span className="text-xs font-bold">USDC</span>
                  </div>
                  <span className="text-xs">USD Coin</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Network</label>
              <Select value={cryptoNetwork} onValueChange={setCryptoNetwork}>
                <SelectTrigger>
                  <SelectValue placeholder="Select network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mainnet">Mainnet</SelectItem>
                  {cryptoType === "ethereum" && (
                    <>
                      <SelectItem value="polygon">Polygon</SelectItem>
                      <SelectItem value="arbitrum">Arbitrum</SelectItem>
                      <SelectItem value="optimism">Optimism</SelectItem>
                    </>
                  )}
                  {cryptoType === "usdc" && (
                    <>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="solana">Solana</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Wallet Address</label>
              <div className="flex">
                <Input 
                  placeholder={`Enter ${cryptoType} address`} 
                  value={cryptoAddress}
                  onChange={(e) => setCryptoAddress(e.target.value)}
                  className="flex-1 rounded-r-none"
                />
                <Button 
                  variant="outline" 
                  className="rounded-l-none border-l-0"
                  onClick={() => {
                    navigator.clipboard.readText().then(
                      text => setCryptoAddress(text),
                      err => console.error('Failed to read clipboard: ', err)
                    );
                  }}
                >
                  <Clipboard className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="mt-4 border rounded-lg overflow-hidden bg-muted/20">
              <div className="p-4 flex items-center justify-between border-b">
                <div className="flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-primary" />
                  <p className="font-medium">Scan QR Code</p>
                </div>
                <Button variant="outline" size="sm">
                  Show QR
                </Button>
              </div>
              <div className="p-4 text-sm text-muted-foreground">
                You can also scan a QR code to automatically enter your wallet address
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="default-crypto" 
                className="rounded"
                checked={isDefaultCrypto}
                onChange={(e) => setIsDefaultCrypto(e.target.checked)}
              />
              <label htmlFor="default-crypto" className="text-sm">Set as default payment method</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCryptoDialog(false)}>Cancel</Button>
            <Button onClick={handleCryptoSubmit}>Add Cryptocurrency</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Profile Edit Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Update your account information</DialogDescription>
          </DialogHeader>
          
          <ProfileTabs value={profileTab} onValueChange={setProfileTab} className="w-full">
            <ProfileTabsList className="grid w-full grid-cols-2">
              <ProfileTabsTrigger value="general" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                General Information
              </ProfileTabsTrigger>
              <ProfileTabsTrigger value="security" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Security & Password
              </ProfileTabsTrigger>
            </ProfileTabsList>
            
            {/* General Information Tab */}
            <ProfileTabsContent value="general" className="space-y-6 py-4">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="flex-shrink-0 relative group">
                    <Avatar className="h-24 w-24 border-2 border-primary/20">
                      {user?.avatar ? (
                        <AvatarImage src={user.avatar} alt={user.name} />
                      ) : (
                        <AvatarFallback className="text-xl">
                          {editedName.split(' ').map(n => n[0]).join('') || 'U'}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                    <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 p-0 rounded-full">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input 
                          value={editedName} 
                          onChange={(e) => setEditedName(e.target.value)} 
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <Input 
                          value={editedEmail} 
                          onChange={(e) => setEditedEmail(e.target.value)} 
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone Number</label>
                        <Input 
                          value={editedPhone} 
                          onChange={(e) => setEditedPhone(e.target.value)} 
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Company/Organization</label>
                        <Input 
                          value={editedCompany} 
                          onChange={(e) => setEditedCompany(e.target.value)} 
                          placeholder="Enter your company or organization"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input 
                          value={editedLocation} 
                          onChange={(e) => setEditedLocation(e.target.value)} 
                          placeholder="City, Country"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Website</label>
                        <Input 
                          value={editedWebsite} 
                          onChange={(e) => setEditedWebsite(e.target.value)} 
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Bio</label>
                  <Textarea 
                    value={editedBio} 
                    onChange={(e) => setEditedBio(e.target.value)} 
                    placeholder="Tell us about yourself"
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">Brief description for your profile.</p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Communication Preferences</h3>
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="space-y-0.5">
                      <label className="text-sm">Email Notifications</label>
                      <p className="text-xs text-muted-foreground">Receive important updates and notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="space-y-0.5">
                      <label className="text-sm">Marketing Communications</label>
                      <p className="text-xs text-muted-foreground">Receive offers, promotions, and news</p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm">SMS Notifications</label>
                      <p className="text-xs text-muted-foreground">Receive text messages for important updates</p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowProfileDialog(false)}>Cancel</Button>
                <Button onClick={handleProfileSubmit} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </DialogFooter>
            </ProfileTabsContent>
            
            {/* Security & Password Tab */}
            <ProfileTabsContent value="security" className="space-y-6 py-4">
              <div className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Password Security</h3>
                      <p className="text-sm text-muted-foreground">
                        Keep your account secure with a strong password that you don't use elsewhere
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Change Password</h3>
                  
                  {passwordError && (
                    <div className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-lg text-sm">
                      {passwordError}
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Current Password</label>
                      <Input 
                        type="password" 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter your current password"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">New Password</label>
                      <Input 
                        type="password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter your new password"
                      />
                      <p className="text-xs text-muted-foreground">
                        Password must be at least 8 characters and include a mix of letters, numbers, and symbols
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Confirm Password</label>
                      <Input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your new password"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Security Options</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b pb-3">
                      <div className="space-y-0.5">
                        <label className="text-sm">Two-Factor Authentication</label>
                        <p className="text-xs text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-3">
                      <div className="space-y-0.5">
                        <label className="text-sm">Login Notifications</label>
                        <p className="text-xs text-muted-foreground">
                          Get notified when someone logs into your account
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm">Login History</label>
                        <p className="text-xs text-muted-foreground">
                          View your recent login activity
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setShowProfileDialog(false)}>Cancel</Button>
                <Button onClick={handlePasswordChange} className="gap-2">
                  <KeyRound className="h-4 w-4" />
                  Change Password
                </Button>
              </DialogFooter>
            </ProfileTabsContent>
          </ProfileTabs>
        </DialogContent>
      </Dialog>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-4 right-4 bg-green-500/90 text-white p-4 rounded-lg shadow-lg max-w-xs flex items-center gap-3 z-50">
          <CheckIcon className="h-5 w-5" />
          <div className="flex-1">
            <p>{successMessage}</p>
          </div>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full text-white" onClick={() => setShowSuccessToast(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
