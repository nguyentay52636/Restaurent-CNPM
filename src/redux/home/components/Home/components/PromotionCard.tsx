import heroImg from '@/assets/img_herosection.jpg';

const PromotionCard = () => {
  return (
    <>
    <div className="w-full md:w-[67%] mx-auto flex flex-col md:flex-row gap-6 mt-12">
  <div className="md:w-[37%] w-full relative">
    <img src={heroImg} alt="Mã Giảm Giá" className="w-full h-80 object-cover rounded-lg" />
    <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/40 rounded-lg">
      <h3 className="text-lg font-semibold">Mã Giảm Giá</h3>
      <p className="text-3xl font-bold">Giảm 60%</p>
      <p className="text-sm">FOODDASH60</p>
    </div>
  </div>

  <div className="md:w-[63%] w-full flex flex-col gap-6">
    <div className="relative w-full h-40">
      <img src={heroImg} alt="Thẻ Giảm Giá" className="w-full h-full object-cover rounded-lg" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/40 rounded-lg">
        <h3 className="text-lg font-semibold">Giảm 25%</h3>
      </div>
    </div>

    <div className="relative w-full h-40">
      <img src={heroImg} alt="Thẻ Đặc Biệt" className="w-full h-full object-cover rounded-lg" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/40 rounded-lg">
        <h3 className="text-lg font-semibold">Khuyến Mãi Đặc Biệt</h3>
        <p className="text-sm">123-456-7890</p>
      </div>
    </div>
  </div>
  
</div>
<div className="px-4 py-4"></div></>
  );
};

export default PromotionCard;
