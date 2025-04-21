import heroImg from '@/assets/img_herosection.jpg';

const HeroSection = () => (
  <section className="bg-[#FFF2E1] min-h-[80vh] px-6 flex flex-col md:flex-row items-center justify-center md:gap-8">
 
  <div className="flex-1 space-y-6 md:pr-4 text-center md:text-left">
    <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-black ml-[100px]">
      <span className="text-orange-500">Quick <span className='text-black'>and</span> Tasty</span>
      <br />
      <span className="text-orange-500">Food Delivered  <span className='text-black'>with</span> a</span>
      <br />
      <span className="text-orange-500">Dash of </span>
      <span className="text-black">Speed</span>
    </h1>
    <div className="flex flex-col space-y-4 items-center mr-[300px] justify-center">
      <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow w-full max-w-[200px]">
        Order Now
      </button>
      <button className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold px-6 py-3 rounded-full shadow w-full max-w-[200px]">
        Track Order
      </button>
    </div>
  </div>


  <div className="flex-1 mt-10 md:mt-0 flex justify-center">
    <img
      src={heroImg}
      alt="Delicious Indian Food"
      className="w-[250px] md:w-[450px] h-[250px] md:h-[450px] object-contain rounded-full shadow-lg"
    />
  </div>
</section>

);

export default HeroSection;