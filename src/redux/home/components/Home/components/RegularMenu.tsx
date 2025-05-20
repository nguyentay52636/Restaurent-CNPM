import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { getAllProducts } from "@/lib/apis/productApi";
import { Link } from 'react-router-dom';
interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  createdAt?: string;
}

const RegularMenu = () => {
  const [menuItems, setMenuItems] = useState<Product[]>([]);
  const getFullImageUrl = (path: string) => {
    if (!path) return '';
    if (/^https?:\/\//.test(path)) return path;
    // Lấy base url từ biến môi trường, loại bỏ /api nếu có
    const apiUrl = import.meta.env.VITE_API_URL as string;
    const baseUrl = apiUrl.replace(/\/api\/?$/, '');
    return `${baseUrl}${path}`;
  };
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await getAllProducts();
        const products: Product[] = response.data;

        const sorted = [...products].sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          }
          return b.id.localeCompare(a.id);
        });

        const newest = sorted.slice(0, 6);
        setMenuItems(newest);
      } catch (error) {
        console.error("Error loading menu items:", error);
      }
    };

    fetchMenu();
  }, []);

  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black">Khám Phá <span className="font-bold text-orange-600">Món Mới</span> </h2>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-100" asChild>
              <Link to="/products">
                Xem Tất Cả
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <Card key={index} className="flex flex-col items-center text-center bg-orange-100 p-4 rounded-xl border-none shadow-none">
              <div className="relative">
                <img
                  src={getFullImageUrl(item.image)}
                  alt={item.name}
                  className="w-48 h-48 rounded-full object-cover"
                />
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-orange-500"></div>
              </div>
              <CardContent className="pt-4 w-full">
                <CardTitle className="text-2xl font-bold text-orange-600">{item.name}</CardTitle>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {item.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center w-full px-2 mt-2">
                <p className="text-orange-600 font-semibold text-3xl">{item.price}đ</p>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-2">
                  Mua
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegularMenu;
