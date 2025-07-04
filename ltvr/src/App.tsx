import { useState, useEffect } from "react";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { RoleSelect } from "./components/auth/RoleSelect";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./components/home/HomePage";
import { AuthenticationFlow } from "./components/auth/AuthenticationFlow";
import { StartupStorefront } from "./components/startup/StartupStorefront";
import { Marketplace } from "./components/marketplace/Marketplace";
import { PaymentSystem } from "./components/payments/PaymentSystem";
import { CommunityDiscounts } from "./components/community/CommunityDiscounts";
import { BrowserRouter, Routes, Route as RouterRoute, Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { type AppRoute } from './types/routes';
import { createInitialBackup } from "./utils/backupUtils";
import { Icons } from "./components/icons";
import { motion, AnimatePresence } from "framer-motion";
import { ClientDashboard } from "./components/client/ClientDashboard";
import { VentureRoomClub } from "./components/club/VentureRoomClub";
import { DashboardRouter } from "./components/dashboard/DashboardRouter";
import { DarkModeFallback } from "./components/DarkModeFallback";

// Animation variants
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: "easeInOut" } 
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    transition: { duration: 0.3, ease: "easeInOut" } 
  }
};

// Valid routes for type safety
const validRoutes: AppRoute[] = [
  "home", 
  "auth", 
  "startup-storefront", 
  "support-structure-dashboard", 
  "marketplace",
  "startup-dashboard",
  "admin-portal",
  "payments",
  "community-discounts",
  "client-dashboard",
  "purchase-history",
  "venture-room-club",
  "dashboard-overview" // Add new dashboard overview route
];

// Window interface is defined in types.d.ts

interface JwtPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  exp: number;
}

function App() {
  // App state
  const [showFallback, setShowFallback] = useState(true);
  const [currentRoute, setCurrentRoute] = useState<AppRoute>("home");
  const [user, setUser] = useState<any>(null);
  const [pageTransition, setPageTransition] = useState(false);

  // SEO route titles mapping
  const routeTitles: Record<AppRoute, string> = {
    "home": "VenturesRoom | The Future of Startup Ecosystems",
    "auth": "Sign In or Sign Up | VenturesRoom",
    "startup-storefront": "Startup Storefront | VenturesRoom",
    "support-structure-dashboard": "Support Structure Dashboard | VenturesRoom",
    "marketplace": "Discover Startups & Products | VenturesRoom Marketplace",
    "startup-dashboard": "Startup Dashboard | VenturesRoom",
    "admin-portal": "Admin Portal | VenturesRoom",
    "payments": "Payments & Commissions | VenturesRoom",
    "community-discounts": "Community & Discounts | VenturesRoom",
    "client-dashboard": "Client Dashboard | VenturesRoom",
    "purchase-history": "Purchase History | VenturesRoom",
    "venture-room-club": "VenturesRoom Club | Exclusive Benefits",
    "dashboard-overview": "Platform Features | VenturesRoom",
    "role-select": "Choisissez votre rôle | VenturesRoom"
  };

  // SEO route descriptions mapping
  const routeDescriptions: Record<AppRoute, string> = {
    "home": "VenturesRoom connects startups, support structures, and clients in one powerful marketplace. Discover, collaborate, and scale in our digital venture space.",
    "auth": "Sign in to your VenturesRoom account or create a new one. Connect with startups, incubators, and clients in our ecosystem.",
    "startup-storefront": "Explore innovative startups, their products and services on the VenturesRoom platform.",
    "support-structure-dashboard": "Manage your support structure, track startups, and analyze performance on VenturesRoom.",
    "marketplace": "Discover and purchase products and services from innovative startups on the VenturesRoom marketplace.",
    "startup-dashboard": "Manage your startup, track performance, and grow your business on VenturesRoom.",
    "admin-portal": "Administrative tools and platform management for VenturesRoom.",
    "payments": "Secure payment processing and commission tracking for the VenturesRoom ecosystem.",
    "community-discounts": "Exclusive discounts and community benefits for VenturesRoom members.",
    "client-dashboard": "Manage your purchases and interact with startups as a client on VenturesRoom.",
    "purchase-history": "Track your purchase history and manage orders on VenturesRoom.",
    "venture-room-club": "Join the exclusive VenturesRoom Club for premium benefits and opportunities.",
    "dashboard-overview": "Explore all features and capabilities of the VenturesRoom platform."
    ,"role-select": "Sélectionnez le rôle avec lequel vous souhaitez naviguer sur la plateforme."
  };

  // Viewport detection helper function (defined before any conditional returns)
  const handleViewportChanges = () => {
    // Update CSS variables based on viewport width
    // This approach allows for more fine-grained control than media queries alone
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Adjust for iOS safari address bar
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    
    if (isIOS && isSafari) {
      document.documentElement.classList.add('ios-safari');
    } else {
      document.documentElement.classList.remove('ios-safari');
    }
  };

  // Update document title, meta description, and canonical URL based on current route
  useEffect(() => {
    // Update document title
    document.title = routeTitles[currentRoute];
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', routeDescriptions[currentRoute]);
    }
    
    // Update canonical URL
    const baseUrl = 'https://venturesroom.com';
    let canonicalPath = '/';
    
    // Map routes to paths
    switch (currentRoute) {
      case 'home':
        canonicalPath = '/';
        break;
      case 'auth':
        canonicalPath = '/auth';
        break;
      case 'marketplace':
        canonicalPath = '/marketplace';
        break;
      case 'startup-storefront':
        // For dynamic routes, we can add IDs from sessionStorage
        const startupId = sessionStorage.getItem(`startup-storefront-params`) 
          ? JSON.parse(sessionStorage.getItem(`startup-storefront-params`) || '{}').startupId
          : undefined;
        canonicalPath = startupId ? `/startup/${startupId}` : '/startup';
        break;
      // Add other routes as needed
      default:
        canonicalPath = `/${currentRoute.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    }
    
    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `${baseUrl}${canonicalPath}`);
    }
    
    // Also update OG and Twitter URLs
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const twitterUrl = document.querySelector('meta[name="twitter:url"]');
    
    if (ogUrl) {
      ogUrl.setAttribute('content', `${baseUrl}${canonicalPath}`);
    }
    
    if (twitterUrl) {
      twitterUrl.setAttribute('content', `${baseUrl}${canonicalPath}`);
    }
  }, [currentRoute]);

  // Apply saved theme and restore session state
  useEffect(() => {
    // Try to restore last visited route
    const savedRoute = sessionStorage.getItem("currentRoute");
    if (savedRoute && isValidRoute(savedRoute)) {
      setCurrentRoute(savedRoute as AppRoute);
    }

    // Restore user if available
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user data");
      }
    }
    
    // Hide fallback after short delay
    const timer = setTimeout(() => {
      setShowFallback(false);
      
      // Create initial backup of the landing page after the app has loaded
      // Only do this when we're on the home route
      if (currentRoute === "home") {
        createInitialBackup();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [currentRoute]);

  // Initialize viewport height variable and add resize listener
  // IMPORTANT: This hook must be defined before any conditional returns
  useEffect(() => {
    handleViewportChanges();
    window.addEventListener('resize', handleViewportChanges);
    window.addEventListener('orientationchange', handleViewportChanges);
    
    return () => {
      window.removeEventListener('resize', handleViewportChanges);
      window.removeEventListener('orientationchange', handleViewportChanges);
    };
  }, []);

  // Make navigation available globally - with proper types now
  useEffect(() => {
    window.navigateTo = navigate;
    window.setUser = setUser;
    window.handleLogin = handleLogin;
    window.handleLogout = handleLogout;
    
    return () => {
      // Clean up global functions on unmount
      window.navigateTo = undefined as any;
      window.setUser = undefined as any;
      window.handleLogin = undefined as any;
      window.handleLogout = undefined as any;
    };
  }, []);

  // Validate routes
  const isValidRoute = (route: string): route is AppRoute => {
    return validRoutes.includes(route as AppRoute);
  };

  // Navigation with transition animation and optional parameters
  const navigate = (route: AppRoute, params?: Record<string, string>) => {
    if (route === currentRoute && !params) return;
    
    setPageTransition(true);
    
    // Delay to allow exit animation
    setTimeout(() => {
      setCurrentRoute(route);
      sessionStorage.setItem("currentRoute", route);
      
      // Store parameters in session storage if provided
      if (params) {
        sessionStorage.setItem(`${route}-params`, JSON.stringify(params));
      }
      
      window.scrollTo(0, 0);
      setPageTransition(false);
    }, 300);
  };

  // Authentication handlers
  const handleLogin = (userData?: any) => {
    if (userData) {
      // Extraction robuste du tableau de rôles depuis les métadonnées
      let roles = userData.user_metadata?.role || userData.app_metadata?.role || userData.role;
      if (typeof roles === 'string') roles = [roles];
      if (!Array.isArray(roles)) roles = [];
      const fullName = userData.full_name || userData.user_metadata?.full_name || userData.user_metadata?.name;
      // Par défaut, rôle actif = premier rôle
      const activeRole = roles[0] || null;
      const enhancedUserData = {
        ...userData,
        roles,
        activeRole,
        full_name: fullName,
        id: userData.id || `user-${Date.now()}`,
        joinDate: userData.joinDate || new Date().toISOString()
      };
      setUser(enhancedUserData);
      sessionStorage.setItem("user", JSON.stringify(enhancedUserData));
      // Si plusieurs rôles, demander à l'utilisateur de choisir
      if (roles.length > 1) {
        navigate("role-select");
        return;
      }
      // Navigation selon le rôle actif
      switch (activeRole) {
        case "startup":
          navigate("startup-dashboard");
          break;
        case "Accelerateur/Incubateur":
        case "support":
          navigate("support-structure-dashboard");
          break;
        case "admin":
          navigate("admin-portal");
          break;
        case "client":
        default:
          navigate("client-dashboard");
          break;
      }
    } else {
      navigate("auth");
    }
  };

  const handleSignup = () => {
    navigate("auth");
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('home');
  };

  // ...SUPPRIMÉ : getNavItems...

  // Helper to determine if the current route is a dashboard route
  const isDashboardRoute = (route: string): boolean => {
    return ["startup-dashboard", "support-structure-dashboard", "admin-portal"].includes(route);
  };

  // If showing fallback, only render that
  if (showFallback) {
    return (
      <DarkModeFallback onContinue={() => setShowFallback(false)} />
    );
  }

  return (
    <>
      <BrowserRouter>
        <ThemeProvider>
          <Layout 
            user={user}
            currentRoute={currentRoute}
            navigate={navigate}
            onLogin={handleLogin} 
            onSignup={handleSignup} 
            onLogout={handleLogout}
          >
            {/* Route-based content with page transitions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRoute}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={pageVariants}
                className="min-h-[calc(100vh-80px)] min-h-[calc(var(--vh, 1vh) * 100 - 80px)]"
              >
                {currentRoute === "home" && <HomePage />}
                {currentRoute === "auth" && <AuthenticationFlow onLogin={handleLogin} />}
                {currentRoute === "role-select" && user && (
                  <RoleSelect user={user} onSelect={(role) => {
                    // Met à jour le rôle actif et redirige
                    const updatedUser = { ...user, activeRole: role };
                    setUser(updatedUser);
                    sessionStorage.setItem("user", JSON.stringify(updatedUser));
                    if (role === "startup") navigate("startup-dashboard");
                    else if (role === "Accelerateur/Incubateur") navigate("support-structure-dashboard");
                    else if (role === "admin") navigate("admin-portal");
                    else if (role === "client") navigate("client-dashboard");
                    else navigate("home");
                  }} />
                )}
                {currentRoute === "startup-storefront" && (
                  <StartupStorefront 
                    startupId={
                      sessionStorage.getItem(`startup-storefront-params`) 
                        ? JSON.parse(sessionStorage.getItem(`startup-storefront-params`) || '{}').startupId
                        : undefined
                    } 
                  />
                )}
                {currentRoute === "marketplace" && <Marketplace />}
                {currentRoute === "payments" && <PaymentSystem user={user} />}
                {currentRoute === "community-discounts" && <CommunityDiscounts user={user} />}
                {currentRoute === "client-dashboard" && <ClientDashboard user={user} />}
                {currentRoute === "purchase-history" && <ClientDashboard user={user} />}
                {currentRoute === "venture-room-club" && (
                  <VentureRoomClub 
                    user={user}
                    onLogin={handleLogin}
                    onSignup={handleSignup}
                  />
                )}
                {/* Use DashboardRouter for all dashboard routes */}
                {isDashboardRoute(currentRoute) && (
                  <DashboardRouter 
                    user={user} 
                    currentRoute={currentRoute}
                    navigate={navigate}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded || Date.now() >= decoded.exp * 1000) {
      localStorage.removeItem('token');
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <>{children}</>;
  } catch {
    localStorage.removeItem('token');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}

export default App;