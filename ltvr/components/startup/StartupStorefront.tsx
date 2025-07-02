import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar } from "../ui/avatar";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  MessageCircle, 
  Star, 
  Share2, 
  Heart, 
  ShoppingCart, 
  MapPin, 
  Calendar, 
  Users, 
  Award,
  Link as LinkIcon,
  Globe,
  ArrowUpRight,
  ChevronLeft
} from "lucide-react@0.487.0";
import { StartupStorefrontListing } from "./StartupStorefrontListing";

// Sample data for startups
const startups = [
  {
    id: "quantum-analytics",
    name: "Quantum Analytics",
    tagline: "AI-powered analytics platform for startups and small businesses",
    description: "Quantum Analytics helps startups and small businesses make data-driven decisions with our AI-powered analytics platform. We provide real-time insights, predictive analytics, and customizable dashboards to help you grow your business.",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&h=300&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1200&h=400&fit=crop&q=80",
    rating: 4.9,
    reviews: 128,
    location: "San Francisco, CA",
    founded: "2021",
    employees: "10-50",
    funding: "$2.5M Seed",
    website: "https://quantumanalytics.example",
    incubator: "TechStars",
    socials: [
      { name: "Twitter", url: "#" },
      { name: "LinkedIn", url: "#" },
      { name: "GitHub", url: "#" }
    ],
    categories: ["Analytics", "AI", "SaaS"],
    products: [
      {
        id: 1,
        name: "Analytics Dashboard",
        description: "Comprehensive analytics dashboard with real-time data visualization.",
        price: 49,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop&q=80",
        category: "SaaS",
        badge: "Popular",
        rating: 4.8,
        reviews: 86
      },
      {
        id: 2,
        name: "Predictive Analytics",
        description: "AI-powered predictive analytics to forecast trends and make data-driven decisions.",
        price: 99,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop&q=80",
        category: "AI",
        badge: "New",
        rating: 4.7,
        reviews: 42
      },
      {
        id: 3,
        name: "Custom Reports",
        description: "Generate custom reports and export data in multiple formats.",
        price: 29,
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&h=200&fit=crop&q=80",
        category: "Reports",
        badge: null,
        rating: 4.6,
        reviews: 38
      },
      {
        id: 4,
        name: "API Integration",
        description: "Integrate our analytics platform with your existing tools and services.",
        price: 79,
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=200&fit=crop&q=80",
        category: "Development",
        badge: "Featured",
        rating: 4.9,
        reviews: 24
      }
    ],
    team: [
      {
        name: "Sarah Johnson",
        role: "CEO & Co-founder",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&q=80",
        bio: "Former data scientist at Google with 10+ years of experience in analytics and machine learning."
      },
      {
        name: "Michael Chen",
        role: "CTO & Co-founder",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&q=80",
        bio: "Full-stack developer with expertise in AI and data visualization. Previously led engineering at a Y Combinator startup."
      },
      {
        name: "Elena Rodriguez",
        role: "Head of Product",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&q=80",
        bio: "Product leader with a passion for user-centered design. Previously at Airbnb and Dropbox."
      },
      {
        name: "David Kim",
        role: "Lead Data Scientist",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&q=80",
        bio: "PhD in Computer Science with specialization in machine learning and predictive analytics."
      }
    ]
  },
  {
    id: "echostream",
    name: "EchoStream",
    tagline: "Cloud-native streaming platform for modern applications",
    description: "EchoStream is a cloud-native streaming platform that enables real-time data processing and analysis at scale. Our platform is designed to handle massive volumes of data with low latency and high reliability.",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&h=300&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=400&fit=crop&q=80",
    rating: 4.7,
    reviews: 92,
    location: "Austin, TX",
    founded: "2020",
    employees: "20-100",
    funding: "$4.2M Series A",
    website: "https://echostream.example",
    incubator: "Y Combinator",
    socials: [
      { name: "Twitter", url: "#" },
      { name: "LinkedIn", url: "#" },
      { name: "GitHub", url: "#" }
    ],
    categories: ["Cloud", "DevOps", "Infrastructure"],
    products: [
      {
        id: 1,
        name: "Stream Processing Engine",
        description: "High-performance stream processing engine for real-time data analysis.",
        price: 149,
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop&q=80",
        category: "Cloud",
        badge: "Flagship",
        rating: 4.9,
        reviews: 58
      },
      {
        id: 2,
        name: "Event Router",
        description: "Reliable event routing system with end-to-end encryption and guaranteed delivery.",
        price: 79,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop&q=80",
        category: "DevOps",
        badge: "Popular",
        rating: 4.7,
        reviews: 36
      },
      {
        id: 3,
        name: "Cloud Connector",
        description: "Connect to popular cloud services like AWS, Azure, and GCP with our integration toolkit.",
        price: 59,
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300&h=200&fit=crop&q=80",
        category: "Integration",
        badge: null,
        rating: 4.5,
        reviews: 24
      }
    ],
    team: [
      {
        name: "Alex Rivera",
        role: "CEO & Co-founder",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&q=80",
        bio: "Cloud infrastructure expert who previously led engineering teams at AWS and Confluent."
      },
      {
        name: "Zoe Chen",
        role: "CTO & Co-founder",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&q=80",
        bio: "Distributed systems specialist with expertise in stream processing and real-time analytics."
      },
      {
        name: "Marcus Johnson",
        role: "VP of Engineering",
        image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=300&h=300&fit=crop&q=80",
        bio: "Former lead architect at Confluent with over 15 years of experience in data systems."
      }
    ]
  }
];

interface StartupStorefrontProps {
  // Optional startupId allows for either showing the listing or an individual startup
  startupId?: string;
}

export function StartupStorefront({ startupId }: StartupStorefrontProps) {
  const [currentStartupId, setCurrentStartupId] = useState(startupId);
  
  // When props change, update the current startup ID
  useEffect(() => {
    setCurrentStartupId(startupId);
  }, [startupId]);

  // If no startup ID is provided or it doesn't match any startup, show the listing
  if (!currentStartupId) {
    return <StartupStorefrontListing />;
  }

  // Find the selected startup
  const startup = startups.find(s => s.id === currentStartupId);
  
  // If the startup wasn't found, show the listing
  if (!startup) {
    return <StartupStorefrontListing />;
  }

  // Handle back button click to go back to listing
  const handleBackClick = () => {
    if (typeof window !== 'undefined') {
      window.navigateTo?.("startup-storefront");
    }
  };

  return (
    <div className="bg-background">
      <Button
        variant="ghost"
        className="m-4 flex items-center gap-1"
        onClick={handleBackClick}
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Startups
      </Button>

      {/* Banner and Profile Section */}
      <div className="relative">
        <div className="h-64 w-full overflow-hidden">
          <ImageWithFallback
            src={startup.banner}
            alt={`${startup.name} Banner`}
            width={1200}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row -mt-16 relative z-10">
            <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-background shadow-md bg-white">
              <ImageWithFallback
                src={startup.logo}
                alt={startup.name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mt-4 md:mt-12 md:ml-6 flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">{startup.name}</h1>
                    <Badge className="bg-tertiary text-white hover:bg-tertiary/90">
                      {startup.incubator}
                    </Badge>
                  </div>
                  <p className="text-foreground/70 mt-1">{startup.tagline}</p>
                </div>
                
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button variant="outline" className="gap-1">
                    <Heart size={16} />
                    Save
                  </Button>
                  <Button variant="outline" className="gap-1">
                    <Share2 size={16} />
                    Share
                  </Button>
                  <Button className="gap-1 bg-primary hover:bg-primary-hover">
                    <MessageCircle size={16} />
                    Chat
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {startup.categories.map((category, index) => (
                  <Badge key={index} variant="outline">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-6 mt-6 md:ml-40 text-sm text-foreground/70">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{startup.rating}</span>
              <span>({startup.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>{startup.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>Founded {startup.founded}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{startup.employees} employees</span>
            </div>
            <div className="flex items-center gap-1">
              <Award size={16} />
              <span>{startup.funding}</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe size={16} />
              <a href={startup.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Website
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs Section */}
      <div className="container mx-auto px-4 mt-8">
        <Tabs defaultValue="products">
          <TabsList className="mb-8">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {startup.products.map((product) => (
                <Card key={product.id} className="overflow-hidden transition-all hover:shadow-md">
                  <div className="relative">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="w-full h-40 object-cover"
                    />
                    {product.badge && (
                      <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground hover:bg-primary-hover">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{product.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground/70 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center text-sm mb-4">
                      <Star size={14} className="fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium mr-1">{product.rating}</span>
                      <span className="text-foreground/70">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">${product.price}/mo</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Heart size={16} />
                        </Button>
                        <Button className="h-8 gap-1 bg-primary hover:bg-primary-hover text-primary-foreground">
                          <ShoppingCart size={14} />
                          Add
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="about">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">About {startup.name}</h2>
                <p className="text-foreground/80 mb-6">{startup.description}</p>
                <p className="text-foreground/80 mb-6">
                  Our mission is to democratize access to advanced analytics and make data-driven decision making accessible to businesses of all sizes. With our intuitive platform, even non-technical users can gain valuable insights from their data.
                </p>
                <p className="text-foreground/80 mb-6">
                  We're backed by {startup.incubator} and have raised {startup.funding} to date. Our team of data scientists and engineers are passionate about building tools that help businesses succeed.
                </p>
                
                <h3 className="text-lg font-semibold mt-8 mb-4">Connect with us</h3>
                <div className="flex gap-3">
                  {startup.socials.map((social, index) => (
                    <a 
                      key={index} 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-muted rounded-lg flex items-center gap-2 hover:bg-muted/80 transition-colors"
                    >
                      <LinkIcon size={16} />
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="bg-muted rounded-xl p-6">
                  <h3 className="font-semibold mb-4">Company Information</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-foreground/70">Founded</p>
                      <p>{startup.founded}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/70">Location</p>
                      <p>{startup.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/70">Team Size</p>
                      <p>{startup.employees}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/70">Funding</p>
                      <p>{startup.funding}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/70">Incubator</p>
                      <p>{startup.incubator}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-border">
                    <a 
                      href={startup.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-primary hover:underline"
                    >
                      <span>Visit Website</span>
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Customer Reviews</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} size={18} className={`${i < Math.floor(startup.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
                      ))}
                    </div>
                    <span className="font-medium">{startup.rating}</span>
                    <span className="text-foreground/70">({startup.reviews} reviews)</span>
                  </div>
                </div>
                <Button>Write a Review</Button>
              </div>
              
              <div className="space-y-6">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b border-border pb-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <ImageWithFallback 
                          src={`https://images.unsplash.com/photo-${1570295999919 + review * 10000}-b8bacba8a4a2?w=32&h=32&fit=crop&q=80`}
                          alt="User"
                          width={40}
                          height={40}
                        />
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">John Doe</h4>
                          <span className="text-sm text-foreground/70">2 weeks ago</span>
                        </div>
                        <div className="flex my-1">
                          {Array(5).fill(0).map((_, i) => (
                            <Star key={i} size={14} className={`${i < 5 - review % 2 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
                          ))}
                        </div>
                        <p className="text-foreground/80 mt-2">
                          The analytics dashboard has been a game-changer for our business. It's intuitive, powerful, and provides insights that we couldn't get from other tools. The customer support is also excellent.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-8">
                <Button variant="outline">Load More Reviews</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="team">
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-6">Meet Our Team</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {startup.team.map((member, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="h-52 overflow-hidden">
                      <ImageWithFallback
                        src={member.image}
                        alt={member.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-primary mb-2">{member.role}</p>
                      <p className="text-sm text-foreground/70">{member.bio}</p>
                      <div className="flex gap-2 mt-4">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}