
import baseApi from "./baseApi";
import { categoryType } from "./types.";


export  const getCategories = async ()=> { 
try {
const {data} = await baseApi.get('/categories');
return data;
}catch(error) {
    throw error;
}
}
export  const getCategoryById = async (id: string)=> {  
try  {
const {data} = await baseApi.get(`/categories/${id}`);
return data;
}catch(error) { 
    throw error;
}
} 
export  const createCategory = async ({name}: categoryType)=> { 
const newCategory = {name};
try { 
const {data} = await baseApi.post('/categories',newCategory);
return data
}catch(error) { 
    throw error;
}
 } 

 export  const updateCategory = async (id: string, {name}: categoryType)=> { 
    const newCategory = {name};
try {
const {data} = await baseApi.patch(`/categories/${id}`,newCategory);
return data;
}catch(error)  { 
    throw error;
}
  } 
