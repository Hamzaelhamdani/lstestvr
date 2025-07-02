import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Search, 
  Star, 
  Filter,
  MapPin, 
  Calendar, 
  Users, 
  Award,
  ArrowUpRight,
  Building
} from "lucide-react@0.487.0";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

// Sample data for startups
const startups = [
  {
    id: "quantum-analytics",
    name: "Quantum Analytics",
    tagline: "AI-powered analytics platform for startups and small businesses",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&h=300&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1200&h=400&fit=crop&q=80",
    rating: 4.9,
    reviews: 128,
    location: "San Francisco, CA",
    founded: "2021",
    employees: "10-50",
    funding: "$2.5M Seed",
    incubator: "TechStars",
    categories: ["Analytics", "AI", "SaaS"],
    description: "AI-powered analytics platform helping startups make data-driven decisions with real-time insights and predictive analytics."
  },
  {
    id: "echostream",
    name: "EchoStream",
    tagline: "Cloud-native streaming platform for modern applications",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&h=300&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=400&fit=crop&q=80",
    rating: 4.7,
    reviews: 92,
    location: "Austin, TX",
    founded: "2020",
    employees: "20-100",
    funding: "$4.2M Series A",
    incubator: "Y Combinator",
    categories: ["Cloud", "DevOps", "Infrastructure"],
    description: "Cloud-native streaming solution that enables real-time data processing and analysis at scale for enterprises and growing businesses."
  },
  {
    id: "neural-health",
    name: "Neural Health",
    tagline: "AI-powered mental health support and resources",
    logo: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=300&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1631549916768-4119b4123a21?w=1200&h=400&fit=crop&q=80",
    rating: 4.8,
    reviews: 76,
    location: "Boston, MA",
    founded: "2022",
    employees: "5-20",
    funding: "$1.8M Seed",
    incubator: "Techstars",
    categories: ["Healthcare", "AI", "Wellness"],
    description: "Pioneering AI-driven platform providing accessible mental health resources, personalized support, and evidence-based interventions."
  },
  {
    id: "fintech-pro",
    name: "Fintech Pro",
    tagline: "Modern financial tools for small businesses",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=300&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?w=1200&h=400&fit=crop&q=80",
    rating: 4.5,
    reviews: 64,
    location: "New York, NY",
    founded: "2019",
    employees: "50-200",
    funding: "$7.5M Series A",
    incubator: "500 Startups",
    categories: ["Finance", "SMB", "SaaS"],
    description: "Comprehensive financial management platform designed specifically for small businesses, offering invoicing, accounting, and cash flow forecasting."
  },
  {
    id: "devflow",
    name: "DevFlow",
    tagline: "Streamlining development workflows for modern teams",
    logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=300&h=300&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=400&fit=crop&q=80",
    rating: 4.6,
    reviews: 110,
    location: "Seattle, WA",
    founded: "2020",
    employees: "10-50",
    funding: "$3.2M Seed",
    incubator: "Techstars",
    categories: ["Developer Tools", "Collaboration", "SaaS"],
    description: "Integrated development platform that enhances team collaboration, code quality, and deployment efficiency for software engineering teams."
  },
  {
    id: "market-pulse",
    name: "MarketPulse",
    tagline: "Real-time market intelligence for digital products",
    logo: "https://images.unsplash.com/photo-1669570094762-828f3dfaf675?w=300&h=300&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=400&fit=crop&q=80",
    rating: 4.4,
    reviews: 58,
    location: "Chicago, IL",
    founded: "2021",
    employees: "5-20",
    funding: "$1.5M Pre-seed",
    incubator: "500 Startups",
    categories: ["Market Intelligence", "Analytics", "SaaS"],
    description: "Cutting-edge market intelligence platform providing real-time data and insights on consumer trends, competitor movements, and market opportunities."
  },
];

// Category filters
const categories = [
  "All Categories",
  "Analytics",
  "AI",
  "SaaS",
  "Cloud",
  "DevOps",
  "Healthcare",
  "Finance",
  "Developer Tools",
  "Market Intelligence"
];

// Incubator filters
const incubators = [
  "All Incubators",
  "Y Combinator",
  "Techstars",
  "500 Startups",
  "Plug and Play",
  "AngelPad"
];

export function StartupStorefrontListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [incubatorFilter, setIncubatorFilter] = useState("All Incubators");
  const [sortBy, setSortBy] = useState("rating");

  // Filter and sort startups
  const filteredStartups = startups.filter(startup => {
    // Apply search filter
    const searchMatch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        startup.tagline.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply category filter
    const categoryMatch = categoryFilter === "All Categories" || 
                         startup.categories.some(cat => cat === categoryFilter);
    
    // Apply incubator filter
    const incubatorMatch = incubatorFilter === "All Incubators" || 
                           startup.incubator === incubatorFilter;
    
    return searchMatch && categoryMatch && incubatorMatch;
  }).sort((a, b) => {
    // Apply sorting
    if (sortBy === "rating") {
      return b.rating - a.rating;
    } else if (sortBy === "newest") {
      return new Date(b.founded).getFullYear() - new Date(a.founded).getFullYear();
    } else if (sortBy === "reviews") {
      return b.reviews - a.reviews;
    }
    return 0;
  });

  const handleStartupClick = (startupId: string) => {
    // In a real application, this would navigate to the startup detail page
    if (typeof window !== 'undefined') {
      window.navigateTo?.("startup-storefront", { startupId });
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold">Discover Startups</h1>
            <p className="text-foreground/70 mt-2">
              Explore innovative startups across various industries and connect with them directly
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search startups by name or description..."
                className="pl-10 py-6"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={incubatorFilter} onValueChange={setIncubatorFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Incubator" />
                </SelectTrigger>
                <SelectContent>
                  {incubators.map((incubator) => (
                    <SelectItem key={incubator} value={incubator}>
                      {incubator}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between">
            <p className="text-foreground/70">
              {filteredStartups.length} startups found
              {categoryFilter !== "All Categories" && ` in ${categoryFilter}`}
              {incubatorFilter !== "All Incubators" && ` from ${incubatorFilter}`}
            </p>
            <Button variant="ghost" className="text-primary" onClick={() => {
              setSearchTerm("");
              setCategoryFilter("All Categories");
              setIncubatorFilter("All Incubators");
              setSortBy("rating");
            }}>
              Clear Filters
            </Button>
          </div>

          {/* Startups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStartups.map((startup) => (
              <Card 
                key={startup.id} 
                className="overflow-hidden transition-all hover:shadow-md cursor-pointer"
                onClick={() => handleStartupClick(startup.id)}
              >
                <div className="h-32 w-full overflow-hidden relative">
                  <ImageWithFallback
                    src={startup.banner}
                    alt={`${startup.name} Banner`}
                    width={600}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-background bg-white shadow-lg">
                      <ImageWithFallback
                        src={startup.logo}
                        alt={startup.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {startup.incubator && (
                      <Badge className="bg-tertiary text-white hover:bg-tertiary/90">
                        {startup.incubator}
                      </Badge>
                    )}
                  </div>
                </div>

                <CardContent className="p-4 pt-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{startup.name}</h3>
                      <p className="text-sm text-foreground/70 line-clamp-2 mt-1">
                        {startup.tagline}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{startup.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {startup.categories.map((category, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-foreground/70">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{startup.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Founded {startup.founded}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{startup.employees}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      <span>{startup.funding}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <div className="flex items-center text-xs">
                      <Building className="w-3 h-3 mr-1" />
                      <span className="text-foreground/70">{startup.reviews} reviews</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-primary hover:text-primary gap-1 text-xs h-8 p-2"
                    >
                      View Startup 
                      <ArrowUpRight className="w-3 h-3 mt-px" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}