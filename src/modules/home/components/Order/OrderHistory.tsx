import React, { useEffect, useState } from "react";
import { getOrdersByUserId } from "@/lib/apis/orderApi";
import { selectAuth } from "@/redux/slices/authSlice";
import { useAppSelector } from "@/redux/hooks/hooks";

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



export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAppSelector(selectAuth);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getOrdersByUserId(user?.id);
        setOrders(response.data);
        console.log("body: " + response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Không thể tải đơn hàng. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="justify-between">
        <h1 className="text-2xl font-bold mb-6">Lịch sử đơn hàng</h1>
      </div>
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
              <p className="text-sm mb-2">
                Trạng thái:{" "}
                <span
                  className={
                    order.status === "ChoDuyet"
                      ? "text-yellow-500 font-semibold"
                      : order.status === "DaHuy"
                        ? "text-red-500 font-semibold"
                        : order.status === "DaXacNhan"
                          ? "text-green-600 font-semibold"
                          : "text-gray-600"
                  }
                >
                  {order.status === "ChoDuyet"
                    ? "Chờ Duyệt"
                    : order.status === "DaHuy"
                      ? "Đã Hủy"
                      : order.status === "DaXacNhan"
                        ? "Đã Xác Nhận"
                        : order.status}
                </span>
              </p>
              <div className="space-y-2 mb-4">
                {order.orderItems.map((item) => {
                  const product = (item as any).product || {
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
                          SL: {item.quantity} × {Number(item.price).toLocaleString("vi-VN")} đ
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
