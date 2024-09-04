import { LazyLoadImage } from "react-lazy-load-image-component";
import farm from "../../assets/farm.png";
import rectangle from "../../assets/Rectangle.png";
import { styles } from "../../styles/styles";
import { showcases, showH1 } from "../../constants/landing";

function WorkShowcase() {
  return (
    <section className="bg-white py-8">
      <div
        className={`flex flex-col gap-y-4 justify-center ${styles.maxWidth}`}
      >
        <div className="relative flex justify-center">
          <LazyLoadImage src={farm} className="w-1/2" />
          <LazyLoadImage
            src={rectangle}
            className="w-1/5 absolute right-20 bottom-8"
          />
        </div>

        <div className="flex flex-col gap-y-3">
          {showH1.map((item) => (
            <div key={item.id}>
              <h1 className="text-lg font-extrabold text-neutral-800">
                {item.heading}
                <span className="text-[#4CAF50]">{item.heading2}</span>
              </h1>
              <p className="mt-1 text-xs text-neutral-800 font-bold">
                {item.text} <span className="text-[#4CAF50]">{item.text2}</span>
                <span>{item.text3}</span>
              </p>
            </div>
          ))}

          <div className="bg-neutral-300 h-[0.0625rem] max-w-[10rem]"></div>

          {showcases.map((items) => (
            <div key={items.id} className="flex flex-col gap-y-3">
              <h2 className="font-bold text-neutral-800">{items.heading}</h2>

              {items.details.map((detail) => (
                <div key={detail.id}>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-[#4CAF50]">
                      {detail.title}
                    </h3>
                    <div className="bg-[#4CAF50] h-[0.09rem] w-[2.5rem]"></div>
                  </div>
                  <p className="text-xs text-neutral-800 font-bold">
                    {detail.subTitle}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkShowcase;
