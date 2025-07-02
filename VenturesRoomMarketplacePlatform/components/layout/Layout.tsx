import { ReactNode, useRef, useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Route } from "./NavigationBar";
import { BackupManager } from "../utils/BackupManager";
import { AnimatePresence } from "framer-motion";
import { DashboardOverview } from "../dashboard/DashboardOverview";
import { ResponsiveProvider, useIsMobile } from "../ui/use-responsive";

interface LayoutProps {
  user: any;
  onLogin: (userData?: any) => void;
  onSignup: () => void;
  onLogout: () => void;
  currentRoute: Route;
  navigate: (route: Route) => void;
  children: ReactNode;
}

function LayoutContent({
  user,
  onLogin,
  onSignup,
  onLogout,
  currentRoute,
  navigate,
  children
}: LayoutProps) {
  // Reference to main content for keyboard navigation
  const mainContentRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Skip to main content functionality
  const handleSkipToContent = () => {
    if (mainContentRef.current) {
      mainContentRef.current.focus();
      mainContentRef.current.scrollIntoView();
    }
  };
  
  // For homepage only, show backup manager
  const showBackupManager = currentRoute === "home";
  
  // Check if we should show the dashboard overview
  const isDashboardOverview = currentRoute === "dashboard-overview";

  // Detect scroll for potential UI adjustments on mobile
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setHasScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine padding bottom based on route and device
  const getMainPadding = () => {
    if (currentRoute === 'home') return 'pb-0';
    if (isMobile) return 'pb-24'; // Extra space for mobile navigation
    return 'pb-20';
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Skip to content link - only visible on focus (for accessibility) */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground focus:top-0 focus:left-0"
        onClick={handleSkipToContent}
      >
        Skip to content
      </a>
      
      <Header 
        user={user}
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={onLogout}
        currentRoute={currentRoute}
        navigate={navigate}
        isScrolled={hasScrolled}
      />
      
      <main 
        className={`flex-1 relative ${getMainPadding()} w-full overflow-x-hidden`}
        ref={mainContentRef}
        tabIndex={-1}
        id="main-content"
        aria-live="polite"
      >
        {isDashboardOverview ? (
          <DashboardOverview />
        ) : (
          <>
            {children}
            
            {/* Backup manager for homepage content */}
            {showBackupManager && (
              <AnimatePresence>
                <BackupManager route={currentRoute} />
              </AnimatePresence>
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export function Layout(props: LayoutProps) {
  // Wrap with ResponsiveProvider to provide responsive context to all components
  return (
    <ResponsiveProvider>
      <LayoutContent {...props} />
    </ResponsiveProvider>
  );
}