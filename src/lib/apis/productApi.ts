import baseApi from "./baseApi";
import { ProductType } from "./types.";

export const getAllProducts = async () => {  
try {
    const { data } = await baseApi.get("/products");
    return data;
} catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
}
} 
<<<<<<< HEAD
export const createProduct = async ({name , description , price , image , categoryId , status}: ProductType)=> { 
    try {
        const newProduct : ProductType = { 
            name,
            description,
            price,
            image,
            categoryId,
            status,
           
        }
        const { data } = await baseApi.post("/products", newProduct);
        return data;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : String(error));
=======
export const createProduct = async ({
  name,
  description,
  price,
  image,
  categoryId,
  status,
  file
}: ProductType) => {
  try {
    let imageUrl = image;

    // Nếu có file, upload file trước
    if (file) {
      const apiUrl = import.meta.env.VITE_API_URL as string;
      const uploadUrl = apiUrl.replace(/\/api\/?$/, '') + '/upload';
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      imageUrl = result.data?.image || image; // Ưu tiên link ảnh trả về từ backend
>>>>>>> 1f203bb463135dac1bd99904c9a604c0b952e066
    }

    // Gửi thông tin sản phẩm (không gửi file)
    const newProduct: ProductType = {
      name,
      description,
      price,
      image: imageUrl,
      categoryId,
      status,
    };

    const { data } = await baseApi.post("/products", newProduct);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const updateProduct = async (id: number, { name , description , price , image , categoryId , status}: ProductType)=> { 
    try {
        const updateProduct : ProductType = {  
            name,
            description,
            price,
            image,
            categoryId,
            status,
        } 
        const { data } = await baseApi.patch(`/products/${id}`, updateProduct);
        return data;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
 } 
 export const deleteProduct = async (id: number)=> {  
    try {
        const { data } = await baseApi.delete(`/products/${id}`);
        return data;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
 } 