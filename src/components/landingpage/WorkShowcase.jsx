import { LazyLoadImage } from "react-lazy-load-image-component";
import farm from "../../assets/farm.png";
import { styles } from "../../styles/styles";
import { showcases, showH1 } from "../../constants/landing";

function WorkShowcase() {
  return (
    <section className="bg-white py-8">
      <div
        className={`flex flex-col gap-y-4 justify-center ${styles.maxWidth}`}
      >
        <LazyLoadImage src={farm} className="w-2/3 self-center" />

        <div className="">
          {showH1.map((item) => (
            <div key={item.id}>
              <h1>{item.heading}</h1>
              <p>{item.text}</p>
            </div>
          ))}

          {showcases.map((items) => (
            <div key={items.id}>
              <h2>{items.heading}</h2>

              {items.details.map((detail) => (
                <div key={detail.id}>
                  <h3>{detail.title}</h3>
                  <p>{detail.subTitle}</p>
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
