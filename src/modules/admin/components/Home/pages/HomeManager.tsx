import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Bell } from 'lucide-react';

import CartPanel from '../components/CartPanel';
import DetailsOrderHome from './DetailsOrderHome';
import { MenuItem as MenuItemType, menuItems } from '../components/MenuData';
import MenuItem from '../components/MenuItem';

interface CartItem extends MenuItemType {
  quantity: number;
}

const HomeManager: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showDetailsOrder, setShowDetailsOrder] = useState(false);

  const addToCart = (item: MenuItemType) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const incrementQuantity = (id: number) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id: number) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
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

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {showDetailsOrder ? (
        <DetailsOrderHome
          cartItems={cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.imageUrl
          }))}
          subtotal={subtotal}
          tax={tax}
          total={total}
        />
      ) : (
        <>
          {/* Header */}
          <header className="bg-white shadow-sm p-4 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-1">
              <h1 className="text-2xl font-bold text-black">Point</h1>
              <h1 className="text-2xl font-bold text-orange-500">sell</h1>
            </div>

            {/* Search and Notification */}
            <div className="flex items-center space-x-4">
              <div className="relative w-64">
                <Input
                  type="text"
                  placeholder="Tìm kiếm món ăn..."
                  className="pl-10 w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              <Button variant="outline" size="icon" className="bg-orange-500 text-white hover:bg-orange-600">
                <Bell className="w-6 h-6" />
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto p-6">
            <h2 className="text-xl font-semibold mb-6">Thực đơn đặc biệt dành cho bạn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </main>

          {/* Sliding Cart Panel */}
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

          {/* Payment Selection Modal */}
          {/* <SelectPayment
            onSelectPayment={handlePaymentMethodSelect}
            onClose={() => setIsPaymentModalOpen(false)}
            open={isPaymentModalOpen}
            cart={cart}
            total={total}
          /> */}
        </>
      )}
    </div>
  );
};

export default HomeManager;