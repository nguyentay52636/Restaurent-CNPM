export interface Product {
  id: number;
  name: string;
  description: string;
  price: number | string; // nếu bạn muốn giữ nguyên từ API (price là string), hoặc ép sang number nếu đã xử lý
  quantity: number;
  categoryId: number;
  image?: string;
  productSizes: any[]; // hoặc bạn có thể khai báo rõ hơn nếu biết structure
  status: 'active' | 'inactive'; // hoặc string nếu status có nhiều giá trị khác
  createdAt: string; // hoặc Date nếu đã parse
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  product: Product;
}

export interface User {
  id: number;
  email: string;
  fullName: string;
  address: string;
}

export interface Order {
  id: number;
  userId: number;
  status: string;
  createdAt: string;
  user: User;
  orderItems: OrderItem[];
}
