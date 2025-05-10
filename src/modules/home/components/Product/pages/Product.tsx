import React, { useState } from 'react';
import MenuItem from "@/modules/admin/components/Home/components/MenuItem";
import ActionsHome from "../components/ActionsHome";
import Pagination from '../components/PaginationMenu';
import { MenuItem as MenuItemType, menuItems } from '../components/MenuData';
import DetailsOrderHome from './DetailsOrderHome';
import CartPanel from '../components/CartPanel';
import ItemDetailPanel from '../components/ItemDetailPanel';
const ITEMS_PER_PAGE = 9;
interface CartItem extends MenuItemType {
  quantity: number;
}
const Product: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(menuItems.length / ITEMS_PER_PAGE);
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const [showItemDetail, setShowItemDetail] = useState(false);
  const currentItems = menuItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
      {showDetailsOrder ? (<DetailsOrderHome
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
            ):(
              <>
              <ActionsHome />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%] px-6 py-4 mx-auto">
                {currentItems.map((item) => (
                  <MenuItem key={item.id} item={item} onAddToCart={() => {
                    setSelectedItem(item);
                    setShowItemDetail(true);
                  }} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
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
                handlePayment={handlePayment}/>

                {showItemDetail && selectedItem && (
                <ItemDetailPanel
                  item={selectedItem}
                  onClose={() => setShowItemDetail(false)}
                  onAddToCart={(item, quantity) => {
                    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
                    if (existingItem) {
                      setCart(
                        cart.map((cartItem) =>
                          cartItem.id === item.id
                            ? { ...cartItem, quantity: cartItem.quantity + quantity }
                            : cartItem
                        )
                      );
                    } else {
                      setCart([...cart, { ...item, quantity }]);
                    }
                    setIsCartOpen(true);
                  }}
                />
              )}
              </>
              
            )}
      
    </div>
  );
};
export default Product;
