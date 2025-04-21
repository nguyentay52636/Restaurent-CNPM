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
  <section className="py-12 px-6 bg-white h-[80vh]">
  <div className="max-w-5xl mx-auto">
    <div className="flex flex-col md:flex-row justify-between items-start mb-8">
      <h2 className="text-3xl md:text-4xl font-bold text-orange-500 ml-[-115px]">
        <span className="text-black">Our</span> Best Delivered
        <br />
        <span className="text-black">Dishes</span>
      </h2>
      <p className="text-gray-500 text-sm md:text-base mt-4 md:mt-0 md:max-w-xs">
        It's not just about bringing you good food from restaurants, we deliver you experience
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
            Order Now →
          </Button>
        </div>
      ))}
    </div>
  </div>
</section>
);

export default BestDishes;
