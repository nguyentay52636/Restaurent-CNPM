import { Button } from "@/components/ui/button";
import { FaSmile } from "react-icons/fa"; 
import "../animation/home.css";

const regions = ["Tây", "Đức Huy", "Đình Vũ", "Phúc Tứ", "Tuấn Anh", "Thiệu Huy"];

const RegionTabs = () => {
  return (
    <div className="relative bg-[#FFF2E1] py-4 overflow-hidden">
      <div className="marquee-animation whitespace-nowrap flex items-center gap-12">
        {[...regions, ...regions].map((region, index) => (
          <Button
            key={index}
            variant="ghost"
            className="font-semibold text-black hover:bg-transparent hover:text-orange-500 flex items-center gap-2 px-4"
          >
            <FaSmile className="w-5 h-5" />
            <span>{region}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RegionTabs;
