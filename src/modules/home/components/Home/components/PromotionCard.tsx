import heroImg from '@/assets/img_herosection.jpg';

const PromotionCard = () => {
  return (
    <>
    <div className="w-full md:w-[67%] mx-auto flex flex-col md:flex-row gap-6 mt-12">
  <div className="md:w-[37%] w-full relative">
    <img src={heroImg} alt="Coupon Card" className="w-full h-80 object-cover rounded-lg" />
    <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/40 rounded-lg">
      <h3 className="text-lg font-semibold">Coupon Code</h3>
      <p className="text-3xl font-bold">60% OFF</p>
      <p className="text-sm">FOODDASH60</p>
    </div>
  </div>

  <div className="md:w-[63%] w-full flex flex-col gap-6">
    <div className="relative w-full h-40">
      <img src={heroImg} alt="Discount Card" className="w-full h-full object-cover rounded-lg" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/40 rounded-lg">
        <h3 className="text-lg font-semibold">25% OFF</h3>
      </div>
    </div>

    <div className="relative w-full h-40">
      <img src={heroImg} alt="South Indian Card" className="w-full h-full object-cover rounded-lg" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/40 rounded-lg">
        <h3 className="text-lg font-semibold">Special Sale</h3>
        <p className="text-sm">123-456-7890</p>
      </div>
    </div>
  </div>
  
</div>
<div className="px-4 py-4"></div></>
  );
};

export default PromotionCard;
