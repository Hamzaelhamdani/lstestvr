import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  RocketIcon, 
  BuildingIcon, 
  UserIcon, 
  ChevronRightIcon, 
  ChevronLeftIcon, 
  StarIcon,
  PackageIcon,
  ShoppingBagIcon,
  BarChartIcon,
  HeartIcon,
  ZapIcon,
  TrophyIcon,
  CheckCircleIcon
} from "lucide-react";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Badge } from "../ui/badge";
import { HowItWorks } from "./HowItWorks";
import { VenturesClubElite } from "./VenturesClubElite";
import { TransformCTA } from "./TransformCTA";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

// User type cards data
const userTypeCards = [
  {
    id: "startups",
    title: "For Startups",
    description: "Create your storefront, showcase products or services, and connect with other startups in the ecosystem.",
    icon: RocketIcon,
    iconColor: "text-[#a7ee43]",
    iconBg: "bg-[#a7ee43]/10",
    color: "bg-gradient-to-br from-[#080f17] to-[#0c131c] backdrop-blur-sm",
    link: "#startup-features"
  },
  {
    id: "incubators",
    title: "For Support Structures",
    description: "Register, list and promote startups you support while earning commissions on successful sales.",
    icon: BuildingIcon,
    iconColor: "text-[#8A4FFF]",
    iconBg: "bg-[#8A4FFF]/10",
    color: "bg-gradient-to-br from-[#080f17] to-[#0c131c] backdrop-blur-sm",
    link: "#incubator-features"
  },
  {
    id: "clients",
    title: "For Clients",
    description: "Discover innovative startups, browse curated products and services, and make secure purchases.",
    icon: UserIcon,
    iconColor: "text-[#0066FF]",
    iconBg: "bg-[#0066FF]/10", 
    color: "bg-gradient-to-br from-[#080f17] to-[#0c131c] backdrop-blur-sm",
    link: "#client-features"
  }
];

// Featured startups data
const featuredStartups = [
  {
    id: "startup-1",
    name: "NeuraTech AI",
    logo: "https://images.unsplash.com/photo-1639803781616-38cf235b5af3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "AI Software",
    description: "Enterprise-grade AI solutions for predictive analytics and process automation.",
    tags: ["AI", "Machine Learning", "Enterprise"],
    rating: 4.8,
    reviews: 124,
    featured: true
  },
  {
    id: "startup-2",
    name: "GreenLoop",
    logo: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "CleanTech",
    description: "Sustainable recycling technology that converts plastic waste into reusable materials.",
    tags: ["CleanTech", "Sustainability", "B2B"],
    rating: 4.6,
    reviews: 87,
    featured: true
  },
  {
    id: "startup-3",
    name: "HealthSync",
    logo: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "HealthTech",
    description: "Remote patient monitoring platform that integrates with existing healthcare systems.",
    tags: ["HealthTech", "IoT", "SaaS"],
    rating: 4.9,
    reviews: 156,
    featured: true
  },
  {
    id: "startup-4",
    name: "FinEdge",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "FinTech",
    description: "Next-generation payment processing with enhanced security and lower transaction fees.",
    tags: ["FinTech", "Payments", "Security"],
    rating: 4.7,
    reviews: 93,
    featured: true
  },
  {
    id: "startup-5",
    name: "TravelMate",
    logo: "https://images.unsplash.com/photo-1476357471311-43c0db9fb2b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Travel Tech",
    description: "AI-powered travel assistant that personalizes experiences and finds hidden deals.",
    tags: ["Travel", "AI", "Mobile"],
    rating: 4.5,
    reviews: 78,
    featured: false
  }
];

// Featured products and services data
const featuredProductsServices = [
  {
    id: "product-1",
    name: "CloudOps Suite",
    creator: "NeuraTech AI",
    image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "SaaS",
    description: "AI-powered DevOps automation platform that streamlines cloud infrastructure management.",
    price: "$299/month",
    tags: ["Cloud", "DevOps", "Automation"],
    rating: 4.9,
    reviews: 112,
    featured: true
  },
  {
    id: "product-2",
    name: "RecycleTrack",
    creator: "GreenLoop",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Hardware + Software",
    description: "IoT-enabled waste management system for corporate sustainability initiatives.",
    price: "$1,499",
    tags: ["IoT", "Sustainability", "Corporate"],
    rating: 4.7,
    reviews: 58,
    featured: true
  },
  {
    id: "product-3",
    name: "PatientConnect Pro",
    creator: "HealthSync",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Healthcare SaaS",
    description: "HIPAA-compliant patient engagement platform with real-time monitoring and alerts.",
    price: "$199/month",
    tags: ["Healthcare", "HIPAA", "Patient Care"],
    rating: 4.8,
    reviews: 94,
    featured: true
  },
  {
    id: "product-4",
    name: "PaymentGuard",
    creator: "FinEdge",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "FinTech",
    description: "Secure payment processing solution with advanced fraud detection for e-commerce.",
    price: "1.2% per transaction",
    tags: ["Payments", "Security", "E-commerce"],
    rating: 4.9,
    reviews: 136,
    featured: true
  },
  {
    id: "product-5",
    name: "TravelAI Assistant",
    creator: "TravelMate",
    image: "https://images.unsplash.com/photo-1499591934245-40b55745b905?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Travel Tech",
    description: "AI-powered travel planning and booking assistant with personalized recommendations.",
    price: "$9.99/month",
    tags: ["Travel", "AI", "Mobile"],
    rating: 4.6,
    reviews: 82,
    featured: true
  }
];

// Featured support structures data
const featuredSupportStructures = [
  {
    id: "support-1",
    name: "TechStars",
    logo: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Accelerator",
    description: "Leading global accelerator focused on tech startups with a proven track record of success.",
    startups: 34,
    successRate: "82%",
    tags: ["Global", "Tech", "Seed Stage"],
    rating: 4.9,
    reviews: 148,
    featured: true
  },
  {
    id: "support-2",
    name: "GreenVentures",
    logo: "https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Incubator",
    description: "Specialized incubator for cleantech and sustainability startups with lab facilities.",
    startups: 22,
    successRate: "75%",
    tags: ["CleanTech", "Sustainability", "Early Stage"],
    rating: 4.7,
    reviews: 93,
    featured: true
  },
  {
    id: "support-3",
    name: "MediInnovate Hub",
    logo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Incubator",
    description: "Healthcare-focused incubator with connections to major medical institutions.",
    startups: 18,
    successRate: "79%",
    tags: ["Healthcare", "BioTech", "Research"],
    rating: 4.8,
    reviews: 86,
    featured: true
  },
  {
    id: "support-4",
    name: "FinTech Catalyst",
    logo: "https://images.unsplash.com/photo-1573164713988-8665321e3219?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Accelerator",
    description: "Specialized accelerator for financial technology startups with regulatory expertise.",
    startups: 26,
    successRate: "81%",
    tags: ["FinTech", "Regulatory", "Growth Stage"],
    rating: 4.9,
    reviews: 112,
    featured: true
  },
  {
    id: "support-5",
    name: "Global Innovators",
    logo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Venture Studio",
    description: "International venture studio that co-builds startups across multiple industries.",
    startups: 41,
    successRate: "68%",
    tags: ["International", "Multi-sector", "Co-founding"],
    rating: 4.6,
    reviews: 124,
    featured: true
  }
];

// Platform stats
const platformStats = [
  { label: "Startups", value: "300+", color: "text-[#a7ee43]", icon: RocketIcon },
  { label: "Incubators", value: "50+", color: "text-[#a7ee43]", icon: BuildingIcon },
  { label: "Clients", value: "12+", color: "text-[#a7ee43]", icon: UserIcon }
];

export function HomePage() {
  // States for each carousel
  const [currentStartupSlide, setCurrentStartupSlide] = useState(0);
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [currentSupportSlide, setCurrentSupportSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("startups");

  // Functions to handle slides for startups
  const nextStartupSlide = () => {
    setCurrentStartupSlide((prev) => (prev === featuredStartups.length - 3 ? 0 : prev + 1));
  };

  const prevStartupSlide = () => {
    setCurrentStartupSlide((prev) => (prev === 0 ? featuredStartups.length - 3 : prev - 1));
  };

  // Functions to handle slides for products/services
  const nextProductSlide = () => {
    setCurrentProductSlide((prev) => (prev === featuredProductsServices.length - 3 ? 0 : prev + 1));
  };

  const prevProductSlide = () => {
    setCurrentProductSlide((prev) => (prev === 0 ? featuredProductsServices.length - 3 : prev - 1));
  };

  // Functions to handle slides for support structures
  const nextSupportSlide = () => {
    setCurrentSupportSlide((prev) => (prev === featuredSupportStructures.length - 3 ? 0 : prev + 1));
  };

  const prevSupportSlide = () => {
    setCurrentSupportSlide((prev) => (prev === 0 ? featuredSupportStructures.length - 3 : prev - 1));
  };

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const startupInterval = setInterval(() => {
      if (activeTab === "startups") nextStartupSlide();
    }, 5000);
    
    const productInterval = setInterval(() => {
      if (activeTab === "products") nextProductSlide();
    }, 5000);
    
    const supportInterval = setInterval(() => {
      if (activeTab === "support") nextSupportSlide();
    }, 5000);
    
    return () => {
      clearInterval(startupInterval);
      clearInterval(productInterval);
      clearInterval(supportInterval);
    };
  }, [activeTab, currentStartupSlide, currentProductSlide, currentSupportSlide]);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Updated to match the reference image */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-[#080f17] px-4">
        {/* Subtle stars background */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 100 }).map((_, i) => (
            <div 
              key={i}
              className="star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 0.5}px`,
                height: `${Math.random() * 2 + 0.5}px`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 5 + 3}s`,
                opacity: Math.random() * 0.7 + 0.3
              }}
            />
          ))}
        </div>
        
        {/* Hero content */}
        <div className="max-w-4xl mx-auto w-full z-10 text-center">
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-[#a7ee43]">VENTURES</span>
              <span className="text-white">ROOM</span>
            </h1>
            
            {/* Tagline */}
            <p className="text-base md:text-lg text-gray-300 mb-16 max-w-2xl">
              The future of startup ecosystems. Connect, collaborate, and scale in our digital 
              venture space.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-12 mb-16">
              {platformStats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * i + 0.5 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full border border-[#1e293b] bg-[#0f172a]/50 flex items-center justify-center mb-3">
                    <stat.icon className="h-6 w-6 text-[#a7ee43]" />
                  </div>
                  <span className="text-2xl font-bold mb-1 text-white">
                    {stat.value}
                  </span>
                  <span className="text-sm text-gray-400">{stat.label}</span>
                </motion.div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-[#a7ee43] hover:bg-[#b6f25c] text-black px-8 py-6 text-base rounded-full transition-all"
                onClick={() => window.navigateTo?.('auth')}
              >
                Get Started
              </Button>
              
              <Button 
                variant="outline" 
                className="bg-transparent border border-gray-700 hover:border-[#a7ee43]/50 hover:bg-white/5 text-white px-8 py-6 text-base rounded-full"
                onClick={() => window.navigateTo?.('marketplace')}
              >
                Explore Marketplace
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Tailored For Everyone Section */}
      <section className="py-24 px-4 relative">
        {/* Enhanced background with gradients and decorative elements */}
        <div className="absolute inset-0 bg-[#080f17] overflow-hidden">
          {/* Base gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#080f17] via-[#0a1019] to-[#080f17]"></div>
          
          {/* Subtle radial gradients */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#a7ee43]/3 blur-[100px] opacity-40"></div>
            <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-[#8A4FFF]/3 blur-[120px] opacity-30"></div>
          </div>
          
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(rgba(214, 221, 230, 0.8) 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}
          ></div>
          
          {/* Subtle animated glow */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full bg-[#a7ee43]/5 blur-[150px]"
            initial={{ opacity: 0.3 }}
            animate={{ 
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
            style={{
              transform: 'translate(-50%, -50%)'
            }}
          ></motion.div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-[#080f17] via-[#131e29] to-[#080f17] p-1.5 rounded-full mb-4">
              <div className="bg-[#a7ee43]/10 px-4 py-1.5 rounded-full">
                <span className="text-sm font-semibold uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#a7ee43] to-[#c1f17e]">
                  Complete Ecosystem
                </span>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Tailored For <span className="text-[#a7ee43]">Everyone</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              VenturesRoom offers specialized features for each user type in the startup ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userTypeCards.map((card, index) => (
              <motion.div
                key={card.id}
                className={`rounded-2xl p-8 h-full transition-all ${card.color} border border-gray-800 hover:border-[#a7ee43]/50 hover:shadow-lg hover:shadow-[#a7ee43]/5 backdrop-blur-md`}
                whileHover={{ y: -5 }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                custom={index}
              >
                <div className={`${card.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-6`}>
                  <card.icon className={`h-6 w-6 ${card.iconColor}`} />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">{card.title}</h3>
                <p className="text-gray-400 mb-6">{card.description}</p>
                <a href={card.link} className="inline-flex items-center text-[#a7ee43] hover:text-[#b6f25c]">
                  Learn more <ChevronRightIcon className="ml-1 h-4 w-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Categories Section - Redesigned with tabs */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Background with subtle gradients */}
        <div className="absolute inset-0 bg-[#080f17] overflow-hidden">
          {/* Base gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#080f17] via-[#0a1221] to-[#080f17]"></div>
          
          {/* Subtle glow effects */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#8A4FFF]/5 blur-[150px] opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#a7ee43]/5 blur-[150px] opacity-30"></div>
          
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(rgba(214, 221, 230, 0.5) 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}
          ></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block bg-gradient-to-r from-[#080f17] via-[#131e29] to-[#080f17] p-1.5 rounded-full mb-4">
              <div className="bg-[#a7ee43]/10 px-4 py-1.5 rounded-full">
                <span className="text-sm font-semibold uppercase tracking-wider text-[#a7ee43]">
                  Discover Excellence
                </span>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-[#a7ee43]">Featured</span> Highlights
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Explore the best of our ecosystem across startups, products, and support structures
            </p>
          </motion.div>
          
          {/* Tabs for different categories */}
          <Tabs defaultValue="startups" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-[#0c131d] border border-gray-800 p-1 rounded-full">
                <TabsTrigger 
                  value="startups" 
                  className="rounded-full px-6 py-3 data-[state=active]:bg-[#a7ee43] data-[state=active]:text-black transition-all duration-300"
                >
                  <RocketIcon className="h-4 w-4 mr-2" />
                  Best Startups
                </TabsTrigger>
                <TabsTrigger 
                  value="products" 
                  className="rounded-full px-6 py-3 data-[state=active]:bg-[#a7ee43] data-[state=active]:text-black transition-all duration-300"
                >
                  <PackageIcon className="h-4 w-4 mr-2" />
                  Best Products
                </TabsTrigger>
                <TabsTrigger 
                  value="support" 
                  className="rounded-full px-6 py-3 data-[state=active]:bg-[#a7ee43] data-[state=active]:text-black transition-all duration-300"
                >
                  <BuildingIcon className="h-4 w-4 mr-2" />
                  Best Support
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Tab content for startups */}
            <TabsContent value="startups" className="outline-none">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#a7ee43]/10 flex items-center justify-center mr-4">
                    <TrophyIcon className="h-5 w-5 text-[#a7ee43]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Best Featured Startups</h3>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-white/5 border-gray-800 hover:bg-white/10 hover:border-[#a7ee43]/50 rounded-full h-10 w-10"
                    onClick={prevStartupSlide}
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-white/5 border-gray-800 hover:bg-white/10 hover:border-[#a7ee43]/50 rounded-full h-10 w-10"
                    onClick={nextStartupSlide}
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentStartupSlide * (100 / featuredStartups.length) * 3}%)` }}
                >
                  {featuredStartups.map((startup) => (
                    <div 
                      key={startup.id} 
                      className="min-w-[calc(100%-1rem)] sm:min-w-[calc(50%-1rem)] md:min-w-[calc(33.333%-1rem)] px-2"
                    >
                      <motion.div 
                        className="startup-card bg-[#0c131d]/80 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden h-full"
                        whileHover={{ y: -5 }}
                      >
                        <div className="relative">
                          <ImageWithFallback
                            src={startup.logo}
                            alt={startup.name}
                            className="w-full h-48 object-cover"
                            width={400}
                            height={200}
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-black/50 backdrop-blur-sm text-white border-0">
                              {startup.category}
                            </Badge>
                          </div>
                          {startup.featured && (
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-[#a7ee43] text-black border-0 flex items-center">
                                <StarIcon className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-2">{startup.name}</h3>
                          <p className="text-gray-400 text-sm mb-4">
                            {startup.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-6">
                            {startup.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="text-xs bg-[#a7ee43]/10 text-[#a7ee43] px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-sm font-medium">{startup.rating}</span>
                              <span className="text-xs text-gray-500 ml-1">({startup.reviews})</span>
                            </div>
                            
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs bg-white/5 hover:bg-white/10 border-gray-800 hover:border-[#a7ee43]/50"
                              onClick={() => window.navigateTo?.('startup-storefront', { startupId: startup.id })}
                            >
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Tab content for products and services */}
            <TabsContent value="products" className="outline-none">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#8A4FFF]/10 flex items-center justify-center mr-4">
                    <ShoppingBagIcon className="h-5 w-5 text-[#8A4FFF]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Best Products & Services</h3>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-white/5 border-gray-800 hover:bg-white/10 hover:border-[#8A4FFF]/50 rounded-full h-10 w-10"
                    onClick={prevProductSlide}
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-white/5 border-gray-800 hover:bg-white/10 hover:border-[#8A4FFF]/50 rounded-full h-10 w-10"
                    onClick={nextProductSlide}
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentProductSlide * (100 / featuredProductsServices.length) * 3}%)` }}
                >
                  {featuredProductsServices.map((product) => (
                    <div 
                      key={product.id} 
                      className="min-w-[calc(100%-1rem)] sm:min-w-[calc(50%-1rem)] md:min-w-[calc(33.333%-1rem)] px-2"
                    >
                      <motion.div 
                        className="startup-card bg-[#0c131d]/80 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden h-full"
                        whileHover={{ y: -5 }}
                      >
                        <div className="relative">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                            width={400}
                            height={200}
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-black/50 backdrop-blur-sm text-white border-0">
                              {product.category}
                            </Badge>
                          </div>
                          {product.featured && (
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-[#8A4FFF] text-white border-0 flex items-center">
                                <StarIcon className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                          <p className="text-gray-500 text-sm mb-3">by {product.creator}</p>
                          <p className="text-gray-400 text-sm mb-3">
                            {product.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {product.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="text-xs bg-[#8A4FFF]/10 text-[#8A4FFF] px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-sm font-bold text-[#8A4FFF]">{product.price}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                                <span className="text-sm font-medium">{product.rating}</span>
                              </div>
                              
                              <Button 
                                size="sm" 
                                className="text-xs bg-[#8A4FFF] hover:bg-[#7A3FFE] text-white border-0"
                                onClick={() => window.navigateTo?.('marketplace')}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Tab content for support structures */}
            <TabsContent value="support" className="outline-none">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#0066FF]/10 flex items-center justify-center mr-4">
                    <BarChartIcon className="h-5 w-5 text-[#0066FF]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Best Support Structures</h3>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-white/5 border-gray-800 hover:bg-white/10 hover:border-[#0066FF]/50 rounded-full h-10 w-10"
                    onClick={prevSupportSlide}
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-white/5 border-gray-800 hover:bg-white/10 hover:border-[#0066FF]/50 rounded-full h-10 w-10"
                    onClick={nextSupportSlide}
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSupportSlide * (100 / featuredSupportStructures.length) * 3}%)` }}
                >
                  {featuredSupportStructures.map((support) => (
                    <div 
                      key={support.id} 
                      className="min-w-[calc(100%-1rem)] sm:min-w-[calc(50%-1rem)] md:min-w-[calc(33.333%-1rem)] px-2"
                    >
                      <motion.div 
                        className="startup-card bg-[#0c131d]/80 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden h-full"
                        whileHover={{ y: -5 }}
                      >
                        <div className="relative">
                          <ImageWithFallback
                            src={support.logo}
                            alt={support.name}
                            className="w-full h-48 object-cover"
                            width={400}
                            height={200}
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-black/50 backdrop-blur-sm text-white border-0">
                              {support.category}
                            </Badge>
                          </div>
                          {support.featured && (
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-[#0066FF] text-white border-0 flex items-center">
                                <StarIcon className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-2">{support.name}</h3>
                          <p className="text-gray-400 text-sm mb-4">
                            {support.description}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-[#0c131d] rounded-lg p-3 border border-gray-800">
                              <p className="text-xs text-gray-400 mb-1">Startups Supported</p>
                              <p className="text-xl font-bold text-white">{support.startups}</p>
                            </div>
                            <div className="bg-[#0c131d] rounded-lg p-3 border border-gray-800">
                              <p className="text-xs text-gray-400 mb-1">Success Rate</p>
                              <p className="text-xl font-bold text-[#0066FF]">{support.successRate}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {support.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="text-xs bg-[#0066FF]/10 text-[#0066FF] px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-sm font-medium">{support.rating}</span>
                              <span className="text-xs text-gray-500 ml-1">({support.reviews})</span>
                            </div>
                            
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs bg-white/5 hover:bg-white/10 border-gray-800 hover:border-[#0066FF]/50"
                              onClick={() => window.navigateTo?.('support-structure-dashboard')}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-center mt-12">
            <Button 
              className="bg-white/5 backdrop-blur-sm border border-gray-700 hover:bg-white/10 hover:border-[#a7ee43]/50 text-white rounded-full px-8"
              onClick={() => window.navigateTo?.('marketplace')}
            >
              View All {activeTab === "startups" ? "Startups" : activeTab === "products" ? "Products & Services" : "Support Structures"}
            </Button>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* VenturesClub Elite */}
      <VenturesClubElite />
      
      {/* Call to Action */}
      <TransformCTA />
    </div>
  );
}