
// types.d.ts - Global type declarations
import { Route } from "./components/layout/NavigationBar";

declare global {
  interface Window {
    navigateTo: (route: Route) => void;
    setUser: (user: any) => void;
    handleLogin: (userData?: any) => void;
    handleLogout: () => void;
  }
}

export {};
