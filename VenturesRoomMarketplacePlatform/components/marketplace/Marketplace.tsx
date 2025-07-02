
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar } from "../ui/avatar";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Search, 
  Filter, 
  Star, 
  ShoppingCart, 
  Heart, 
  ArrowUpRight,
  ListFilter,
  Grid,
  Columns,
  SortAsc,
  SortDesc
} from "lucide-react@0.487.0";

// Sample product categories
const categories = [
  { id: "all", name: "All Categories", icon: "grid", count: 186 },
  { id: "saas", name: "SaaS Tools", icon: "code", count: 52 },
  { id: "services", name: "Services", icon: "briefcase", count: 43 },
  { id: "hardware", name: "Tech Gadgets", icon: "cpu", count: 28 },
  { id: "marketing", name: "Marketing", icon: "trending-up", count: 37 },
  { id: "design", name: "Design", icon: "layers", count: 21 },
  { id: "development", name: "Development", icon: "terminal", count: 15 }
];

// Sample products
const products = [
  {
    id: 1,
    name: "Analytics Dashboard Pro",
    description: "Comprehensive analytics dashboard with real-time data visualization.",
    price: 49,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop&q=80",
    category: "SaaS",
    startupName: "Quantum Analytics",
    startupLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&h=300&fit=crop&q=80",
    badge: "Popular",
    rating: 4.8,
    reviews: 86,
    incubator: "TechStars"
  },
  {
    id: 2,
    name: "Code Analyzer AI",
    description: "AI-powered code analysis and optimization tool for developers.",
    price: 79,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop&q=80",
    category: "Development",
    startupName: "DevFlow",
    startupLogo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=300&h=300&fit=crop&q=80",
    badge: "New",
    rating: 4.7,
    reviews: 42,
    incubator: "Y Combinator"
  },
  {
    id: 3,
    name: "Eco-Friendly Packaging",
    description: "Sustainable packaging solutions for eco-conscious businesses.",
    price: 120,
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=300&h=200&fit=crop&q=80",
    category: "Services",
    startupName: "EcoPackage",
    startupLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&h=300&fit=crop&q=80",
    badge: null,
    rating: 4.6,
    reviews: 38,
    incubator: "500 Startups"
  },
  {
    id: 4,
    name: "Market Research Suite",
    description: "Comprehensive market research and competitor analysis tool.",
    price: 89,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop&q=80",
    category: "Marketing",
    startupName: "MarketPulse",
    startupLogo: "https://images.unsplash.com/photo-1669570094762-828f3dfaf675?w=300&h=300&fit=crop&q=80",
    badge: "Featured",
    rating: 4.9,
    reviews: 24,
    incubator: "TechStars"
  },
  {
    id: 5,
    name: "Smart IoT Hub",
    description: "Connect and control all your IoT devices from a single hub.",
    price: 149,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=200&fit=crop&q=80",
    category: "Hardware",
    startupName: "ConnectX",
    startupLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&h=300&fit=crop&q=80",
    badge: "Incubator Pick",
    rating: 4.5,
    reviews: 19,
    incubator: "Founders Factory"
  },
  {
    id: 6,
    name: "UI Design System",
    description: "Complete design system with components and templates.",
    price: 59,
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=300&h=200&fit=crop&q=80",
    category: "Design",
    startupName: "DesignHub",
    startupLogo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=300&h=300&fit=crop&q=80",
    badge: null,
    rating: 4.7,
    reviews: 53,
    incubator: "Y Combinator"
  }
];

// Sort options
const sortOptions = [
  { id: "popular", name: "Most Popular" },
  { id: "newest", name: "Newest First" },
  { id: "price-asc", name: "Price: Low to High" },
  { id: "price-desc", name: "Price: High to Low" },
  { id: "rating", name: "Highest Rated" }
];

// View types
type ViewType = "grid" | "list";

export function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState(sortOptions[0].id);
  const [viewType, setViewType] = useState<ViewType>("grid");
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Filter products based on category, search query, and price range
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.startupName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesCategory && matchesSearch && matchesPrice;
  });
  
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Marketplace</h1>
            <p className="text-foreground/70">
              Discover innovative products and services from startups
            </p>
          </div>
          
          {/* Search and View Options */}
          <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 md:w-64">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" />
              <input 
                type="text" 
                placeholder="Search products, startups..." 
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant={filterOpen ? "default" : "outline"} 
                className={`gap-1 ${filterOpen ? "bg-primary hover:bg-primary/90" : ""}`}
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter size={16} />
                Filter
              </Button>
              
              <div className="border border-border rounded-lg flex">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`rounded-r-none ${viewType === 'grid' ? 'bg-muted' : ''}`}
                  onClick={() => setViewType("grid")}
                >
                  <Grid size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`rounded-l-none ${viewType === 'list' ? 'bg-muted' : ''}`}
                  onClick={() => setViewType("list")}
                >
                  <Columns size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filter Panel */}
        {filterOpen && (
          <div className="bg-muted rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <ListFilter size={16} />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-foreground/5"
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <span>{category.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <SortAsc size={16} />
                  Price Range
                </h3>
                <div className="px-2 py-4">
                  <div className="relative h-1 bg-foreground/20 rounded-full mb-6">
                    <div 
                      className="absolute h-1 bg-primary rounded-full" 
                      style={{ 
                        left: `${(priceRange[0] / 150) * 100}%`, 
                        right: `${100 - (priceRange[1] / 150) * 100}%` 
                      }}
                    ></div>
                    <button 
                      className="absolute w-4 h-4 bg-white border border-primary rounded-full -translate-y-1/2 -translate-x-1/2 hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      style={{ left: `${(priceRange[0] / 150) * 100}%`, top: '50%' }}
                      aria-label="Minimum price"
                    ></button>
                    <button 
                      className="absolute w-4 h-4 bg-white border border-primary rounded-full -translate-y-1/2 -translate-x-1/2 hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      style={{ left: `${(priceRange[1] / 150) * 100}%`, top: '50%' }}
                      aria-label="Maximum price"
                    ></button>
                  </div>
                  
                  <div className="flex justify-between">
                    <div>
                      <span className="text-sm text-foreground/70">Min:</span>
                      <span className="font-medium ml-1">${priceRange[0]}</span>
                    </div>
                    <div>
                      <span className="text-sm text-foreground/70">Max:</span>
                      <span className="font-medium ml-1">${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setPriceRange([0, 150])}
                  >
                    Reset
                  </Button>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => {}}
                  >
                    Apply
                  </Button>
                </div>
              </div>
              
              {/* Sort Options */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <SortDesc size={16} />
                  Sort By
                </h3>
                <div className="space-y-2">
                  {sortOptions.map(option => (
                    <button
                      key={option.id}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-left transition-colors ${
                        sortOption === option.id
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-foreground/5"
                      }`}
                      onClick={() => setSortOption(option.id)}
                    >
                      <span>{option.name}</span>
                      {sortOption === option.id && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Category Tabs */}
        <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap mb-2">
            {categories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex-shrink-0"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {/* Results Count and Sort */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-foreground/70">
              Showing <span className="font-medium">{filteredProducts.length}</span> results
            </p>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground/70">Sort:</span>
              <select 
                className="text-sm border-none bg-transparent focus:outline-none focus:ring-0 pl-1"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Products Grid/List View */}
          <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
            {filteredProducts.map(product => (
              <Card key={product.id} className={`overflow-hidden transition-all hover:shadow-md`}>
                {viewType === 'grid' ? (
                  <>
                    <div className="relative">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      {product.badge && (
                        <Badge 
                          className={`absolute top-2 right-2 ${
                            product.badge === 'Popular'
                              ? 'bg-tertiary text-white'
                              : product.badge === 'New'
                                ? 'bg-primary text-white'
                                : product.badge === 'Incubator Pick'
                                  ? 'bg-secondary text-white'
                                  : 'bg-amber-500 text-white'
                          }`}
                        >
                          {product.badge}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold truncate">{product.name}</h3>
                          <div className="flex items-center gap-1 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {product.category}
                            </Badge>
                            <div className="flex items-center text-sm">
                              <Star size={12} className="fill-yellow-400 text-yellow-400 mr-1" />
                              <span>{product.rating}</span>
                            </div>
                          </div>
                        </div>
                        <span className="font-bold">${product.price}</span>
                      </div>
                      <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <ImageWithFallback
                              src={product.startupLogo}
                              alt={product.startupName}
                              width={24}
                              height={24}
                            />
                          </Avatar>
                          <span className="text-sm">{product.startupName}</span>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Heart size={16} />
                          </Button>
                          <Button className="h-8 w-8 p-0 bg-primary hover:bg-primary/90">
                            <ShoppingCart size={14} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-1/3">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={200}
                        className="w-full h-48 md:h-full object-cover"
                      />
                      {product.badge && (
                        <Badge 
                          className={`absolute top-2 right-2 ${
                            product.badge === 'Popular'
                              ? 'bg-tertiary text-white'
                              : product.badge === 'New'
                                ? 'bg-primary text-white'
                                : product.badge === 'Incubator Pick'
                                  ? 'bg-secondary text-white'
                                  : 'bg-amber-500 text-white'
                          }`}
                        >
                          {product.badge}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4 md:p-6 flex-1">
                      <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{product.name}</h3>
                            <Badge variant="outline">
                              {product.category}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center">
                              <Star size={14} className="fill-yellow-400 text-yellow-400 mr-1" />
                              <span>{product.rating}</span>
                              <span className="text-sm text-foreground/70 ml-1">({product.reviews})</span>
                            </div>
                            <span className="text-sm text-secondary">
                              {product.incubator}
                            </span>
                          </div>
                        </div>
                        <span className="font-bold text-lg mt-2 md:mt-0">${product.price}</span>
                      </div>
                      <p className="text-foreground/70 my-4">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <ImageWithFallback
                              src={product.startupLogo}
                              alt={product.startupName}
                              width={32}
                              height={32}
                            />
                          </Avatar>
                          <span>{product.startupName}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="gap-1">
                            <Heart size={16} />
                            Save
                          </Button>
                          <Button className="gap-1 bg-primary hover:bg-primary/90">
                            <ShoppingCart size={16} />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                )}
              </Card>
            ))}
          </div>
          
          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Search size={48} className="mx-auto mb-4 text-foreground/30" />
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-foreground/70 mb-6">
                We couldn't find any products matching your criteria.
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                  setPriceRange([0, 150]);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
          
          {/* Load More */}
          {filteredProducts.length > 0 && (
            <div className="flex justify-center mt-12">
              <Button variant="outline">Load More</Button>
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
}
