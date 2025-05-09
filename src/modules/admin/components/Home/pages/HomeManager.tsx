import React, { useState, useMemo } from 'react';

import CartPanel from '../components/CartPanel';
import DetailsOrderHome from './DetailsOrderHome';
import { MenuItem as MenuItemType, menuItems } from '../components/MenuData';
import MenuItem from '../components/MenuItem';
import ActionsHome from '../components/ActionsHome';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface CartItem extends MenuItemType {
  quantity: number;
  selectedSize?: { name: string, price: number };
}

const HomeManager: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showDetailsOrder, setShowDetailsOrder] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Calculate pagination data
  const totalPages = Math.ceil(menuItems.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return menuItems.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage]);

  const addToCart = (item: MenuItemType, selectedSize?: { name: string, price: number }) => {
    // Generate a unique key for the cart item based on id and size
    const isDrink = item.category === 'Drink';
    const cartItemKey = isDrink && selectedSize
      ? `${item.id}-${selectedSize.name}`
      : `${item.id}`;

    // Use the price of the selected size for drinks
    const itemPrice = isDrink && selectedSize
      ? selectedSize.price
      : item.price;

    // Check if the item (with the same size for drinks) already exists in cart
    const existingItemIndex = cart.findIndex(cartItem => {
      if (isDrink && selectedSize) {
        return (
          cartItem.id === item.id &&
          cartItem.selectedSize?.name === selectedSize.name
        );
      }
      return cartItem.id === item.id;
    });

    if (existingItemIndex >= 0) {
      // Item already exists in cart, update quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Add new item to cart
      setCart([
        ...cart,
        {
          ...item,
          quantity: 1,
          selectedSize,
          price: itemPrice // Use the price based on size for drinks
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
  const taxRate = 0.1; // 10% tax rate
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handlePayment = () => {
    if (cart.length === 0) return;
    setShowDetailsOrder(true);
    setIsCartOpen(false);
  };

  // Handle resetting the cart after a completed order
  const handleOrderComplete = () => {
    // Reset cart and return to menu
    setCart([]);
    setShowDetailsOrder(false);
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
            image: item.imageUrl
          }))}
          subtotal={subtotal}
          tax={tax}
          total={total}
          onReset={handleOrderComplete}
        />
      ) : (
        <div className="flex">
          {/* Main Content */}
          <div className={`flex-1 transition-all duration-300 ${isCartOpen ? 'mr-80' : ''}`}>
            {/* Header */}
            <ActionsHome />

            <main className="max-w-7xl mx-auto p-6">
              <h2 className="text-xl font-semibold mb-6">Thực đơn đặc biệt dành cho bạn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedItems.map((item) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {menuItems.length > itemsPerPage && (
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
                      // Show current page plus 2 pages before and after, but not more than totalPages
                      let pageNum = currentPage - 2 + i;

                      // Adjust if we're at the start or end
                      if (currentPage < 3) {
                        pageNum = 1 + i;
                      } else if (currentPage > totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      }

                      // Ensure we don't show pages below 1 or above totalPages
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
            </main>
          </div>

          {/* Cart Panel */}
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