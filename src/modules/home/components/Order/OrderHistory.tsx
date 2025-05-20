import React, { useEffect, useState } from "react";
import { getOrdersByUserId } from "@/lib/apis/orderApi";
import { selectAuth } from "@/redux/slices/authSlice";
import { useAppSelector } from "@/redux/hooks/hooks";
import { mockOrders } from "./Order";
interface Order {
  id: number;
  status: string;
  userId: number;
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

const productMap: Record<number, { name: string; image: string }> = {
  101: { name: "Bánh mì bò nướng", image: "https://source.unsplash.com/80x80/?banhmi" },
  102: { name: "Trà sữa trân châu", image: "https://source.unsplash.com/80x80/?trasua" },
  103: { name: "Cơm gà xối mỡ", image: "https://source.unsplash.com/80x80/?comga" },
  104: { name: "Nước cam ép", image: "https://source.unsplash.com/80x80/?orangejuice" },
};

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAppSelector(selectAuth);
  useEffect(() => {
    // Giả lập fetch data
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 500); // Giả delay 0.5 giây
  }, []);
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await getOrdersByUserId(user?.id); // Gọi API
  //       setOrders(response.data);
  //     } catch (error) {
  //       console.error("Error fetching orders:", error);
  //       setError("Không thể tải đơn hàng. Vui lòng thử lại sau.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (user?.id) {
  //     fetchOrders();
  //   } else {
  //     setLoading(false); // không có user => không cần fetch
  //   }
  // }, [user?.id]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Lịch sử đơn hàng</h1>

      {loading ? (
        <p>Đang tải đơn hàng...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
      ) : (
        orders.map((order) => {
          const total = order.orderItems.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0
          );

          return (
            <div key={order.id} className="border p-4 mb-6 bg-white rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Đơn hàng #{order.id}</h2>
                <span className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString("vi-VN")}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Trạng thái: {order.status}</p>
              <div className="space-y-2 mb-4">
                {order.orderItems.map((item) => {
                  const product = productMap[item.productId] || {
                    name: "Sản phẩm không xác định",
                    image: "",
                  };

                  return (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">
                          SL: {item.quantity} × {item.price.toLocaleString("vi-VN")} đ
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-right font-semibold text-orange-600">
                Tổng: {total.toLocaleString("vi-VN")} đ
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
