import { LazyLoadImage } from "react-lazy-load-image-component";
import farm from "../../assets/farm.png";
import { styles } from "../../styles/styles";
import { showcases, showH1 } from "../../constants/landing";

function WorkShowcase() {
  return (
    <section className="bg-white py-8 scrollbar-hide">
      <div
        className={`flex  flex-col sm:flex-row sm:items-center gap-y-4 justify-center ${styles.maxWidth}`}
      >
        <div className="relative flex justify-center sm:justify-start md:items-center md:justify-center w-full">
          <div className="w-1/2 h-1/2 sm:w-4/5 sm:h-4/5 md:w-11/12 lg:w-2/3 lg:h-2/3">
            <LazyLoadImage
              src={farm}
              className="object-contain w-full h-full "
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-3">
          {showH1.map((item) => (
            <div key={item.id}>
              <h1 className="text-lg md:text-2xl font-extrabold text-neutral-800">
                {item.heading}
                <span className="text-[#4CAF50]">{item.heading2}</span>
              </h1>
              <p className="mt-1 md:text-sm text-xs text-neutral-800 font-bold">
                {item.text} <span className="text-[#4CAF50]">{item.text2}</span>
                <span>{item.text3}</span>
              </p>
            </div>
          ))}

          <div className="bg-neutral-300 h-[0.0625rem] max-w-[10rem]"></div>

          {showcases.map((items) => (
            <div key={items.id}>
              <h2 className="font-bold mb-1 md:text-lg text-neutral-800">
                {items.heading}
              </h2>

              <div className="flex flex-col gap-y-3">
                {items.details.map((detail) => (
                  <div key={detail.id}>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs md:text-sm font-bold text-[#4CAF50]">
                        {detail.title}
                      </h3>
                      <div className="bg-[#4CAF50] h-[0.09rem] w-[2.5rem]"></div>
                    </div>
                    <p className="text-xs md:text-sm text-neutral-800 font-bold">
                      {detail.subTitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkShowcase;
