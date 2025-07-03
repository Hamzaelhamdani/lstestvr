import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheckIcon, 
  UsersIcon, 
  BuildingIcon, 
  RocketIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  SearchIcon, 
  FilterIcon, 
  SettingsIcon, 
  RefreshCwIcon,
  DollarSignIcon,
  AlertTriangleIcon,
  ArrowUpRightIcon,
  BarChart3Icon,
  PieChartIcon,
  LayersIcon,
  BellIcon,
  UserIcon,
  ArrowRightIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  CheckIcon,
  XIcon,
  PercentIcon,
  ClipboardIcon,
  CalendarIcon,
  GlobeIcon,
  ServerIcon,
  DatabaseIcon,
  ShieldIcon,
  MailIcon,
  PhoneIcon,
  TagIcon,
  BookmarkIcon,
  ClockIcon,
  StarIcon,
  FlagIcon,
  MessageSquareIcon,
  EyeIcon,
  BellRingIcon,
  KeyIcon,
  LogOutIcon,
  PlusIcon,
  FileTextIcon,
  TrashIcon,
  HeartIcon,
  ShoppingCartIcon,
  InfoIcon,
  BanknoteIcon
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { SupportStructureApproval } from "./SupportStructureApproval";
import { StartupApproval } from "./StartupApproval";
import { PlatformAnalytics } from "./PlatformAnalytics";
import { CommissionManagement } from "./CommissionManagement";
import { SettingsDialog } from "./SettingsDialog";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import { Route } from "../layout/NavigationBar";

// Sample data for the admin dashboard
const platformStats = {
  totalUsers: 5427,
  totalStartups: 348,
  totalSupportStructures: 42,
  totalRevenue: 1287450,
  pendingApprovals: 17,
  activeUsers: 3254,
  conversionRate: 8.7,
  growthRate: 12.4,
  transactionsToday: 127,
  avgDailyRevenue: 18920,
  pendingPayouts: 52300,
  revenueGrowth: 15.2,
  supportStructureCommissions: 192350,
};

const recentActivity = [
  {
    id: "act1",
    type: "signup",
    user: "TechFlow AI",
    role: "startup",
    timestamp: "2025-05-30T08:14:32Z",
    status: "pending",
    details: "New startup registration waiting for approval"
  },
  {
    id: "act2",
    type: "approval",
    user: "FinTech Ventures",
    role: "support",
    timestamp: "2025-05-30T07:45:18Z",
    status: "approved",
    details: "Support structure approved by admin"
  },
  {
    id: "act3",
    type: "transaction",
    user: "DataSphere",
    role: "startup",
    timestamp: "2025-05-30T07:12:05Z",
    status: "completed",
    amount: 1250,
    details: "Product purchase: AI Data Analysis Tool"
  },
  {
    id: "act4",
    type: "commission",
    user: "InvestorGroup",
    role: "support",
    timestamp: "2025-05-30T06:58:23Z",
    status: "paid",
    amount: 175,
    details: "Commission payment for startup sales"
  },
  {
    id: "act5",
    type: "report",
    user: "CloudSecure",
    role: "startup",
    timestamp: "2025-05-30T06:32:11Z",
    status: "resolved",
    details: "Payment dispute resolved in favor of startup"
  },
  {
    id: "act6",
    type: "signup",
    user: "Enterprise Solutions",
    role: "client",
    timestamp: "2025-05-30T05:48:49Z",
    status: "approved",
    details: "New client account approved automatically"
  }
];

const pendingStartups = [
  {
    id: "startup1",
    name: "TechFlow AI",
    type: "SaaS",
    logo: "",
    submitted: "2025-05-30T08:14:32Z",
    products: 5,
    revenue: 0,
    status: "pending"
  },
  {
    id: "startup2",
    name: "MediConnect",
    type: "Healthcare",
    logo: "",
    submitted: "2025-05-29T14:22:47Z",
    products: 3,
    revenue: 0,
    status: "pending"
  },
  {
    id: "startup3",
    name: "BlockVista",
    type: "Fintech",
    logo: "",
    submitted: "2025-05-29T10:08:19Z",
    products: 2,
    revenue: 0,
    status: "pending"
  }
];

const pendingSupportStructures = [
  {
    id: "support1",
    name: "FinTech Accelerator",
    type: "Accelerator",
    logo: "",
    submitted: "2025-05-29T16:33:42Z",
    startups: 8,
    commissionRate: 12,
    status: "pending"
  },
  {
    id: "support2",
    name: "Green Ventures",
    type: "Incubator",
    logo: "",
    submitted: "2025-05-28T11:45:08Z",
    startups: 5,
    commissionRate: 10,
    status: "pending"
  }
];

// Tabs for admin panel sections
const adminTabs = [
  { id: "dashboard", label: "Dashboard", icon: LayersIcon },
  { id: "startups", label: "Startups", icon: RocketIcon },
  { id: "support", label: "Support Structures", icon: BuildingIcon },
  { id: "users", label: "Users", icon: UsersIcon },
  { id: "analytics", label: "Analytics", icon: BarChart3Icon },
  { id: "commissions", label: "Commissions", icon: DollarSignIcon },
  { id: "settings", label: "Settings", icon: SettingsIcon }
];

interface AdminPortalProps {
  user?: any;
  navigate?: (route: Route) => void;
}

export function AdminPortal({ user, navigate }: AdminPortalProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showRefresh, setShowRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [timeRange, setTimeRange] = useState("7d");
  
  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  // Format currency helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  // Function to handle approvals
  const handleApprove = (id: string, type: 'startup' | 'support') => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`${type === 'startup' ? 'Startup' : 'Support Structure'} approved successfully`, {
        description: `ID: ${id}`,
        action: {
          label: "View",
          onClick: () => console.log(`View ${id}`),
        },
      });
      setLoading(false);
    }, 1000);
  };
  
  // Function to handle rejections
  const handleReject = (id: string, type: 'startup' | 'support') => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.error(`${type === 'startup' ? 'Startup' : 'Support Structure'} rejected`, {
        description: `ID: ${id}`,
        action: {
          label: "Undo",
          onClick: () => console.log(`Undo rejection for ${id}`),
        },
      });
      setLoading(false);
    }, 1000);
  };
  
  // Function to refresh data
  const refreshData = () => {
    setShowRefresh(true);
    setLoading(true);
    
    // Simulate API refresh
    setTimeout(() => {
      toast.success("Data refreshed successfully", {
        description: `Last updated: ${new Date().toLocaleTimeString()}`,
      });
      setLoading(false);
      setShowRefresh(false);
    }, 1500);
  };
  
  // Badge colors by status
  const getBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
      case 'completed':
      case 'paid':
        return "bg-chart-1/20 text-chart-1 border-chart-1/30";
      case 'pending':
        return "bg-chart-5/20 text-chart-5 border-chart-5/30";
      case 'rejected':
        return "bg-destructive/20 text-destructive border-destructive/30";
      case 'resolved':
        return "bg-chart-3/20 text-chart-3 border-chart-3/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // Badge icons by type
  const getBadgeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'signup':
        return <UserIcon className="h-3 w-3" />;
      case 'approval':
        return <CheckCircleIcon className="h-3 w-3" />;
      case 'transaction':
        return <DollarSignIcon className="h-3 w-3" />;
      case 'commission':
        return <PercentIcon className="h-3 w-3" />;
      case 'report':
        return <FlagIcon className="h-3 w-3" />;
      default:
        return <InfoIcon className="h-3 w-3" />;
    }
  };
  
  // Performance indicators
  const performanceMetrics = [
    {
      label: "User Growth",
      value: "+12.4%",
      trend: "up",
      comparedTo: "last month",
      icon: UsersIcon,
      color: "text-chart-1"
    },
    {
      label: "Revenue",
      value: "+8.7%",
      trend: "up",
      comparedTo: "last month",
      icon: DollarSignIcon,
      color: "text-chart-4"
    },
    {
      label: "Conversion Rate",
      value: "8.7%",
      trend: "up",
      comparedTo: "last month",
      icon: PercentIcon,
      color: "text-chart-3"
    },
    {
      label: "Avg. Commission",
      value: "12.5%",
      trend: "stable",
      comparedTo: "last month",
      icon: TrendingUpIcon,
      color: "text-chart-5"
    }
  ];

  return (
    <div className="container max-w-7xl px-4 md:px-6 py-8">
      <div className="flex flex-col gap-8">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-destructive/20 flex items-center justify-center">
              <ShieldCheckIcon className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <h1>Admin Portal</h1>
              <p className="text-muted-foreground">
                Manage platform, users, and approvals
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search admin portal..."
                className="pl-10 w-full md:w-[280px]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={refreshData}
              disabled={loading}
            >
              <RefreshCwIcon className={`h-4 w-4 ${showRefresh ? 'animate-spin' : ''}`} />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <BellIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[280px]">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-y-auto">
                  {recentActivity.slice(0, 5).map((activity, i) => (
                    <DropdownMenuItem key={i} className="cursor-pointer flex flex-col items-start py-2">
                      <div className="flex w-full justify-between items-start mb-1">
                        <span className="font-medium">{activity.user}</span>
                        <Badge 
                          variant="outline"
                          className={`text-xs ${getBadgeVariant(activity.status)}`}
                        >
                          {activity.status}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.details}</span>
                      <span className="text-xs text-muted-foreground mt-1">{formatDate(activity.timestamp)}</span>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer justify-center">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-[10px] bg-destructive text-destructive-foreground">
                      {user?.name?.split(" ").map((n: string) => n[0]).join("") || "AD"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">{user?.name || "Admin"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <UserIcon className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => setShowSettingsDialog(true)}>
                  <SettingsIcon className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <KeyIcon className="h-4 w-4 mr-2" />
                  API Keys
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOutIcon className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Admin Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="overflow-x-auto pb-2">
            <TabsList className="flex w-full md:w-auto h-12 p-1">
              {adminTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="flex items-center gap-2 px-4 py-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
          
          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Users</p>
                      <h3 className="text-2xl font-bold mt-1">{platformStats.totalUsers.toLocaleString()}</h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-chart-3/20 flex items-center justify-center">
                      <UsersIcon className="h-6 w-6 text-chart-3" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-xs">
                    <Badge variant="outline" className="bg-chart-1/20 text-chart-1 border-chart-1/30 flex items-center gap-1">
                      <TrendingUpIcon className="h-3 w-3" />
                      +{platformStats.growthRate}% from last month
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <h3 className="text-2xl font-bold mt-1">{formatCurrency(platformStats.totalRevenue)}</h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-chart-4/20 flex items-center justify-center">
                      <DollarSignIcon className="h-6 w-6 text-chart-4" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-xs">
                    <Badge variant="outline" className="bg-chart-1/20 text-chart-1 border-chart-1/30 flex items-center gap-1">
                      <TrendingUpIcon className="h-3 w-3" />
                      +{platformStats.revenueGrowth}% from last month
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Startups</p>
                      <h3 className="text-2xl font-bold mt-1">{platformStats.totalStartups.toLocaleString()}</h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-chart-1/20 flex items-center justify-center">
                      <RocketIcon className="h-6 w-6 text-chart-1" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-xs">
                    <Badge variant="outline" className="bg-chart-5/20 text-chart-5 border-chart-5/30 flex items-center gap-1">
                      <ClockIcon className="h-3 w-3" />
                      {platformStats.pendingApprovals} pending approvals
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Support Structures</p>
                      <h3 className="text-2xl font-bold mt-1">{platformStats.totalSupportStructures.toLocaleString()}</h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-chart-5/20 flex items-center justify-center">
                      <BuildingIcon className="h-6 w-6 text-chart-5" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-xs">
                    <Badge variant="outline" className="bg-chart-4/20 text-chart-4 border-chart-4/30 flex items-center gap-1">
                      <DollarSignIcon className="h-3 w-3" />
                      {formatCurrency(platformStats.supportStructureCommissions)} in commissions
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Performance metrics */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Platform Performance</CardTitle>
                    <CardDescription>
                      Key metrics and growth indicators
                    </CardDescription>
                  </div>
                  <Select 
                    defaultValue={timeRange} 
                    onValueChange={setTimeRange}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last quarter</SelectItem>
                      <SelectItem value="ytd">Year to date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {performanceMetrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                      <Card key={index} className="border-border/40">
                        <CardContent className="p-4 flex justify-between items-center">
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">{metric.label}</p>
                            <p className={`text-xl font-bold ${metric.color}`}>{metric.value}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              {metric.trend === "up" ? (
                                <TrendingUpIcon className="h-3 w-3 text-chart-1" />
                              ) : metric.trend === "down" ? (
                                <TrendingDownIcon className="h-3 w-3 text-destructive" />
                              ) : (
                                <ArrowRightIcon className="h-3 w-3 text-muted-foreground" />
                              )}
                              <span>vs {metric.comparedTo}</span>
                            </div>
                          </div>
                          <div className={`h-12 w-12 rounded-full ${metric.color.replace('text-', 'bg-')}/20 flex items-center justify-center`}>
                            <Icon className={`h-6 w-6 ${metric.color}`} />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                
                {/* Transaction metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Today's Transactions</p>
                      <p className="text-xl font-bold">{platformStats.transactionsToday}</p>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-chart-1/20 flex items-center justify-center">
                      <ClipboardIcon className="h-5 w-5 text-chart-1" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Daily Revenue</p>
                      <p className="text-xl font-bold">{formatCurrency(platformStats.avgDailyRevenue)}</p>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-chart-4/20 flex items-center justify-center">
                      <CalendarIcon className="h-5 w-5 text-chart-4" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Payouts</p>
                      <p className="text-xl font-bold">{formatCurrency(platformStats.pendingPayouts)}</p>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-chart-5/20 flex items-center justify-center">
                      <ClockIcon className="h-5 w-5 text-chart-5" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent activity and approvals */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest platform events and transactions
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-0">
                    {recentActivity.map((activity, index) => (
                      <div 
                        key={index} 
                        className={`flex items-start justify-between p-4 ${
                          index !== recentActivity.length - 1 ? 'border-b border-border/30' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 p-1.5 rounded-full ${
                            activity.type === 'signup' ? 'bg-chart-3/20' :
                            activity.type === 'approval' ? 'bg-chart-1/20' :
                            activity.type === 'transaction' ? 'bg-chart-4/20' :
                            activity.type === 'commission' ? 'bg-chart-5/20' :
                            'bg-muted/50'
                          }`}>
                            {getBadgeIcon(activity.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium">{activity.user}</p>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getBadgeVariant(activity.status)}`}
                              >
                                {activity.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{activity.details}</p>
                            {'amount' in activity && (
                              <p className="text-xs font-medium mt-1">
                                Amount: {formatCurrency(activity.amount as number)}
                              </p>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(activity.timestamp)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-border/30 p-4">
                  <Button variant="outline" className="w-full justify-center">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Pending approvals */}
              <div className="space-y-4">
                {/* Pending startups */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>Pending Startups</CardTitle>
                      <Badge variant="outline" className="bg-chart-5/20 text-chart-5 border-chart-5/30">
                        {pendingStartups.length} pending
                      </Badge>
                    </div>
                    <CardDescription>
                      New startups waiting for approval
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-0">
                      {pendingStartups.map((startup, index) => (
                        <div 
                          key={index} 
                          className={`flex items-center justify-between p-4 ${
                            index !== pendingStartups.length - 1 ? 'border-b border-border/30' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              {startup.logo ? (
                                <AvatarImage src={startup.logo} alt={startup.name} />
                              ) : (
                                <AvatarFallback className="bg-muted text-primary">
                                  {startup.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{startup.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs bg-muted/30">
                                  {startup.type}
                                </Badge>
                                <p className="text-xs text-muted-foreground">
                                  {formatDate(startup.submitted)}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-destructive/50 text-destructive hover:bg-destructive/10 h-8"
                              onClick={() => handleReject(startup.id, 'startup')}
                              disabled={loading}
                            >
                              <XIcon className="h-3.5 w-3.5 mr-1" />
                              Reject
                            </Button>
                            <Button 
                              variant="default"
                              size="sm"
                              className="bg-chart-1 text-chart-1-foreground hover:bg-chart-1/90 h-8"
                              onClick={() => handleApprove(startup.id, 'startup')}
                              disabled={loading}
                            >
                              <CheckIcon className="h-3.5 w-3.5 mr-1" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Pending support structures */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>Pending Support Structures</CardTitle>
                      <Badge variant="outline" className="bg-chart-5/20 text-chart-5 border-chart-5/30">
                        {pendingSupportStructures.length} pending
                      </Badge>
                    </div>
                    <CardDescription>
                      New support structures waiting for approval
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-0">
                      {pendingSupportStructures.map((support, index) => (
                        <div 
                          key={index} 
                          className={`flex items-center justify-between p-4 ${
                            index !== pendingSupportStructures.length - 1 ? 'border-b border-border/30' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              {support.logo ? (
                                <AvatarImage src={support.logo} alt={support.name} />
                              ) : (
                                <AvatarFallback className="bg-muted text-primary">
                                  {support.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{support.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs bg-muted/30">
                                  {support.type}
                                </Badge>
                                <p className="text-xs text-muted-foreground">
                                  Commission: {support.commissionRate}%
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-destructive/50 text-destructive hover:bg-destructive/10 h-8"
                              onClick={() => handleReject(support.id, 'support')}
                              disabled={loading}
                            >
                              <XIcon className="h-3.5 w-3.5 mr-1" />
                              Reject
                            </Button>
                            <Button 
                              variant="default"
                              size="sm"
                              className="bg-chart-1 text-chart-1-foreground hover:bg-chart-1/90 h-8"
                              onClick={() => handleApprove(support.id, 'support')}
                              disabled={loading}
                            >
                              <CheckIcon className="h-3.5 w-3.5 mr-1" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Startups Tab */}
          <TabsContent value="startups" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Startup Management</CardTitle>
                <CardDescription>
                  Approve, manage, and monitor platform startups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StartupApproval 
                  startups={[
                    {
                      id: "startup1",
                      name: "TechFlow AI",
                      logo: "",
                      category: "SaaS",
                      location: "San Francisco, CA",
                      foundedYear: "2022",
                      description: "AI-powered workflow automation platform for businesses of all sizes.",
                      status: "pending",
                      submittedAt: "May 28, 2025",
                      productCount: 5,
                      subcategory: "Workflow Automation"
                    },
                    {
                      id: "startup2",
                      name: "MediConnect",
                      logo: "",
                      category: "Healthcare",
                      location: "Boston, MA",
                      foundedYear: "2023",
                      description: "Telehealth platform connecting patients with specialists globally.",
                      status: "pending",
                      submittedAt: "May 27, 2025",
                      productCount: 3,
                      subcategory: "Telehealth"
                    },
                    {
                      id: "startup3",
                      name: "BlockVista",
                      logo: "",
                      category: "Fintech",
                      location: "New York, NY",
                      foundedYear: "2021",
                      description: "Blockchain solutions for secure financial transactions and record-keeping.",
                      status: "pending",
                      submittedAt: "May 26, 2025",
                      productCount: 2,
                      subcategory: "Blockchain"
                    }
                  ]}
                  onApprove={(id) => handleApprove(id, 'startup')}
                  onReject={(id) => handleReject(id, 'startup')}
                  onView={(id) => console.log(`View startup: ${id}`)}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Support Structures Tab */}
          <TabsContent value="support" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Support Structure Management</CardTitle>
                <CardDescription>
                  Approve and manage incubators, accelerators, and other support structures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SupportStructureApproval 
                  user={user}
                  structures={pendingSupportStructures}
                  onApprove={(id) => handleApprove(id, 'support')}
                  onReject={(id) => handleReject(id, 'support')}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>
                      View and manage platform users
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search users..." 
                        className="pl-10 w-[250px]" 
                      />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="startup">Startups</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                        <SelectItem value="client">Clients</SelectItem>
                        <SelectItem value="admin">Admins</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="gap-2 bg-chart-4 text-white hover:bg-chart-4/90">
                      <PlusIcon className="h-4 w-4" />
                      Add User
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          User
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Role
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Status
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Joined
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Last Active
                        </th>
                        <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {[
                        { id: 1, name: "Sarah Johnson", email: "sarah@example.com", role: "admin", status: "active", joined: "2023-05-15", lastActive: "2025-05-30T08:10:23Z" },
                        { id: 2, name: "TechFlow AI", email: "contact@techflow.ai", role: "startup", status: "pending", joined: "2025-05-30", lastActive: "2025-05-30T08:14:32Z" },
                        { id: 3, name: "FinTech Ventures", email: "support@fintechventures.co", role: "support", status: "active", joined: "2024-12-08", lastActive: "2025-05-30T07:45:18Z" },
                        { id: 4, name: "Enterprise Solutions", email: "info@enterprise.co", role: "client", status: "active", joined: "2025-01-22", lastActive: "2025-05-30T05:48:49Z" },
                        { id: 5, name: "DataSphere", email: "hello@datasphere.io", role: "startup", status: "active", joined: "2024-08-17", lastActive: "2025-05-30T07:12:05Z" }
                      ].map((user) => (
                        <tr key={user.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarFallback className="bg-muted text-primary">
                                  {user.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <Badge 
                              variant="outline" 
                              className={
                                user.role === 'admin' ? 'bg-destructive/20 text-destructive border-destructive/30' :
                                user.role === 'startup' ? 'bg-chart-1/20 text-chart-1 border-chart-1/30' :
                                user.role === 'support' ? 'bg-chart-4/20 text-chart-4 border-chart-4/30' :
                                'bg-chart-3/20 text-chart-3 border-chart-3/30'
                              }
                            >
                              {user.role}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">
                            <Badge 
                              variant="outline" 
                              className={
                                user.status === 'active' ? 'bg-chart-1/20 text-chart-1 border-chart-1/30' :
                                user.status === 'pending' ? 'bg-chart-5/20 text-chart-5 border-chart-5/30' :
                                'bg-destructive/20 text-destructive border-destructive/30'
                              }
                            >
                              {user.status}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">
                            <p className="text-sm">{new Date(user.joined).toLocaleDateString()}</p>
                          </td>
                          <td className="p-4 align-middle">
                            <p className="text-sm">{formatDate(user.lastActive)}</p>
                          </td>
                          <td className="p-4 align-middle text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <EyeIcon className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View profile</DropdownMenuItem>
                                <DropdownMenuItem>Edit user</DropdownMenuItem>
                                <DropdownMenuItem>Send message</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive focus:text-destructive">
                                  Suspend user
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing 5 of 5,427 users
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>
                  Track platform growth, user behavior, and financial metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PlatformAnalytics />
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Commissions Tab */}
          <TabsContent value="commissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Commission Management</CardTitle>
                <CardDescription>
                  Manage commission rates, payouts, and financial oversight
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CommissionManagement user={user} />
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Settings</CardTitle>
                    <CardDescription>
                      Configure global platform settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-3">General</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="maintenance-mode" className="flex flex-col gap-1">
                            <span>Maintenance Mode</span>
                            <span className="font-normal text-xs text-muted-foreground">
                              Temporarily disable the platform
                            </span>
                          </Label>
                          <Switch id="maintenance-mode" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="registration" className="flex flex-col gap-1">
                            <span>User Registration</span>
                            <span className="font-normal text-xs text-muted-foreground">
                              Allow new user registrations
                            </span>
                          </Label>
                          <Switch id="registration" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="auto-approve" className="flex flex-col gap-1">
                            <span>Auto-Approve Clients</span>
                            <span className="font-normal text-xs text-muted-foreground">
                              Automatically approve client accounts
                            </span>
                          </Label>
                          <Switch id="auto-approve" defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="text-sm font-medium mb-3">Security</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="2fa-required" className="flex flex-col gap-1">
                            <span>Require 2FA for Admins</span>
                            <span className="font-normal text-xs text-muted-foreground">
                              Enforce two-factor authentication
                            </span>
                          </Label>
                          <Switch id="2fa-required" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="session-timeout" className="flex flex-col gap-1">
                            <span>Session Timeout</span>
                            <span className="font-normal text-xs text-muted-foreground">
                              Auto-logout after inactivity
                            </span>
                          </Label>
                          <Select defaultValue="60">
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="15">15 min</SelectItem>
                              <SelectItem value="30">30 min</SelectItem>
                              <SelectItem value="60">1 hour</SelectItem>
                              <SelectItem value="120">2 hours</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="text-sm font-medium mb-3">Notifications</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="admin-alerts" className="flex flex-col gap-1">
                            <span>Admin Email Alerts</span>
                            <span className="font-normal text-xs text-muted-foreground">
                              Send critical alerts via email
                            </span>
                          </Label>
                          <Switch id="admin-alerts" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="report-emails" className="flex flex-col gap-1">
                            <span>Weekly Reports</span>
                            <span className="font-normal text-xs text-muted-foreground">
                              Send weekly performance reports
                            </span>
                          </Label>
                          <Switch id="report-emails" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-chart-4 text-white hover:bg-chart-4/90">
                      Save Settings
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>System Information</CardTitle>
                    <CardDescription>
                      Platform details and status
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">Version</p>
                        <p className="text-sm font-medium">v2.1.4</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">Last Updated</p>
                        <p className="text-sm font-medium">May 25, 2025</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">Environment</p>
                        <Badge variant="outline" className="bg-chart-1/20 text-chart-1 border-chart-1/30">
                          Production
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">Server Status</p>
                        <Badge variant="outline" className="bg-chart-1/20 text-chart-1 border-chart-1/30">
                          Healthy
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">Database Status</p>
                        <Badge variant="outline" className="bg-chart-1/20 text-chart-1 border-chart-1/30">
                          Operational
                        </Badge>
                      </div>
                    </div>
                    
                    <Alert>
                      <ServerIcon className="h-4 w-4" />
                      <AlertTitle>Scheduled Maintenance</AlertTitle>
                      <AlertDescription>
                        Planned downtime on June 5, 2025 from 2AM - 4AM UTC for system upgrades.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <FileTextIcon className="h-4 w-4 mr-2" />
                      View Logs
                    </Button>
                    <Button variant="outline" size="sm">
                      <RefreshCwIcon className="h-4 w-4 mr-2" />
                      System Check
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Configuration</CardTitle>
                    <CardDescription>
                      Manage platform-wide settings and policies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="features">
                      <TabsList className="mb-4">
                        <TabsTrigger value="features">Features</TabsTrigger>
                        <TabsTrigger value="commission">Commission</TabsTrigger>
                        <TabsTrigger value="approval">Approval</TabsTrigger>
                        <TabsTrigger value="integrations">Integrations</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="features" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { id: "feature-marketplace", name: "Marketplace", description: "Enable platform marketplace", enabled: true, icon: ShoppingCartIcon },
                            { id: "feature-club", name: "VentureRoom Club", description: "Enable club discounts feature", enabled: true, icon: TagIcon },
                            { id: "feature-messaging", name: "Messaging", description: "Enable in-platform messaging", enabled: true, icon: MessageSquareIcon },
                            { id: "feature-analytics", name: "User Analytics", description: "Enable detailed user analytics", enabled: true, icon: BarChart3Icon },
                            { id: "feature-api", name: "API Access", description: "Allow API access for integrations", enabled: true, icon: ServerIcon },
                            { id: "feature-reviews", name: "Reviews & Ratings", description: "Enable product/service reviews", enabled: true, icon: StarIcon }
                          ].map((feature) => {
                            const Icon = feature.icon;
                            return (
                              <div key={feature.id} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-md bg-muted/30 flex items-center justify-center">
                                    <Icon className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{feature.name}</p>
                                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                                  </div>
                                </div>
                                <Switch defaultChecked={feature.enabled} />
                              </div>
                            );
                          })}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="commission" className="space-y-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="platform-fee">Platform Fee (%)</Label>
                              <div className="flex items-center gap-2">
                                <Input 
                                  id="platform-fee" 
                                  type="number" 
                                  defaultValue="5" 
                                  min="0" 
                                  max="100" 
                                  className="w-full"
                                />
                                <span className="text-lg font-medium">%</span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Base fee charged on all marketplace transactions
                              </p>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="minimum-commission">Minimum Commission ($)</Label>
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-medium">$</span>
                                <Input 
                                  id="minimum-commission" 
                                  type="number" 
                                  defaultValue="2" 
                                  min="0" 
                                  className="w-full"
                                />
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Minimum commission amount per transaction
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="commission-model">Commission Model</Label>
                            <Select defaultValue="tiered">
                              <SelectTrigger id="commission-model">
                                <SelectValue placeholder="Select model" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="flat">Flat Rate</SelectItem>
                                <SelectItem value="tiered">Tiered (Volume-Based)</SelectItem>
                                <SelectItem value="category">Category-Based</SelectItem>
                                <SelectItem value="custom">Custom per Support Structure</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                              How commission rates are calculated
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Tiered Commission Rates</Label>
                            <div className="space-y-2">
                              <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                                <div className="w-1/3">
                                  <p className="text-sm font-medium">Monthly Volume</p>
                                </div>
                                <div className="w-1/3">
                                  <p className="text-sm font-medium">Support Structure %</p>
                                </div>
                                <div className="w-1/3">
                                  <p className="text-sm font-medium">Platform %</p>
                                </div>
                              </div>
                              
                              {[
                                { tier: "$0 - $10,000", support: 8, platform: 5 },
                                { tier: "$10,001 - $50,000", support: 10, platform: 4 },
                                { tier: "$50,001 - $100,000", support: 12, platform: 3 },
                                { tier: "$100,001+", support: 15, platform: 2 }
                              ].map((tier, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 bg-muted/10 rounded-lg">
                                  <div className="w-1/3">
                                    <p className="text-sm">{tier.tier}</p>
                                  </div>
                                  <div className="w-1/3">
                                    <Input 
                                      type="number" 
                                      defaultValue={tier.support.toString()} 
                                      min="0" 
                                      max="100" 
                                      className="h-8"
                                    />
                                  </div>
                                  <div className="w-1/3">
                                    <Input 
                                      type="number" 
                                      defaultValue={tier.platform.toString()} 
                                      min="0" 
                                      max="100" 
                                      className="h-8"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="approval" className="space-y-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <div>
                              <p className="text-sm font-medium">Auto-Approve Clients</p>
                              <p className="text-xs text-muted-foreground">
                                Automatically approve client account registrations
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <div>
                              <p className="text-sm font-medium">Manual Startup Approval</p>
                              <p className="text-xs text-muted-foreground">
                                Require admin approval for startup registrations
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <div>
                              <p className="text-sm font-medium">Manual Support Structure Approval</p>
                              <p className="text-xs text-muted-foreground">
                                Require admin approval for support structure registrations
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <div>
                              <p className="text-sm font-medium">Product Pre-Approval</p>
                              <p className="text-xs text-muted-foreground">
                                Review products before they appear in marketplace
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="rejection-templates">Rejection Templates</Label>
                            <Select defaultValue="insufficient">
                              <SelectTrigger id="rejection-templates">
                                <SelectValue placeholder="Select template" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="insufficient">Insufficient Information</SelectItem>
                                <SelectItem value="guidelines">Doesn't Meet Guidelines</SelectItem>
                                <SelectItem value="prohibited">Prohibited Content</SelectItem>
                                <SelectItem value="verification">Failed Verification</SelectItem>
                              </SelectContent>
                            </Select>
                            <div className="border rounded-md p-3 min-h-[100px] mt-2">
                              Thank you for your submission. Unfortunately, we cannot approve your application at this time due to insufficient information. Please provide more details about your business model, products/services, and team experience. You're welcome to resubmit with the additional information.
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="integrations" className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          {[
                            { id: "payment-gateway", name: "Payment Gateway", provider: "Stripe", status: "connected", icon: BanknoteIcon },
                            { id: "email-service", name: "Email Service", provider: "SendGrid", status: "connected", icon: MailIcon },
                            { id: "analytics-service", name: "Analytics", provider: "Google Analytics", status: "connected", icon: BarChart3Icon },
                            { id: "crm-service", name: "CRM Integration", provider: "Not Connected", status: "disconnected", icon: UsersIcon },
                            { id: "slack-notifications", name: "Slack Notifications", provider: "Not Connected", status: "disconnected", icon: BellIcon }
                          ].map((integration) => {
                            const Icon = integration.icon;
                            return (
                              <div key={integration.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-md bg-muted/30 flex items-center justify-center">
                                    <Icon className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{integration.name}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge 
                                        variant="outline" 
                                        className={
                                          integration.status === 'connected' 
                                            ? 'bg-chart-1/20 text-chart-1 border-chart-1/30' 
                                            : 'bg-muted text-muted-foreground'
                                        }
                                      >
                                        {integration.status === 'connected' ? (
                                          <CheckIcon className="h-3 w-3 mr-1" />
                                        ) : (
                                          <XIcon className="h-3 w-3 mr-1" />
                                        )}
                                        {integration.status}
                                      </Badge>
                                      <p className="text-xs text-muted-foreground">
                                        {integration.provider}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <Button 
                                  variant={integration.status === 'connected' ? 'outline' : 'default'}
                                  size="sm"
                                >
                                  {integration.status === 'connected' ? 'Configure' : 'Connect'}
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className="flex justify-end">
                          <Button variant="outline" className="gap-2">
                            <PlusIcon className="h-4 w-4" />
                            Add Integration
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-border/30 pt-6">
                    <Button variant="outline">Reset to Defaults</Button>
                    <Button className="bg-chart-4 text-white hover:bg-chart-4/90">
                      Save Configuration
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Admin Activity Log</CardTitle>
                    <CardDescription>
                      Recent administrative actions and changes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { action: "Approved startup", user: "Sarah Johnson", timestamp: "2025-05-30T08:20:15Z", details: "Approved TechFlow AI startup registration" },
                        { action: "Updated commission rates", user: "Sarah Johnson", timestamp: "2025-05-29T14:45:32Z", details: "Changed tiered commission structure for volume $50,001+" },
                        { action: "System maintenance", user: "System", timestamp: "2025-05-28T02:30:00Z", details: "Scheduled database optimization completed successfully" },
                        { action: "User suspension", user: "Sarah Johnson", timestamp: "2025-05-27T16:12:48Z", details: "Suspended user account for TOS violation" },
                        { action: "Platform setting change", user: "Michael Chen", timestamp: "2025-05-27T11:05:22Z", details: "Enabled new feature: VentureRoom Club" }
                      ].map((log, index) => (
                        <div 
                          key={index} 
                          className="flex items-start justify-between p-3 bg-muted/10 rounded-lg"
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                              <ClipboardIcon className="h-3.5 w-3.5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{log.action}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                By: {log.user} • {formatDate(log.timestamp)}
                              </p>
                              <p className="text-xs mt-1">{log.details}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center border-t border-border/30 pt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      View Full Activity Log
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Settings Dialog */}
      {showSettingsDialog && (
        <SettingsDialog
          user={user}
          onClose={() => setShowSettingsDialog(false)}
        />
      )}
    </div>
  );
}