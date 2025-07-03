import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { CheckIcon, XIcon, ChevronRightIcon, ThumbsUpIcon, ThumbsDownIcon, ExternalLinkIcon } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { toast } from "sonner";

interface Startup {
  id: string;
  name: string;
  logo: string;
  category: string;
  subcategory?: string;
  location: string;
  productCount?: number;
  foundedYear: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

interface StartupApprovalProps {
  startups: Startup[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onView?: (id: string) => void;
}

export function StartupApproval({ startups = [], onApprove = () => {}, onReject = () => {}, onView }: StartupApprovalProps) {
  const [items, setItems] = useState(startups);
  const [currentDragIndex, setCurrentDragIndex] = useState<number | null>(null);
  const [draggingDirection, setDraggingDirection] = useState<"left" | "right" | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const handleDragEnd = (index: number, direction: number) => {
    setCurrentDragIndex(null);
    setDraggingDirection(null);
    
    const threshold = 100; // Minimum drag distance to trigger action
    
    if (Math.abs(direction) > threshold) {
      const startup = items[index];
      
      if (direction > threshold) {
        // Dragged right - approve
        handleApprove(startup.id);
      } else if (direction < -threshold) {
        // Dragged left - reject
        handleReject(startup.id);
      }
    }
  };

  const handleApprove = (id: string) => {
    // Update local state
    setItems((prevItems) => 
      prevItems.map((item) => 
        item.id === id ? { ...item, status: "approved" } : item
      )
    );
    
    // Call parent handler
    onApprove(id);
    
    // Show toast
    toast.success("Startup approved", {
      description: "The startup has been approved and is now visible on the marketplace.",
    });
  };

  const handleReject = (id: string) => {
    // Update local state
    setItems((prevItems) => 
      prevItems.map((item) => 
        item.id === id ? { ...item, status: "rejected" } : item
      )
    );
    
    // Call parent handler
    onReject(id);
    
    // Show toast
    toast.error("Startup rejected", {
      description: "The startup has been rejected and notified.",
    });
  };

  const toggleExpandItem = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const getSwipeHintColor = (direction: "left" | "right" | null, index: number) => {
    if (currentDragIndex !== index) return "bg-transparent";
    
    if (direction === "right") {
      return "bg-success/10 border-success/20";
    }
    
    if (direction === "left") {
      return "bg-destructive/10 border-destructive/20";
    }
    
    return "bg-transparent";
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Startup Registration Approval</h3>
        <div className="text-sm text-muted-foreground hidden sm:flex items-center">
          <span className="inline-flex items-center mr-4">
            <span className="bg-green-500/20 w-2 h-2 rounded-full mr-1"></span> 
            Swipe right to approve
          </span>
          <span className="inline-flex items-center">
            <span className="bg-destructive/20 w-2 h-2 rounded-full mr-1"></span> 
            Swipe left to reject
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {items.filter(item => item.status === "pending").map((startup, index) => (
          <motion.div
            key={startup.id}
            className="relative overflow-hidden"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragStart={() => setCurrentDragIndex(index)}
            onDrag={(_, info) => {
              if (info.offset.x > 50) {
                setDraggingDirection("right");
              } else if (info.offset.x < -50) {
                setDraggingDirection("left");
              } else {
                setDraggingDirection(null);
              }
            }}
            onDragEnd={(_, info) => handleDragEnd(index, info.offset.x)}
          >
            <div className={`absolute inset-0 flex items-center px-8 transition-opacity duration-200 ${
              currentDragIndex === index && draggingDirection === "right" 
                ? "opacity-100" 
                : "opacity-0"
            }`}>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-success/20 text-success">
                <ThumbsUpIcon className="h-6 w-6" />
              </div>
              <div className="ml-4 text-success font-medium">Approve</div>
            </div>
            
            <div className={`absolute inset-0 flex items-center justify-end px-8 transition-opacity duration-200 ${
              currentDragIndex === index && draggingDirection === "left" 
                ? "opacity-100" 
                : "opacity-0"
            }`}>
              <div className="text-destructive font-medium mr-4">Reject</div>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-destructive/20 text-destructive">
                <ThumbsDownIcon className="h-6 w-6" />
              </div>
            </div>
            
            <Card className={`border transition-all ${
              getSwipeHintColor(draggingDirection, index)
            } ${expandedItem === startup.id ? 'border-primary/30' : ''}`}>
              <CardContent className={`p-5 ${expandedItem === startup.id ? 'pb-3' : ''}`}>
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 border">
                    <AvatarImage src={startup.logo} alt={startup.name} />
                    <AvatarFallback>{startup.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold flex items-center">
                          {startup.name}
                          <button 
                            className="ml-2 text-muted-foreground hover:text-primary transition-colors"
                            onClick={() => toggleExpandItem(startup.id)}
                          >
                            <ChevronRightIcon 
                              className={`h-4 w-4 transition-transform ${
                                expandedItem === startup.id ? 'rotate-90' : ''
                              }`} 
                            />
                          </button>
                        </h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Badge variant="outline" className="mr-2 bg-accent/50">{startup.category}</Badge>
                          <span>{startup.location}</span>
                        </div>
                      </div>
                      
                      <div className="hidden sm:block text-sm text-right">
                        <div className="font-medium">Founded {startup.foundedYear}</div>
                        <div className="text-muted-foreground">Submitted {startup.submittedAt}</div>
                      </div>
                    </div>

                    {expandedItem === startup.id && (
                      <div className="mt-4 space-y-3 text-sm">
                        <p className="text-muted-foreground">{startup.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {startup.subcategory && (
                            <Badge variant="secondary" className="bg-tertiary/10 text-tertiary border-tertiary/20">
                              {startup.subcategory}
                            </Badge>
                          )}
                          {startup.productCount && (
                            <Badge variant="secondary" className="bg-muted border-muted-foreground/20">
                              {startup.productCount} products
                            </Badge>
                          )}
                        </div>
                        
                        <div className="pt-2 flex items-center">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mr-auto" 
                            onClick={() => onView && onView(startup.id)}
                          >
                            <ExternalLinkIcon className="h-3.5 w-3.5 mr-1" />
                            View Full Profile
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {expandedItem !== startup.id && (
                      <div className="flex items-center justify-between mt-3">
                        <div className="sm:hidden text-xs text-muted-foreground">
                          Submitted {startup.submittedAt}
                        </div>
                        
                        <div className="flex gap-2 ml-auto">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-destructive/30 hover:border-destructive hover:bg-destructive/10 text-destructive"
                            onClick={() => handleReject(startup.id)}
                          >
                            <XIcon className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button 
                            size="sm"
                            className="border-success/30 hover:border-success hover:bg-success/10 text-success"
                            onClick={() => handleApprove(startup.id)}
                          >
                            <CheckIcon className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              
              {expandedItem === startup.id && (
                <CardFooter className="flex justify-end gap-2 pt-0 pb-4">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-destructive/30 hover:border-destructive hover:bg-destructive/10 text-destructive"
                    onClick={() => handleReject(startup.id)}
                  >
                    <XIcon className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                  <Button 
                    size="sm"
                    className="border-success/30 hover:border-success hover:bg-success/10 text-success"
                    onClick={() => handleApprove(startup.id)}
                  >
                    <CheckIcon className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                </CardFooter>
              )}
            </Card>
          </motion.div>
        ))}
        
        {items.filter(item => item.status === "pending").length === 0 && (
          <Card className="border-dashed">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <div className="rounded-full bg-muted p-3 mb-3">
                <CheckIcon className="h-6 w-6 text-success" />
              </div>
              <h4 className="text-lg font-medium mb-1">All caught up!</h4>
              <p className="text-muted-foreground">There are no pending startups to review.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {items.some(item => item.status !== "pending") && (
        <>
          <Separator className="my-6" />
          
          <h3 className="text-lg font-semibold mb-4">Recent Actions</h3>
          
          <div className="grid grid-cols-1 gap-3">
            {items.filter(item => item.status !== "pending").map((startup) => (
              <Card key={startup.id} className={startup.status === "approved" ? "border-success/30" : "border-destructive/30"}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={startup.logo} alt={startup.name} />
                      <AvatarFallback>{startup.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{startup.name}</h4>
                        <Badge variant={startup.status === "approved" ? "outline" : "destructive"}>
                          {startup.status === "approved" ? "Approved" : "Rejected"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{startup.category} • {startup.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}