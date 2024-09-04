import { LazyLoadImage } from "react-lazy-load-image-component";
import heroBanner from "../../assets/hero-banner.png";
import { styles } from "../../styles/styles";

const HeroSection = () => (
  <section className="h-[40rem] flex flex-col justify-center">
    <div className="relative">
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <LazyLoadImage src={heroBanner} />
    </div>

    <div className={`absolute mx-6 ${styles.maxWidth}`}>
      <MainHeading />
    </div>
  </section>
);

function MainHeading() {
  return (
    <div className="max-w-[32rem] grid gap-y-10">
      <div className="grid gap-y-6 text-white">
        <h1 className="text-5xl leading-none font-extrabold">
          Fresh from Earth, available within your reach.
        </h1>

        <h2 className="text-2xl font-bold ">
          Discover the best selection of tuber crops, sourced directly from
          farmers around you.
        </h2>
      </div>

      <div className="flex gap-x-7">
        <button className="btn btn-success">Join now</button>
        <button className="btn btn-warning">Login as guest</button>
      </div>
    </div>
  );
}

export default HeroSection;
