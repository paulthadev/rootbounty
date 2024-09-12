import { LazyLoadImage } from "react-lazy-load-image-component";
import heroBanner from "../assets/hero-banner.png";
import { styles } from "../styles/styles";
import { onboardingInfo } from "../constants/onboarding";
import Header from "../components/landingpage/Header";

const Onboarding = () => (
  <section className="relative flex flex-col h-[100vh] scrollbar-hide">
    <Header />

    <div className="relative w-full h-screen">
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <LazyLoadImage src={heroBanner} className="w-full h-full object-cover" />
    </div>

    <div
      className={`${styles.maxWidth} absolute inset-0 flex flex-col justify-center `}
    >
      <MainHeading />
    </div>
  </section>
);

function MainHeading() {
  return (
    <div className=" self-center sm:self-start lg:self-center">
      {onboardingInfo.map((items) => (
        <div
          key={items.id}
          className="grid gap-y-3 xs:gap-y-4 lg:gap-y-7 text-white"
        >
          <div className="max-w-xs  md:max-w-md capitalize md:pb-16 pb-5">
            <h1 className="text-4xl lg:text-6xl md:text-5xl font-bold leading-tight sm:leading-tight md:leading-tight lg:leading-tight">
              {items.title}
            </h1>
          </div>

          <div className="flex flex-col gap-y-10 sm:flex-row sm:gap-x-6 sm:gap-x-15 max-w-sm sm:max-w-xl md:max-w-2xl md:gap-x-24 lg:max-w-full">
            <div>
              <h1 className="text-2xl lg:text-4xl font-bold mb-1">
                {items.subTitle1}
              </h1>

              <h2 className="text-lg lg:text-2xl font-medium mb-2 lg:mb-4 leading-tight">
                {items.subTitle1Content}
              </h2>

              <button className="text-base capitalize  bg-[#4CAF50] hover:bg-[#0d5610] px-4 py-2 rounded-md transition-all duration-300 lg:text-2xl">
                Join as a farmer
              </button>
            </div>

            <div>
              <h1 className="text-2xl font-bold lg:text-4xl  mb-1">
                {items.subTitle2}
              </h1>

              <h2 className="text-lg lg:text-2xl font-medium mb-2 lg:mb-4 leading-tight">
                {items.subTitle2Content}
              </h2>

              <button className="text-base capitalize md:text-base bg-[#4CAF50] hover:bg-[#0d5610] px-4 py-2 rounded-md transition-all duration-300 lg:text-2xl">
                Sign-up as a buyer
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Onboarding;
