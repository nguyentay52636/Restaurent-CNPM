import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { getAllProducts } from "@/lib/apis/productApi";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Icon mũi tên

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
}

const HeroSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [prevIndex, setPrevIndex] = useState(0);
  const currentProduct = products[currentIndex];
  const previousProduct = products[prevIndex];
  const getFullImageUrl = (path: string) => {
    if (!path) return '';
    if (/^https?:\/\//.test(path)) return path;
    // Lấy base url từ biến môi trường, loại bỏ /api nếu có
    const apiUrl = import.meta.env.VITE_API_URL as string;
    const baseUrl = apiUrl.replace(/\/api\/?$/, '');
    return `${baseUrl}${path}`;
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(timer);
  }, [products, currentIndex]);

  const handlePrev = () => {
    setDirection("left");
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleNext = () => {
    setDirection("right");
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };


  const selectedProduct = products[currentIndex];
  if (!selectedProduct) return <div>Loading...</div>;
  
  return (
    <section className="min-h-[80vh] px-6 flex flex-col md:flex-row items-center justify-center md:gap-8 relative overflow-hidden">

  {/* BACKGROUND IMAGE TRANSITION */}
  <div className="absolute inset-0 -z-10">
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedProduct.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${getFullImageUrl(selectedProduct.image)})`,
        }}
      />
    </AnimatePresence>
  </div>

  {/* Nội dung chính */}
  <div className="flex-1 space-y-6 md:pr-4 text-center md:text-left">
    <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-black ml-[100px]">
      <span className="text-orange-500">Nhanh <span className='text-black'>và</span> Ngon</span><br />
      <span className="text-orange-500">Giao Hàng <span className='text-black'>với</span> tốc độ</span><br />
      <span className="text-orange-500">Nhanh </span><span className="text-black">Chóng</span>
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

      <div className="flex-1 mt-10 md:mt-0 flex justify-center items-center relative w-full">
        {/* Nút mũi tên trái */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition z-10"
        >
          <ChevronLeft className="w-6 h-6 text-orange-500" />
        </button>

        {/* Card sản phẩm có animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={previousProduct?.id} 
            initial={{ x: direction === "right" ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction === "right" ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm absolute"
          >
            <Card className="bg-white rounded-xl shadow-lg py-0 pb-3">
              <div className="relative">
                <img
                  src={getFullImageUrl(selectedProduct.image)}
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
          </motion.div>
        </AnimatePresence>

        {/* Nút mũi tên phải */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition z-10"
        >
          <ChevronRight className="w-6 h-6 text-orange-500" />
        </button>
      </div>

    </section>
  );
};

export default HeroSection;
