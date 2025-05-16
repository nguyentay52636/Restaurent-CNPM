import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { getAllProducts } from "@/lib/apis/productApi";

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
}

const HeroSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getAllProducts();
        const products: Product[] = response.data;

        
        const product = products.find((prod) => prod.id == 33);

        if (product) {
          setSelectedProduct(product); 
        } else {
          console.error("Product with id 33 not found");
        }
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    fetchProduct();
  }, []);

  if (!selectedProduct) {
    return <div>Loading...</div>; 
  }

  return (
    <section
      className="min-h-[80vh] px-6 flex flex-col md:flex-row items-center justify-center md:gap-8"
      style={{
        backgroundImage: `url(${selectedProduct.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex-1 space-y-6 md:pr-4 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-black ml-[100px]">
          <span className="text-orange-500">Nhanh <span className='text-black'>và</span> Ngon</span>
          <br />
          <span className="text-orange-500">Giao Hàng <span className='text-black'>với</span> tốc độ</span>
          <br />
          <span className="text-orange-500">Nhanh </span>
          <span className="text-black">Chóng</span>
        </h1>
        <div className="flex flex-col space-y-4 items-center mr-[300px] justify-center">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow w-full max-w-[200px]">
            Đặt Ngay
          </button>
          <button className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold px-6 py-3 rounded-full shadow w-full max-w-[200px]">
            Theo Dõi Đơn Hàng
          </button>
        </div>
      </div>

      <div className="flex-1 mt-10 md:mt-0 flex justify-center">
        <Card className="w-full max-w-sm bg-white rounded-xl shadow-lg py-0 pb-3">
          <div className="relative">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-48 object-cover rounded-t-xl"
            />
          </div>
          <CardContent className=" text-center">
            <CardTitle className="text-2xl font-bold text-orange-600">{selectedProduct.name}</CardTitle>
            <p className="text-gray-800 text-sm mt-2 font-semibold">{selectedProduct.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-center px-2 mt-2">
            <p className="text-orange-600 font-semibold text-3xl ml-5">{selectedProduct.price}đ</p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-2">
              Mua
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default HeroSection;
