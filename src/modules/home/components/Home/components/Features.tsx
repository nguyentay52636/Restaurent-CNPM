import { Truck, Leaf, Package } from "lucide-react";

const features = [
  {
    icon: <Truck className="w-8 h-8 text-red-500" />,
    title: "Fast Delivery",
    description: "Promise to deliver within 30 mins",
  },
  {
    icon: <Leaf className="w-8 h-8 text-green-600" />,
    title: "Fresh Food",
    description: "Your food will be delivered 100% fresh to your home.",
  },
  {
    icon: <Package className="w-8 h-8 text-yellow-500" />,
    title: "Free Delivery",
    description: "Your food delivery is absolutely free. No cost just order",
  },
];

export default function Features() {
  return (
    <div className="relative w-full py-10 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="bg-white rounded-xl shadow-md py-6 px-6 sm:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 text-sm flex-1">
              <div>{feature.icon}</div>
              <div>
                <h3 className="text-base font-semibold sm:text-base hidden sm:block">{feature.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base hidden sm:block"> {/* Hide description on small screens */}
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
