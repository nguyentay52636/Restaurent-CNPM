import baseApi from "./baseApi"
export type ProductStatus = "in_stock" | "out_of_stock" | "running_low";

export interface ProductType { 
   name: string; 
   description: string; 
   price: number; 
   category_id: number; 
   status: ProductStatus; // status chỉ là 1 string enum
}

export interface ProductSize { 
   size: string; 
   price: number;
   quantity: number; 
}


export const getProducts = async ()=> { 
    try {
const {data} = await baseApi.get('/products');
return data;
    }catch(error) { 
        throw error
    }
}
export const createProduct = async ({name , description , price , category_id , status}: ProductType)=> { 
    try {
const newProduct = {name , description , price , category_id , status};
const {data} = await baseApi.post('/products',newProduct);
return data;
    }catch(error) {  
        throw error
    } 
} 

