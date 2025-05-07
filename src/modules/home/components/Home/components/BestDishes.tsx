import { Button } from "@/components/ui/button";
import ex from '@/assets/img_herosection.jpg';

const dishes = [
  {
    name: "Burger Bò Lá Lốp Xe Lăn",
    image: ex,
  },
  {
    name: "Hủ tiếu gõ đầu u một cục ta cục tác",
    image: ex,
  },
  {
    name: "Bánh mì gói 2 vắt",
    image: ex,
  },
];

const BestDishes = () => (
  <section className="py-12 px-4 sm:px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      {/* Heading */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-500 max-w-full break-words">
  <span className="text-black">Our</span> Best Delivered
  <br />
  <span className="text-black">Dishes</span>
</h2>

<p className="text-xs sm:text-sm md:text-sm md:max-w-sm overflow-hidden break-words">
  It's not just about bringing you good food from restaurants, we deliver you experience
</p>


      {/* Dish Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dishes.map((dish, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center px-4 py-6 border border-gray-200 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          >
            <div className="relative ">
              {/* Đảm bảo hình ảnh chiếm 100% chiều rộng và chiều cao của phần tử */}
              <img
                src={dish.image}
                alt={dish.name}
                className="w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full object-cover"
              />
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-orange-500"></div>
            </div>
            <h3 className="mt-4 text-lg sm:text-xl md:text-2xl font-bold text-black break-words">{dish.name}</h3>
            <Button
              variant="link"
              className="mt-2 text-sm sm:text-base md:text-lg text-orange-500 hover:text-orange-600 p-0"
            >
              Order Now →
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BestDishes;
