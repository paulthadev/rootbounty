import { LazyLoadImage } from "react-lazy-load-image-component";
import heroBanner from "../../assets/hero-banner.png";
import { styles } from "../../styles/styles";

const HeroSection = () => (
  <div className="relative ">
    <div className="relative">
      <div className="absolute inset-0 bg-black opacity-85"></div>
      <LazyLoadImage
        src={heroBanner}
        className="object-cover w-full h-[calc(49rem-4.13rem)]"
      />
    </div>

    <div
      className={`absolute  flex flex-col text-white inset-0 max-w-[35rem] ml-16 ${styles.maxWidth}`}
    >
      <div className="grid gap-y-6">
        <h1 className="text-5xl leading-0 font-extrabold">
          Fresh from Earth, available within your reach.
        </h1>

        <p className="text-2xl font-bold max-w-[38.9375rem]">
          Discover the best selection of tuber crops, sourced directly from
          farmers around you.
        </p>
      </div>
    </div>
  </div>
);

export default HeroSection;
