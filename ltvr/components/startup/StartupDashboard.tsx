import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { NotificationsPanel } from "./NotificationsPanel";
import { OrdersManagement } from "./OrdersManagement";
import { ProductServiceCreation } from "./ProductServiceCreation";
import { SettingsPanel } from "./SettingsPanel";
import { RevenueSummary } from "./RevenueSummary";
import { SalesChart } from "./SalesChart";
import { CustomerManagement } from "./CustomerManagement";
import { SupportStructureManagement } from "./SupportStructureManagement";
import { Route } from "../layout/NavigationBar";
import { 
  LayoutDashboardIcon, 
  PackageIcon, 
  UsersIcon, 
  BellIcon, 
  SettingsIcon, 
  PlusIcon, 
  TagIcon,
  ShoppingCartIcon,
  BarChart3Icon,
  ArrowUpIcon,
  BuildingIcon
} from "lucide-react@0.487.0";
import { Badge } from "../ui/badge";

type StartupDashboardProps = {
  user: any;
  navigate: (route: Route) => void;
};

export function StartupDashboard({ user, navigate }: StartupDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Placeholder data for dashboard
  const dashboardData = {
    revenue: {
      total: "$24,500",
      change: "+12.5%",
      trend: "up"
    },
    orders: {
      total: 156,
      pending: 8,
      change: "+24.2%",
      trend: "up"
    },
    customers: {
      total: 483,
      new: 12,
      change: "+5.1%",
      trend: "up"
    },
    products: {
      total: 12,
      active: 10
    },
    supportStructures: {
      total: 4,
      pending: 2,
      approved: 2
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{user?.name || "Startup Dashboard"}</h1>
          <p className="text-muted-foreground mt-1">
            Manage your products, orders and customers
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button 
            variant="outline"
            onClick={() => navigate("community-discounts")}
            className="flex items-center"
          >
            <TagIcon className="h-4 w-4 mr-2" />
            Manage Discounts
          </Button>
          
          <Button 
            onClick={() => navigate("startup-storefront")}
            className="flex items-center"
          >
            <ShoppingCartIcon className="h-4 w-4 mr-2" />
            View Storefront
          </Button>
        </div>
      </div>
      
      {/* Dashboard Tabs */}
      <Tabs 
        defaultValue="overview" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <LayoutDashboardIcon className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-1">
            <PackageIcon className="h-4 w-4" />
            <span>Products</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-1 relative">
            <ShoppingCartIcon className="h-4 w-4" />
            <span>Orders</span>
            {dashboardData.orders.pending > 0 && (
              <Badge variant="destructive" className="absolute -right-3 -top-2 px-1.5 min-w-[1.25rem] h-5 text-xs">
                {dashboardData.orders.pending}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center gap-1">
            <UsersIcon className="h-4 w-4" />
            <span>Customers</span>
          </TabsTrigger>
          <TabsTrigger value="support-structures" className="flex items-center gap-1 relative">
            <BuildingIcon className="h-4 w-4" />
            <span>Support Structures</span>
            {dashboardData.supportStructures?.pending > 0 && (
              <Badge variant="warning" className="absolute -right-3 -top-2 px-1.5 min-w-[1.25rem] h-5 text-xs">
                {dashboardData.supportStructures.pending}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1">
            <BellIcon className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-1">
            <SettingsIcon className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Overview tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Revenue Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <h3 className="text-2xl font-bold mt-1">{dashboardData.revenue.total}</h3>
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${dashboardData.revenue.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                    <ArrowUpIcon className="h-3 w-3" />
                    <span>{dashboardData.revenue.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Orders Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                    <h3 className="text-2xl font-bold mt-1">{dashboardData.orders.total}</h3>
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${dashboardData.orders.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                    <ArrowUpIcon className="h-3 w-3" />
                    <span>{dashboardData.orders.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Customers Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Customers</p>
                    <h3 className="text-2xl font-bold mt-1">{dashboardData.customers.total}</h3>
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${dashboardData.customers.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                    <ArrowUpIcon className="h-3 w-3" />
                    <span>{dashboardData.customers.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Products Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Products</p>
                    <h3 className="text-2xl font-bold mt-1">{dashboardData.products.active}</h3>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">
                    {dashboardData.products.total} Total
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3Icon className="h-5 w-5 text-primary" />
                    Sales Overview
                  </CardTitle>
                  <CardDescription>Your revenue performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <SalesChart />
                </CardContent>
              </Card>
            </div>
            <div>
              <RevenueSummary />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Latest Orders</CardTitle>
                <CardDescription>Recent customer purchases</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <OrdersManagement limit={5} showHeader={false} />
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setActiveTab("orders")}
                >
                  View All Orders
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Recent system notifications</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <NotificationsPanel limit={5} showHeader={false} />
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setActiveTab("notifications")}
                >
                  View All Notifications
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Products tab */}
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <CardTitle>Products & Services</CardTitle>
                <CardDescription>Manage your offerings</CardDescription>
              </div>
              <Button
                className="mt-2 sm:mt-0 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  // Reference will be handled by the ProductServiceCreation component
                }}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </CardHeader>
            <CardContent>
              <div className="py-6">
                <ProductServiceCreation />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Orders tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Orders Management</CardTitle>
              <CardDescription>Manage customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <OrdersManagement showHeader={true} />
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Customers tab */}
        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customers</CardTitle>
              <CardDescription>Manage your customer relationships</CardDescription>
            </CardHeader>
            <CardContent>
              <CustomerManagement />
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>System and order notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationsPanel showHeader={true} />
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Support Structures tab */}
        <TabsContent value="support-structures">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BuildingIcon className="h-5 w-5 text-primary" />
                Support Structure Management
              </CardTitle>
              <CardDescription>
                Manage your support structure partnerships and commission agreements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SupportStructureManagement user={user} />
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Settings tab */}
        <TabsContent value="settings">
          <SettingsPanel user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}