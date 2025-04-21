import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from "lucide-react";
import heroImg from '@/assets/img_herosection.jpg';

const menuItems = [
  { name: "Trà xanh", image: heroImg, rating: 5, price: 250 },
  { name: "Phở", image: heroImg, rating: 5, price: 250 },
  { name: "Bún bò", image: heroImg, rating: 5, price: 200 },
  { name: "Real cua", image: heroImg, rating: 5, price: 150 },
  { name: "Cơm sườn", image: heroImg, rating: 5, price: 250 },
  { name: "Ghẹ", image: heroImg, rating: 4, price: 450 },
];

const RegularMenu = () => (
  <section className="py-12 px-6 bg-white">
  <div className="max-w-5xl mx-auto">
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
      <h2 className="text-3xl md:text-4xl font-bold text-black">Our Regular Menu</h2>
      <div className="flex items-center gap-4 mt-4 sm:mt-0">
        <Tabs defaultValue="tea-time" className="w-auto">
          <TabsList className="bg-orange-100">
            <TabsTrigger value="tea-time" className="text-black data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Tea Time
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-100">
          See All
        </Button>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {menuItems.map((item, index) => (
        <Card key={index} className="flex flex-col items-center text-center bg-orange-100 p-4 rounded-xl border-none shadow-none">
          <div className="relative">
            <img
              src={item.image}
              alt={item.name}
              className="w-48 h-48 rounded-full object-cover"
            />
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-orange-500"></div>
          </div>
          <CardContent className="pt-4 w-full">
            <CardTitle className="text-2xl font-bold text-orange-600">{item.name}</CardTitle>
            <div className="flex justify-center gap-1 mt-2">
              {[...Array(item.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center w-full px-2 mt-2">
            <p className="text-orange-600 font-semibold text-3xl">₹{item.price}</p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-2">
              Buy
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  </div>
</section>
);

export default RegularMenu;
