import heroImg from '@/assets/img_herosection.jpg';

const HeroSection = () => (
  <section className="bg-[#FFF2E1] min-h-[80vh] px-6 py-10 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
    
    {/* Left side - Text and Buttons */}
    <div className="flex-1 space-y-6 text-center md:text-left">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-black">
        <span className="text-orange-500">Quick <span className='text-black'>and</span> Tasty</span>
        <br />
        <span className="text-orange-500">Food Delivered <span className='text-black'>with</span> a</span>
        <br />
        <span className="text-orange-500">Dash of </span>
        <span className="text-black">Speed</span>
      </h1>

      <div className="flex flex-col sm:flex-row sm:justify-center md:justify-start items-center gap-4">
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow w-full sm:w-auto text-sm sm:text-base md:text-lg">
          Order Now
        </button>
        <button className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow w-full sm:w-auto text-sm sm:text-base md:text-lg">
          Track Order
        </button>
      </div>
    </div>

    {/* Right side - Image */}
    <div className="flex-1 flex justify-center">
      <img
        src={heroImg}
        alt="Delicious Indian Food"
        className="w-full h-full object-cover rounded-full shadow-lg"
      />
    </div>

  </section>
);

export default HeroSection;
