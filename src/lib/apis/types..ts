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
  customerName : string; 
  reservationDate : string; 
  tableNumber : number; 
  note :string
}
export interface IReviewDataType { 
    productId: number;
    userId: string;
    rating: number;
  comment : string
} 
export interface ProductType { 
  name : string; 
  description : string; 
  price : number; 
  image : string; 
  categoryId : number; 
  status : string; 
}