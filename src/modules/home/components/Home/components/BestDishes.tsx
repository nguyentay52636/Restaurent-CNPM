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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500">
          <span className="text-black">Our</span> Best Delivered
          <br />
          <span className="text-black">Dishes</span>
        </h2>
        <p className="text-gray-500 text-sm sm:text-base md:max-w-sm">
          It's not just about bringing you good food from restaurants, we deliver you experience
        </p>
      </div>

      {/* Dish Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dishes.map((dish, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center px-4 py-6 border border-gray-200 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          >
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
              {/* Đảm bảo hình ảnh chiếm 100% chiều rộng và chiều cao của phần tử */}
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full rounded-full object-cover"
              />
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-orange-500"></div>
            </div>
            <h3 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-black break-words">{dish.name}</h3>
            <Button
              variant="link"
              className="mt-2 text-base sm:text-lg md:text-xl text-orange-500 hover:text-orange-600 p-0"
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
