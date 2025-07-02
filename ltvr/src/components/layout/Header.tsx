import { ReactNode } from "react";
import { Logo } from "./Logo";
import { Button } from "../ui/button";
import { type AppRoute } from '../../types/routes';
import { 
  LogOutIcon, 
  LogInIcon, 
  UserPlusIcon, 
  HomeIcon,
  LayoutDashboardIcon,
  UserIcon,
  MenuIcon,
  BriefcaseIcon,
  BuildingIcon,
  ShieldIcon
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState, useEffect } from 'react';
import { RoleSwitcher } from "./RoleSwitcher";

interface HeaderProps {
  user: any;
  onLogin: (userData?: any) => void;
  onSignup: () => void;
  onLogout: () => void;
  currentRoute: AppRoute;
  navigate: (route: AppRoute) => void;
  children?: ReactNode;
}

export function Header({
  user,
  onLogin,
  onSignup,
  onLogout,
  currentRoute,
  navigate,
  children
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Détermination du dashboard selon le rôle actif (multi-rôles)
  const dashboardRoute: AppRoute = user?.activeRole === "startup"
    ? "startup-dashboard"
    : user?.activeRole === "support" || user?.activeRole === "Accelerateur/Incubateur"
      ? "support-structure-dashboard"
      : user?.activeRole === "admin"
        ? "admin-portal"
        : "client-dashboard";
  
  const isAuthenticated = !!(user && (localStorage.getItem('token') || sessionStorage.getItem('token')));
  
  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Reset mobile menu
    setIsMobileMenuOpen(false);
    
    // Call the onLogout callback before navigating
    onLogout();
    
    // Navigate to home
    navigate('home');
  };

  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and navigation */}
          <div className="flex items-center gap-6">
            <Logo onClick={() => navigate("home")} size="large" />
            
            {/* Desktop navigation links */}
            <nav className="hidden md:flex items-center gap-6">
              <Button 
                variant="link" 
                onClick={() => navigate("home")}
                className={`text-foreground/80 hover:text-primary ${currentRoute === "home" ? "text-primary" : ""}`}
              >
                Home
              </Button>
              <Button 
                variant="link" 
                onClick={() => navigate("marketplace")}
                className={`text-foreground/80 hover:text-primary ${currentRoute === "marketplace" ? "text-primary" : ""}`}
              >
                Marketplace
              </Button>
              <Button 
                variant="link" 
                onClick={() => navigate("startup-storefront")}
                className={`text-foreground/80 hover:text-primary ${currentRoute === "startup-storefront" ? "text-primary" : ""}`}
              >
                Startups
              </Button>
              <Button 
                variant="link" 
                onClick={() => navigate("venture-room-club")}
                className={`text-foreground/80 hover:text-primary ${currentRoute === "venture-room-club" ? "text-primary" : ""}`}
              >
                Club
              </Button>
            </nav>
          </div>
          
          {/* Role Switcher supprimé */}
          
          {/* Pass children (including BackupManager) */}
          {children}
          
          {/* Authentication actions */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* Desktop view */}
                <div className="hidden md:flex items-center gap-4">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(dashboardRoute)}
                    className="flex gap-2 items-center"
                  >
                    <LayoutDashboardIcon className="h-4 w-4" />
                    Dashboard
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="relative">
                        <UserIcon className="h-4 w-4 mr-2" />
                        {user.full_name || user.name || user.email || "Account"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem>
                        <UserIcon className="h-4 w-4 mr-2" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOutIcon className="h-4 w-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                {/* Mobile menu button */}
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="md:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                {/* Desktop view */}
                <div className="hidden md:flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      navigate("auth");
                      onLogin();
                    }}
                    className="flex gap-2 items-center"
                  >
                    <LogInIcon className="h-4 w-4" />
                    Sign In
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => {
                      navigate("auth");
                      onSignup();
                    }}
                    className="flex gap-2 items-center"
                  >
                    <UserPlusIcon className="h-4 w-4" />
                    Sign Up
                  </Button>
                </div>
                
                {/* Mobile menu button */}
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="md:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-border mt-4">
            <nav className="flex flex-col gap-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  navigate("home");
                  setIsMobileMenuOpen(false);
                }}
                className={`justify-start ${currentRoute === "home" ? "text-primary" : ""}`}
              >
                <HomeIcon className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  navigate("marketplace");
                  setIsMobileMenuOpen(false);
                }}
                className={`justify-start ${currentRoute === "marketplace" ? "text-primary" : ""}`}
              >
                <HomeIcon className="h-4 w-4 mr-2" />
                Marketplace
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  navigate("startup-storefront");
                  setIsMobileMenuOpen(false);
                }}
                className={`justify-start ${currentRoute === "startup-storefront" ? "text-primary" : ""}`}
              >
                <HomeIcon className="h-4 w-4 mr-2" />
                Startups
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  navigate("venture-room-club");
                  setIsMobileMenuOpen(false);
                }}
                className={`justify-start ${currentRoute === "venture-room-club" ? "text-primary" : ""}`}
              >
                <HomeIcon className="h-4 w-4 mr-2" />
                Club
              </Button>
              
              {/* Mobile Role Switcher */}
              <div className="pt-2 pb-2 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Test Accounts:</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      onLogin({
                        id: "startup-123",
                        name: "Innovate Tech",
                        email: "founder@innovatetech.com",
                        role: "startup",
                        joinDate: "2024-03-15T08:00:00.000Z"
                      });
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start h-auto py-1.5"
                  >
                    <BriefcaseIcon className="h-3.5 w-3.5 mr-1.5 text-tertiary" />
                    <span className="text-xs">Startup</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      onLogin({
                        id: "support-456",
                        name: "Venture Capital Partners",
                        email: "partner@vcpartners.com",
                        role: "support",
                        joinDate: "2024-01-10T08:00:00.000Z"
                      });
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start h-auto py-1.5"
                  >
                    <BuildingIcon className="h-3.5 w-3.5 mr-1.5 text-chart-4" />
                    <span className="text-xs">Support</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      onLogin({
                        id: "admin-789",
                        name: "System Administrator",
                        email: "admin@venturesroom.com",
                        role: "admin",
                        joinDate: "2023-11-05T08:00:00.000Z"
                      });
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start h-auto py-1.5"
                  >
                    <ShieldIcon className="h-3.5 w-3.5 mr-1.5 text-destructive" />
                    <span className="text-xs">Admin</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      onLogin({
                        id: "client-101",
                        name: "Jane Smith",
                        email: "jane@example.com",
                        role: "client",
                        joinDate: "2024-04-20T08:00:00.000Z"
                      });
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start h-auto py-1.5"
                  >
                    <UserIcon className="h-3.5 w-3.5 mr-1.5 text-chart-5" />
                    <span className="text-xs">Client</span>
                  </Button>
                </div>
              </div>
              
              {isAuthenticated ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      navigate(dashboardRoute);
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    <LayoutDashboardIcon className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start text-destructive"
                  >
                    <LogOutIcon className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      onLogin();
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    <LogInIcon className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => {
                      onSignup();
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    <UserPlusIcon className="h-4 w-4 mr-2" />
                    Sign Up
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}