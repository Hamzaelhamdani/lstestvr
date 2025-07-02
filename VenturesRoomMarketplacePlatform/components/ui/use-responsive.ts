import * as React from "react";

// Tailwind-like breakpoints
export const breakpoints = {
  xs: 320,   // Extra small devices (phones)
  sm: 640,   // Small devices (large phones, small tablets)
  md: 768,   // Medium devices (tablets)
  lg: 1024,  // Large devices (desktops, large tablets)
  xl: 1280,  // Extra large devices (large desktops)
  "2xl": 1536 // 2XL screens
};

// Store breakpoint states globally to avoid duplicating media queries
const breakpointCache = {
  listeners: new Set<() => void>(),
  states: Object.keys(breakpoints).reduce((acc, key) => {
    acc[key as keyof typeof breakpoints] = false;
    return acc;
  }, {} as Record<keyof typeof breakpoints, boolean>),
  initialized: false
};

// Initialize breakpoint listeners once
function initializeBreakpointListeners() {
  if (typeof window === 'undefined' || breakpointCache.initialized) return;
  
  breakpointCache.initialized = true;
  
  // Create media query listeners for all breakpoints
  Object.entries(breakpoints).forEach(([key, value]) => {
    const mql = window.matchMedia(`(min-width: ${value}px)`);
    
    // Set initial state
    breakpointCache.states[key as keyof typeof breakpoints] = mql.matches;
    
    // Create listener function
    const handleChange = () => {
      breakpointCache.states[key as keyof typeof breakpoints] = mql.matches;
      // Notify all components that depend on this breakpoint
      breakpointCache.listeners.forEach(listener => listener());
    };
    
    // Add listener
    if (mql.addEventListener) {
      mql.addEventListener('change', handleChange);
    } else {
      // Legacy support
      mql.addListener(handleChange as any);
    }
  });
}

// Hook to check if viewport matches a specific breakpoint
export function useBreakpoint(breakpoint: keyof typeof breakpoints) {
  // Initialize listeners on first call if needed
  React.useEffect(() => {
    if (!breakpointCache.initialized && typeof window !== 'undefined') {
      initializeBreakpointListeners();
    }
  }, []);
  
  // Use state to track the breakpoint match
  const [matches, setMatches] = React.useState<boolean>(() => {
    // Initialize with current value if available
    if (breakpointCache.initialized) {
      return breakpointCache.states[breakpoint];
    }
    
    // Otherwise, default to false until initialized
    return false;
  });
  
  // Subscribe to changes
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Initialize if not already done
    if (!breakpointCache.initialized) {
      initializeBreakpointListeners();
    }
    
    // Update state with current value
    setMatches(breakpointCache.states[breakpoint]);
    
    // Create listener to update state when breakpoint changes
    const handleChange = () => {
      setMatches(breakpointCache.states[breakpoint]);
    };
    
    // Add listener
    breakpointCache.listeners.add(handleChange);
    
    // Cleanup
    return () => {
      breakpointCache.listeners.delete(handleChange);
    };
  }, [breakpoint]);
  
  return matches;
}

// Hook to get all breakpoint states at once
export function useBreakpoints() {
  // Initialize listeners on first call if needed
  React.useEffect(() => {
    if (!breakpointCache.initialized && typeof window !== 'undefined') {
      initializeBreakpointListeners();
    }
  }, []);
  
  // Use state to track all breakpoint matches
  const [allBreakpoints, setAllBreakpoints] = React.useState<Record<keyof typeof breakpoints, boolean>>(() => {
    // Return current states if initialized
    if (breakpointCache.initialized) {
      return { ...breakpointCache.states };
    }
    
    // Otherwise, return defaults
    return Object.keys(breakpoints).reduce((acc, key) => {
      acc[key as keyof typeof breakpoints] = false;
      return acc;
    }, {} as Record<keyof typeof breakpoints, boolean>);
  });
  
  // Subscribe to changes
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Initialize if not already done
    if (!breakpointCache.initialized) {
      initializeBreakpointListeners();
    }
    
    // Update state with current values
    setAllBreakpoints({ ...breakpointCache.states });
    
    // Create listener to update state when any breakpoint changes
    const handleChange = () => {
      setAllBreakpoints({ ...breakpointCache.states });
    };
    
    // Add listener
    breakpointCache.listeners.add(handleChange);
    
    // Cleanup
    return () => {
      breakpointCache.listeners.delete(handleChange);
    };
  }, []);
  
  return allBreakpoints;
}

// Hook to get current device type
export function useDeviceType() {
  const breakpointStates = useBreakpoints();
  
  // Determine device type based on breakpoints
  if (breakpointStates["2xl"]) return 'desktop-large';
  if (breakpointStates.xl) return 'desktop';
  if (breakpointStates.lg) return 'laptop';
  if (breakpointStates.md) return 'tablet';
  if (breakpointStates.sm) return 'mobile-large';
  if (breakpointStates.xs) return 'mobile';
  return 'mobile-small';
}

// Hook for responsive values based on breakpoint
export function useResponsiveValue<T>(values: {
  base: T;
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
}): T {
  const breakpointStates = useBreakpoints();
  
  if (breakpointStates["2xl"] && values["2xl"] !== undefined) return values["2xl"];
  if (breakpointStates.xl && values.xl !== undefined) return values.xl;
  if (breakpointStates.lg && values.lg !== undefined) return values.lg;
  if (breakpointStates.md && values.md !== undefined) return values.md;
  if (breakpointStates.sm && values.sm !== undefined) return values.sm;
  if (breakpointStates.xs && values.xs !== undefined) return values.xs;
  return values.base;
}

// Simple mobile check
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoints.md);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

// Detect touch device
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkTouch = () => {
      setIsTouch(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
      );
    };
    
    checkTouch();
  }, []);
  
  return isTouch;
}

// Orientation detection (portrait vs landscape)
export function useOrientation() {
  const [orientation, setOrientation] = React.useState<'portrait' | 'landscape'>('portrait');
  
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setOrientation(
        window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
      );
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return orientation;
}

// Create a component that provides all responsive information to children
export const ResponsiveContext = React.createContext<{
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  orientation: 'portrait' | 'landscape';
  deviceType: string;
}>({
  isMobile: false,
  isTablet: false,
  isDesktop: false,
  isTouch: false,
  orientation: 'portrait',
  deviceType: 'desktop',
});

export function ResponsiveProvider({ children }: { children: React.ReactNode }) {
  // Use the consolidated hook to get all breakpoint states
  const breakpointStates = useBreakpoints();
  const isTouch = useIsTouchDevice();
  const orientation = useOrientation();
  
  // Calculate derived values based on breakpoint states
  const isMobile = !breakpointStates.sm;
  const isTablet = breakpointStates.md && !breakpointStates.lg;
  const isDesktop = breakpointStates.lg;
  
  // Determine device type based on breakpoint states
  const deviceType = 
    breakpointStates["2xl"] ? 'desktop-large' :
    breakpointStates.xl ? 'desktop' :
    breakpointStates.lg ? 'laptop' :
    breakpointStates.md ? 'tablet' :
    breakpointStates.sm ? 'mobile-large' :
    breakpointStates.xs ? 'mobile' : 'mobile-small';
  
  // Create memoized context value to prevent unnecessary renders
  const contextValue = React.useMemo(() => ({
    isMobile,
    isTablet,
    isDesktop,
    isTouch,
    orientation,
    deviceType,
  }), [
    isMobile,
    isTablet,
    isDesktop,
    isTouch,
    orientation,
    deviceType
  ]);
  
  return (
    <ResponsiveContext.Provider value={contextValue}>
      {children}
    </ResponsiveContext.Provider>
  );
}

export function useResponsive() {
  return React.useContext(ResponsiveContext);
}