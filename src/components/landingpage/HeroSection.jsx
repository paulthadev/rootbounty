import { LazyLoadImage } from "react-lazy-load-image-component";
import heroBanner from "../../assets/hero-banner.png";

const HeroSection = () => (
  <section className="h-fit flex flex-col">
    <div className="relative">
      <div className="absolute inset-0 bg-black opacity-80 "></div>
      <LazyLoadImage
        src={heroBanner}
        className="w-full h-[20rem] xs:h-[25rem] md:h-[30rem] object-cover"
      />
    </div>

    <div className={`absolute mt-12 sm:mt-16 px-6 md:mt-24 md:mx-10 max-w-7xl`}>
      <MainHeading />
    </div>
  </section>
);

function MainHeading() {
  return (
    <div className="max-w-[15rem] xs:max-w-[20rem] md:max-w-[25rem] grid gap-y-8">
      <div className="grid gap-y-3 xs:gap-y-4 text-white">
        <h1 className="text-2xl leading-none font-extrabold xs:text-3xl sm:text-[2rem] md:text-4xl">
          Fresh from Earth, available within your reach.
        </h1>

        <h2 className="text-xs xs:text-base xs:leading-tight font-medium md:text-xl">
          Discover the best selection of tuber crops, sourced directly from
          farmers around you.
        </h2>
      </div>

      <div className="flex gap-x-4 xs:gap-x-7 text-white">
        <button className="text-xs xs:text-sm md:text-base bg-[#4CAF50] hover:bg-[#146317] px-4 py-2 rounded-md transition-all duration-300">
          Join now
        </button>
        <button className="text-xs hover:bg-neutral-950 hover:text-white hover:border-neutral-950 px-4 py-2 xs:text-sm border border-white rounded-md transition-all duration-300">
          Login as guest
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
