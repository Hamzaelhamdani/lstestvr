import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { StarIcon, ShoppingBagIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface Product {
  id: number;
  name: string;
  description: string;
  categoryId: string;
  type: string;
  sellerId: string;
  images: string[];
  createdByUserId: string;
  originalPrice: number;
  discountedPrice: number;
}

export function BestProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('http://localhost:5139/api/Product');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }

      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No products available');
      }
      
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === products.length - 3 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? products.length - 3 : prev - 1));
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="w-10 h-10 rounded-full bg-[#8A4FFF]/10 flex items-center justify-center mx-auto mb-4">
          <ShoppingBagIcon className="h-5 w-5 text-[#8A4FFF] animate-pulse" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Loading Products...</h3>
        <p className="text-gray-400">Please wait while we fetch the latest products</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold text-red-500 mb-4">Error Loading Products</h3>
        <p className="text-gray-400 mb-6">{error}</p>
        <Button 
          variant="outline"
          className="bg-white/5 hover:bg-white/10 border-gray-800"
          onClick={fetchProducts}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#8A4FFF]/10 flex items-center justify-center mr-4">
            <ShoppingBagIcon className="h-5 w-5 text-[#8A4FFF]" />
          </div>
          <h3 className="text-2xl font-bold text-white">Best Products & Services</h3>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white/5 border-gray-800 hover:bg-white/10 hover:border-[#8A4FFF]/50 rounded-full h-10 w-10"
            onClick={prevSlide}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white/5 border-gray-800 hover:bg-white/10 hover:border-[#8A4FFF]/50 rounded-full h-10 w-10"
            onClick={nextSlide}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * (100 / products.length) * 3}%)` }}
        >
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="min-w-[calc(100%-1rem)] sm:min-w-[calc(50%-1rem)] md:min-w-[calc(33.333%-1rem)] px-2"
            >
              <motion.div 
                className="startup-card bg-[#0c131d]/80 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden h-full"
                whileHover={{ y: -5 }}
              >
                <div className="relative">
                  <ImageWithFallback
                    src={`http://localhost:5139${product.images[0]}`}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    width={400}
                    height={200}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-black/50 backdrop-blur-sm text-white border-0">
                      {product.type || 'Product'}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-[#8A4FFF] text-white border-0 flex items-center">
                      <StarIcon className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {product.description || 'No description available'}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-[#8A4FFF]/10 text-[#8A4FFF] px-2 py-1 rounded-full">
                      {product.categoryId}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm font-bold text-[#8A4FFF]">
                        ${product.discountedPrice}
                        {product.discountedPrice < product.originalPrice && (
                          <span className="text-sm text-gray-500 ml-2 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </span>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="text-xs bg-[#8A4FFF] hover:bg-[#7A3FFE] text-white border-0"
                      onClick={() => window.navigateTo?.('marketplace')}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}