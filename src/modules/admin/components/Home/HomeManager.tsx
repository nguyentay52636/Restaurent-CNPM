import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Search, Bell, Minus, Plus, Trash2 } from 'lucide-react';
import SelectPayment from './components/SelectPayment';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  rating: number;
  imageUrl: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Grill Sandwich',
    price: 30.0,
    description: 'Beetroot, Potato, Bell Pepper, Sandwich Masala',
    rating: 5.0,
    imageUrl: '/images/images_foot/foot_2.png',
  },
  {
    id: 2,
    name: 'Chicken Popoyes',
    price: 20.0,
    description: 'Beetroot, Potato, Bell Pepper, Sandwich Masala',
    rating: 4.0,
    imageUrl: '/images/images_foot/foot_1.png',
  },
  {
    id: 3,
    name: 'Bison Burgers',
    price: 50.0,
    description: 'Beetroot, Potato, Bell Pepper, Sandwich Masala',
    rating: 2.0,
    imageUrl: '/images/images_foot/foot_3.png',
  },
  {
    id: 4,
    name: 'Grill Sandwich',
    price: 30.0,
    description: 'Beetroot, Potato, Bell Pepper, Sandwich Masala',
    rating: 5.0,
    imageUrl: '/images/images_foot/foot_4.png',
  },
  {
    id: 5,
    name: 'Chicken Popoyes',
    price: 20.0,
    description: 'Beetroot, Potato, Bell Pepper, Sandwich Masala',
    rating: 4.0,
    imageUrl: '/images/images_foot/foot_1.png',
  },
  {
    id: 6,
    name: 'Bison Burgers',
    price: 50.0,
    description: 'Beetroot, Potato, Bell Pepper, Sandwich Masala',
    rating: 2.0,
    imageUrl: '/images/images_foot/foot_4.png',
  },
  {
    id: 6,
    name: 'Bison Burgers',
    price: 50.0,
    description: 'Beetroot, Potato, Bell Pepper, Sandwich Masala',
    rating: 2.0,
    imageUrl: '/images/images_foot/foot_4.png',
  },
  {
    id: 6,
    name: 'Bison Burgers',
    price: 50.0,
    description: 'Beetroot, Potato, Bell Pepper, Sandwich Masala',
    rating: 2.0,
    imageUrl: '/images/images_foot/foot_4.png',
  },
  {
    id: 6,
    name: 'Bison Burgers',
    price: 50.0,
    description: 'Beetroot, Potato, Bell Pepper, Sandwich Masala',
    rating: 2.0,
    imageUrl: '/images/images_foot/foot_4.png',
  },
];

interface CartItem extends MenuItem {
  quantity: number;
}

const HomeManager: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const addToCart = (item: MenuItem) => {
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
    setIsPaymentModalOpen(true);
  };

  const handlePaymentMethodSelect = (method: string) => {
    // Here you would implement the actual payment processing logic
    console.log(`Processing payment with ${method} for total: $${total.toFixed(2)}`);

    // Clear cart and close modals after successful payment
    setCart([]);
    setIsPaymentModalOpen(false);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
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
              placeholder="Search Anything Here"
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
        <h2 className="text-xl font-semibold mb-6">Special Menu For You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <span className="text-orange-500 font-bold">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${index < Math.floor(item.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                        }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {item.rating.toFixed(1)}
                  </span>
                </div>
                <Button
                  onClick={() => addToCart(item)}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  + Add Product
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Sliding Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Order #{Math.floor(Math.random() * 1000000)}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeCart}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
          {cart.length === 0 ? (
            <p className="text-gray-500">No products added yet.</p>
          ) : (
            <div className="flex-1 space-y-4 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 border-b py-2"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="text-gray-600 text-sm">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => decrementQuantity(item.id)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => incrementQuantity(item.id)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Summary Section */}
          {cart.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600 font-semibold">Total</span>
                <span className="font-semibold text-lg">${total.toFixed(2)}</span>
              </div>
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600"
                onClick={handlePayment}
              >
                Thanh toán
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Payment Selection Modal */}
      <SelectPayment
        onSelectPayment={handlePaymentMethodSelect}
        onClose={() => setIsPaymentModalOpen(false)}
        open={isPaymentModalOpen}
      />
    </div>
  );
};

export default HomeManager;