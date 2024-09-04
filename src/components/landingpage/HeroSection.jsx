import { LazyLoadImage } from "react-lazy-load-image-component";
import heroBanner from "../../assets/hero-banner.png";

const HeroSection = () => (
  <section className="h-fit flex flex-col">
    <div className="relative">
      <div className="absolute inset-0 bg-black opacity-80 "></div>
      <LazyLoadImage
        src={heroBanner}
        className="w-full h-[18rem] object-cover"
      />
    </div>

    <div className={`absolute mt-12 px-6`}>
      <MainHeading />
    </div>
  </section>
);

function MainHeading() {
  return (
    <div className="max-w-[38rem] grid gap-y-8">
      <div className="grid gap-y-3 text-white">
        <h1 className="text-2xl leading-none font-extrabold">
          Fresh from Earth, available within your reach.
        </h1>

        <h2 className="text-xs font-bold ">
          Discover the best selection of tuber crops, sourced directly from
          farmers around you.
        </h2>
      </div>

      <div className="flex gap-x-4 text-white">
        <button className="text-xs bg-[#4CAF50] px-4 py-1 rounded-md">
          Join now
        </button>
        <button className="text-xs px-4 py-1 border border-white rounded-md">
          Login as guest
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
