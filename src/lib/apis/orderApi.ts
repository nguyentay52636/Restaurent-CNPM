import baseApi from "./baseApi";


export const getOrders = async ()=> { 
    try {
const {data} = await baseApi.get('/orders');
return data;
    }catch(error) { 
        throw error;
    }
}

export const getOrderById = async ({})=> { 
try { 
}catch(error) { 
 throw error
}
}
