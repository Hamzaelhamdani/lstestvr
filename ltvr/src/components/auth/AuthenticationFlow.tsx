import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { UserIcon, Building2Icon, User2Icon, RocketIcon, AlertCircle } from "lucide-react";
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert, AlertDescription } from "../ui/alert";

interface DecodedToken {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  exp: number;
  iss: string;
  aud: string;
}

// Add User interface
interface User {
  id?: string;
  email: string;
  displayName: string;
  role: string;
  avatar?: string;
  logoPath?: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id?: string;
    email: string;
    displayName: string;
    role: string;
    avatar?: string;
    logoPath?: string;
  };
  message?: string;
}

interface AuthenticationFlowProps {
  onLogin?: (userData?: any) => void;
}

export function AuthenticationFlow({ onLogin }: AuthenticationFlowProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/';

  const [activeTab, setActiveTab] = useState("signin");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    telephone: "",
    country: ""
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    
    if (type === "file" && files && files.length > 0) {
      setLogoFile(files[0]);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    // Mock login logic
    setTimeout(() => {
      setIsLoading(false);
      if (formData.email && formData.password) {
        if (onLogin) {
          onLogin({
            name: formData.name || "Demo User",
            email: formData.email,
            avatar: "",
            role: selectedRole || "client"
          });
        }
        navigate(from, { replace: true });
      } else {
        setErrorMessage("Login failed. Please enter email and password.");
      }
    }, 1000);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      setErrorMessage("Please select a role");
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    // Mock signup logic
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("Registration successful! You can now log in.");
      setActiveTab("signin");
      setFormData(prev => ({
        ...prev,
        password: "",
        name: "",
        telephone: "",
        country: ""
      }));
      setLogoFile(null);
    }, 1000);
  };

  const roles = [
    { id: "client", name: "Client", icon: UserIcon, description: "Browse and purchase from startups" },
    { id: "startup", name: "Startup", icon: RocketIcon, description: "Create storefront and sell products/services" },
    { id: "Accelerateur/Incubateur", name: "Accelerateur/Incubateur", icon: Building2Icon, description: "Promote startups and earn commissions" }
  ];

  return (
    <div className="container max-w-md mx-auto py-12 px-4">
      <Card className="border border-border bg-[rgba(255,255,255,0.03)]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Welcome to VenturesRoom</CardTitle>
          <CardDescription className="text-center">
            {activeTab === "signin" ? "Sign in to your account" : "Create a new account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              {errorMessage && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-transparent text-white placeholder:text-white/40 border-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="bg-transparent text-white placeholder:text-white/40 border-white/20"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              {errorMessage && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              {successMessage && (
                <Alert className="mb-4 bg-green-100 text-green-800 border-green-200">
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    type="text" 
                    placeholder="Your name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input 
                    id="email-signup" 
                    name="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input 
                    id="password-signup" 
                    name="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={formData.password}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telephone">Telephone (optional)</Label>
                  <Input 
                    id="telephone" 
                    name="telephone" 
                    type="tel" 
                    placeholder="+123456789" 
                    value={formData.telephone}
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country (optional)</Label>
                  <Input 
                    id="country" 
                    name="country" 
                    type="text" 
                    placeholder="Your country" 
                    value={formData.country}
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="space-y-2">
                  <Label>I am a...</Label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    {roles.map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                          selectedRole === role.id
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-accent/50 hover:border-primary/50 hover:bg-primary/5"
                        }`}
                      >
                        <role.icon className="h-6 w-6 mb-2" />
                        <span className="text-xs font-medium">{role.name}</span>
                      </button>
                    ))}
                  </div>
                  {selectedRole && (
                    <p className="text-xs text-muted-foreground mt-2">
                      {roles.find(r => r.id === selectedRole)?.description}
                    </p>
                  )}
                  
                  {/* Champ de téléchargement de logo pour les startups */}
                  {selectedRole === "startup" && (
                    <div className="space-y-2 mt-4 p-3 border border-primary/20 rounded-lg bg-primary/5">
                      <Label htmlFor="logo" className="flex items-center gap-2">
                        <RocketIcon className="h-4 w-4 text-primary" />
                        <span>Logo de votre startup</span>
                      </Label>
                      <Input
                        id="logo"
                        name="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                      {logoFile && (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="w-10 h-10 bg-background rounded-md overflow-hidden border flex items-center justify-center">
                            <img 
                              src={URL.createObjectURL(logoFile)} 
                              alt="Logo preview" 
                              className="max-w-full max-h-full object-contain" 
                            />
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {logoFile.name} ({Math.round(logoFile.size / 1024)} KB)
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <svg className="mr-2 h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
              Facebook
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
