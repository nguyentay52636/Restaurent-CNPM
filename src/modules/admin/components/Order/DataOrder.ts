export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image?: string;
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
