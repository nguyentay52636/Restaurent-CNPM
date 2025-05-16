import React, { useEffect, useMemo, useState } from 'react';
import MenuItem from "@/modules/admin/components/Home/components/MenuItem";
import ActionsHome from "../components/ActionsHome";
import Pagination from '../components/PaginationMenu';
import { getAllProducts } from '@/lib/apis/productApi';
import { ProductWithId} from '@/lib/apis/types.'
import DetailsOrderHome from './DetailsOrderHome';
import CartPanel from '../components/CartPanel';
import ItemDetailPanel from '../components/ItemDetailPanel';
import { toast } from '@/components/ui/use-toast';
import { createOrder, getAllOrders } from '@/lib/apis/orderApi';
import { createOrderItem } from '@/lib/apis/orderItemApi';
import { getAllUserAPI } from '@/lib/apis/userApi';
import baseApi from '@/lib/apis/baseApi';
import { count } from 'console';
import { createPayment } from '@/lib/apis/paymentsApi';

interface CartItem extends ProductWithId {
  quantity: number;
  selectedSize?: { name: string, price: number };
}

const Product: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showDetailsOrder, setShowDetailsOrder] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<ProductWithId[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ProductWithId | null>(null);
  const [showItemDetail, setShowItemDetail] = useState(false);

  const itemsPerPage = 12;
  
  const filteredProducts = useMemo(() => {
  let filtered = products;

  if (selectedCategory !== 'All') {
    filtered = filtered.filter(product => product.categoryId === parseInt(selectedCategory));
  }

  if (searchTerm.trim() !== '') {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return filtered;
}, [products, selectedCategory, searchTerm]);


  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

  const addToCart = (item: ProductWithId, selectedSize?: { name: string, price: number }) => {
    const itemPrice = selectedSize ? selectedSize.price : item.price;

    const existingItemIndex = cart.findIndex(cartItem =>
      cartItem.id === item.id && cartItem.selectedSize?.name === selectedSize?.name
    );

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

  const closeCart = () => setIsCartOpen(false);

  const removeFromCart = (id: number, sizeName?: string) => {
    setCart(cart.filter(item =>
      !(item.id === id && item.selectedSize?.name === sizeName)
    ));
  };

  const incrementQuantity = (id: number, sizeName?: string) => {
    setCart(cart.map(item => {
      if (item.id === id && item.selectedSize?.name === sizeName) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    }));
  };

  const decrementQuantity = (id: number, sizeName?: string) => {
    setCart(cart.map(item => {
      if (item.id === id && item.selectedSize?.name === sizeName) {
        return { ...item, quantity: Math.max(1, item.quantity - 1) };
      }
      return item;
    }));
  };

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
  const handleReceivePaymentMethod = (method: string) => {
    setPaymentMethod(method); 
    console.log("Received method from DetailsOrderHome:", method);
    handleCheckout(method);
};
 const handleCheckout = async (method: string) => {
  try {
    if (cart.length === 0) {
      toast({
        title: "Lỗi",
        description: "Giỏ hàng đang trống.",
        variant: "destructive"
      });
      return;
    }

    const orderItems = cart.map(item => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    // Gửi đơn hàng
    const orderResponse = await createOrder({
      userId: 18,
      status: "ChoDuyet",
      orderItems: [], 
    });
    console.log("post order")
    const orderId = orderResponse.data.id;
    for (const item of orderItems) {
      await createOrderItem({
        orderId: orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    }
    console.log('method 2 :' + method)
    console.log("post order items")
    await createPayment({
      orderId: orderId,
      paymentMethod: method,
      amount: total,
      status:'ChoXacNhanThanhToan'
    })
    console.log("post payment")
    toast({
      title: "Đặt hàng thành công",
      description: "Cảm ơn bạn đã đặt hàng. Đơn đang chờ duyệt.",
    });

    setCart([]);
    setShowDetailsOrder(false);

  } catch (error) {
    console.error("Checkout error:", error);
    toast({
      title: "Lỗi",
      description: "Đặt hàng thất bại. Vui lòng thử lại.",
      variant: "destructive"
    });
  }
};



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
          onPaymentMethodSelect={handleReceivePaymentMethod}
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
          //  onConfirmOrder={handleCheckout}
        />
      ) : (
        <>
          <div className="flex">
            <div className={`flex-1 transition-all duration-300 ${isCartOpen ? 'mr-80' : ''}`}>
              <ActionsHome onCategorySelect={setSelectedCategory}
                onSearchChange={setSearchTerm} />
              <main className="max-w-7xl mx-auto p-6">
                <h2 className="text-xl font-semibold mb-6">Thực đơn đặc biệt dành cho bạn</h2>
                {loading ? (
                  <div className="text-center">Loading...</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {currentItems.map((item) => (
                      <MenuItem
                        key={item.id}
                        item={item}
                        onAddToCart={addToCart}

                      />
                    ))}
                  </div>
                )}
              </main>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
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

            {showItemDetail && selectedItem && (
              <ItemDetailPanel
                item={selectedItem}
                onClose={() => setShowItemDetail(false)}
                onAddToCart={(item, quantity, selectedSize) => {
                  const existingIndex = cart.findIndex(
                    (cartItem) =>
                      cartItem.id === item.id &&
                      (!selectedSize || cartItem.selectedSize?.name === selectedSize.name)
                  );
                  if (existingIndex >= 0) {
                    const updatedCart = [...cart];
                    updatedCart[existingIndex].quantity += quantity;
                    setCart(updatedCart);
                  } else {
                    setCart([
                      ...cart,
                      {
                        ...item,
                        quantity,
                        selectedSize,
                        price: selectedSize?.price || item.price,
                      },
                    ]);
                  }
                  setShowItemDetail(false);
                  setIsCartOpen(true);
                }}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
