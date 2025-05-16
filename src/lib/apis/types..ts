export interface IAPIResponseWrapper<T> {
  statusCode: number;
  message: string;
  data: T;
}
export interface categoryType {
  name: string;
}
export interface IUserDataType {
  id?: number;
  fullName?: string;
  email: string;
  roleId: number | Role;
  phone?: string;
  password?: string;
  address?: string;
  points?: number;
}

export interface Role {
  id: number;
  name: string;
}

export interface IReservationDataType {
  customerName: string;
  reservationDate: string;
  tableNumber: number;
  note: string;
}
export interface IReviewDataType {
  productId: number;
  userId: string;
  rating: number;
  comment: string;
}
export interface ProductType {
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
  status: string;
  file?: File;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

<<<<<<< HEAD
export interface ProductWithId extends ProductType {
  id: number;
  categoryId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
=======
 export interface ProductWithId extends ProductType {
    id: number;
    categoryId: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    availableSizes?: { name: string; price: number }[];
>>>>>>> 6925611 (tay:update ItemMenu)
}
<<<<<<< HEAD
export interface OrderType {
  userId: number;
  totalPrice: number;
  status: string;
  orderItems: OrderItemType[];
  earnedPoints: number;
}

export interface OrderItemType {
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
}
export interface PaymentType {
  orderId: number;
  paymentMethod: string;
  amount: number;
  status: string;
}

export interface IAPILoginType {
  user: IUserDataType;
  accessToken: string;
  refreshToken: string;
}
=======
export interface OrderItemType { 
  orderId : number ; 
  productId : number ; 
  quantity : number ; 
  price : number ; 
  
  }
export interface OrderType { 
  userId : number ;
   totalPrice : number ; 
   status : string ;
    orderItems : OrderItemType[] ; 
   
  }


 export interface PaymentType { 
  orderId :number ; 
  paymentMethod : string;
  amount : number; 
  status : string ; 
 }
<<<<<<< HEAD
>>>>>>> 1f02be1 (new update)
=======
 
>>>>>>> 6925611 (tay:update ItemMenu)
