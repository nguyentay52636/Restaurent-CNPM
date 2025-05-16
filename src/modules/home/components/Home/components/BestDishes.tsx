import { Button } from "@/components/ui/button";
import ex from '@/assets/img_herosection.jpg';
import { getAllProducts } from "@/lib/apis/productApi";
import { useEffect, useState } from "react";
interface Product {
  id: string;
  name: string;
  image: string;
  quantity: number;
}
const BestDishes = () => {
  const [dishes, setDishes] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        const allProducts: Product[] = response.data;

        // Sắp xếp theo số lượng tăng dần và lấy 3 món đầu tiên
        const lowStockDishes = allProducts
          .sort((a, b) => a.quantity - b.quantity)
          .slice(0, 3);

        setDishes(lowStockDishes);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);
  return(
  <section className="py-12 px-6 bg-white h-[80vh]">
  <div className="max-w-5xl mx-auto">
    <div className="flex flex-col md:flex-row justify-between items-start mb-8">
      <h2 className="text-3xl md:text-4xl font-bold text-orange-500 ml-[-115px]">
        <span className="text-black">Món Ăn</span> Nổi Bật
        <br />
        <span className="text-black">Của Chúng Tôi</span>
      </h2>
      <p className="text-gray-500 text-sm md:text-base mt-4 md:mt-0 md:max-w-xs">
        Không chỉ mang đến cho bạn những món ăn ngon từ nhà hàng, chúng tôi còn mang đến cho bạn trải nghiệm tuyệt vời
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {dishes.map((dish, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-48 h-48 rounded-full object-cover"
            />
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-orange-500"></div>
          </div>
          <h3 className="mt-4 text-4xl font-bold">{dish.name}</h3> 
          <Button
            variant="link"
            className="mt-2 text-xl text-orange-500 hover:text-orange-600 p-0"  
          >
            Đặt Ngay →
          </Button>
        </div>
      ))}
    </div>
  </div>
</section>
)};

export default BestDishes;
