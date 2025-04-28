import { Truck, Leaf, Package } from "lucide-react";

const features = [
  {
    icon: <Truck className="w-8 h-8 text-red-500" />,
    title: "Giao Hàng Nhanh",
    description: "Cam kết giao hàng trong vòng 30 phút",
  },
  {
    icon: <Leaf className="w-8 h-8 text-green-600" />,
    title: "Thực Phẩm Tươi",
    description: "Thực phẩm của bạn sẽ được giao tận nhà 100% tươi ngon.",
  },
  {
    icon: <Package className="w-8 h-8 text-yellow-500" />,
    title: "Miễn Phí Giao Hàng",
    description: "Giao hàng hoàn toàn miễn phí. Không phí phát sinh khi đặt hàng",
  },
];

export default function Features() {
  return (
    <>
    <div className=" relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-[85%] px-4">
        <div className="bg-white rounded-xl shadow-md py-6 px-4 flex justify-between items-center gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 text-sm flex-1">
              <div>{feature.icon}</div>
              <div>
                <h3 className="text-base font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="px-4 py-4"></div>
    </>
  );
}
