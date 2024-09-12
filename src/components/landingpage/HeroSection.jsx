import { LazyLoadImage } from "react-lazy-load-image-component";
import heroBanner from "../../assets/hero-banner.png";
import { heroSectionInfo } from "../../constants/landing";
import { styles } from "../../styles/styles";
import { useNavigate } from "react-router";

const HeroSection = () => (
  <section className="h-fit flex flex-col scrollbar-hide">
    <div className="relative">
      <div className="absolute inset-0 top-0 bg-black opacity-80 "></div>
      <LazyLoadImage
        src={heroBanner}
        className="w-full h-[20rem] xs:h-[25rem] lg:h-[35rem] md:h-[30rem] object-cover xl:h-[45rem]"
      />
    </div>

    <div
      className={`${styles.maxWidth} absolute mt-12 sm:mt-16 md:mt-24 lg:mt-36`}
    >
      <MainHeading />
    </div>
  </section>
);

function MainHeading() {
  const navigate = useNavigate();
  return (
    <div className="max-w-[15rem] scrollbar-hide  xs:max-w-[20rem] md:max-w-[25rem]  lg:max-w-[30rem] grid gap-y-8 lg:gap-y-10">
      {heroSectionInfo.map((items) => (
        <div
          key={items.id}
          className="grid gap-y-3 xs:gap-y-4 lg:gap-y-7 text-white"
        >
          <h1 className="text-2xl leading-none font-extrabold xs:text-3xl sm:text-[2rem] md:text-4xl lg:text-5xl lg:leading-none">
            {items.title}
          </h1>

          <h2 className="text-xs xs:text-base xs:leading-tight font-medium md:text-xl lg:text-2xl">
            {items.subTitle}
          </h2>
        </div>
      ))}

      <div className="flex gap-x-4 xs:gap-x-7 text-white">
        <button
          onClick={() => navigate("/onboarding")}
          className="text-xs xs:text-sm md:text-base bg-[#4CAF50] hover:bg-[#146317] px-4 py-2 rounded-md transition-all duration-300 lg:text-lg"
        >
          Join now
        </button>

        <button className="text-xs hover:bg-neutral-950 hover:text-white hover:border-neutral-950 px-4 py-2 xs:text-sm border border-white rounded-md transition-all duration-300 lg:text-lg">
          Login as guest
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
