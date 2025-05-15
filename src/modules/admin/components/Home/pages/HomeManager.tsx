import React, { useState, useMemo, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

import CartPanel from '../components/CartPanel';
import DetailsOrderHome from './DetailsOrderHome';
import MenuItem from '../components/MenuItem';
import ActionsHome from '../components/ActionsHome';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { getAllProducts } from '@/lib/apis/productApi';
import { ProductWithId } from '@/lib/apis/types.';


interface CartItem extends ProductWithId {
  quantity: number;
  selectedSize?: { name: string, price: number };
}

const HomeManager: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showDetailsOrder, setShowDetailsOrder] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<ProductWithId[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter(product => product.categoryId === parseInt(selectedCategory));
  }, [products, selectedCategory]);

  // Calculate pagination data
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredProducts]);

  const addToCart = (item: ProductWithId, selectedSize?: { name: string, price: number }) => {
    const cartItemKey = selectedSize ? `${item.id}-${selectedSize.name}` : `${item.id}`;
    const itemPrice = selectedSize ? selectedSize.price : item.price;

    const existingItemIndex = cart.findIndex(cartItem => {
      if (selectedSize) {
        return cartItem.id === item.id && cartItem.selectedSize?.name === selectedSize.name;
      }
      return cartItem.id === item.id;
    });

    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...item,
          quantity: 1,
          selectedSize,
          price: itemPrice
        }
      ]);
    }
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const removeFromCart = (id: number, sizeName?: string) => {
    if (sizeName) {
      // For drinks, remove specific size variation
      setCart(cart.filter(
        item => !(item.id === id && item.selectedSize?.name === sizeName)
      ));
    } else {
      // For other items
      setCart(cart.filter(item => item.id !== id));
    }
  };

  const incrementQuantity = (id: number, sizeName?: string) => {
    setCart(
      cart.map(item => {
        if (sizeName) {
          // For drinks with size
          if (item.id === id && item.selectedSize?.name === sizeName) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        } else {
          // For other items
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }
      })
    );
  };

  const decrementQuantity = (id: number, sizeName?: string) => {
    setCart(
      cart.map(item => {
        if (sizeName) {
          // For drinks with size
          if (item.id === id && item.selectedSize?.name === sizeName) {
            return { ...item, quantity: Math.max(1, item.quantity - 1) };
          }
          return item;
        } else {
          // For other items
          if (item.id === id) {
            return { ...item, quantity: Math.max(1, item.quantity - 1) };
          }
          return item;
        }
      })
    );
  };

  // Calculate subtotal, tax, and total
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxRate = 0.1;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handlePayment = () => {
    if (cart.length === 0) return;
    setShowDetailsOrder(true);
    setIsCartOpen(false);
  };

  const handleOrderComplete = () => {
    setShowDetailsOrder(false);
    toast({
      title: "Thành công",
      description: "Đã quay lại trang chọn món. Các món đã chọn vẫn được giữ nguyên.",
    });
  };

  // Pagination control handlers
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const goToPrevPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {showDetailsOrder ? (
        <DetailsOrderHome
          cartItems={cart.map(item => ({
            id: item.id,
            name: item.selectedSize
              ? `${item.name} (Size ${item.selectedSize.name})`
              : item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
          }))}
          subtotal={subtotal}
          tax={tax}
          total={total}
          onReset={handleOrderComplete}
          setIsCartOpen={setIsCartOpen}
          onRemoveItem={(itemId) => {
            removeFromCart(itemId);
            if (cart.length === 1) {
              setShowDetailsOrder(false);
            }
          }}
          onUpdateQuantity={(itemId, newQuantity) => {
            setCart(cart.map(item =>
              item.id === itemId
                ? { ...item, quantity: newQuantity }
                : item
            ));
          }}
        />
      ) : (
        <div className="flex">
          <div className={`flex-1 transition-all duration-300 ${isCartOpen ? 'mr-80' : ''}`}>
            <ActionsHome onCategorySelect={setSelectedCategory} />

            <main className="max-w-7xl mx-auto p-6">
              <h2 className="text-xl font-semibold mb-6">Thực đơn đặc biệt dành cho bạn</h2>
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedItems.map((item) => (
                      <MenuItem
                        key={item.id}
                        item={item}
                        onAddToCart={addToCart}
                      />
                    ))}
                  </div>

                  {filteredProducts.length > itemsPerPage && (
                    <div className="flex items-center justify-center space-x-2 mt-8">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={goToFirstPage}
                        disabled={currentPage === 1}
                        className="h-8 w-8 p-0"
                      >
                        <ChevronsLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        className="h-8 w-8 p-0"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>

                      <div className="flex items-center space-x-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum = currentPage - 2 + i;
                          if (currentPage < 3) {
                            pageNum = 1 + i;
                          } else if (currentPage > totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          }
                          if (pageNum < 1 || pageNum > totalPages) return null;

                          return (
                            <Button
                              key={pageNum}
                              variant={currentPage === pageNum ? "default" : "outline"}
                              size="icon"
                              onClick={() => goToPage(pageNum)}
                              className={`h-8 w-8 p-0 ${currentPage === pageNum ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
                            >
                              {pageNum}
                            </Button>
                          );
                        })}
                      </div>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="h-8 w-8 p-0"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={goToLastPage}
                        disabled={currentPage === totalPages}
                        className="h-8 w-8 p-0"
                      >
                        <ChevronsRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>

          <CartPanel
            isCartOpen={isCartOpen}
            closeCart={closeCart}
            cart={cart}
            subtotal={subtotal}
            tax={tax}
            total={total}
            decrementQuantity={decrementQuantity}
            incrementQuantity={incrementQuantity}
            removeFromCart={removeFromCart}
            handlePayment={handlePayment}
          />
        </div>
      )}
    </div>
  );
};

export default HomeManager;