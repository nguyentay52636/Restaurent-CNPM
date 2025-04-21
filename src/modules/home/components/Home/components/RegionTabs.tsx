import { Button } from "@/components/ui/button";
import { FaSmile } from "react-icons/fa"; 
import "../animation/home.css";

const regions = ["Tây", "Đức Huy", "Đình Vũ", "Phúc Tứ", "Tuấn Anh", "Thiệu Huy"];

const RegionTabs = () => {
  return (
    <div className="relative overflow-hidden bg-[#FFF2E1] py-4">
  <div className="whitespace-nowrap marquee-animation">
    {[...regions].map((region, index) => (
      <Button
        key={index}
        variant="ghost"
        className="font-semibold text-black hover:bg-transparent hover:text-black flex items-center gap-1 px-4"
      >
        <FaSmile className="w-5 h-5 button-icon hover:text-orange-500" /> 
        <span className="button-text">{region}</span> 
      </Button>
    ))}
  </div>
</div>

  );
};

export default RegionTabs;
