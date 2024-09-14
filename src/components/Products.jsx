import { Link } from "react-router-dom";
import potatoe from "/potatoe.png";

const allProducts = [
  {
    id: 1,
    companyName: "   Agrictech Farm",
    productName: "irish potatoe",
    location: "akure Nigeria",
    image: potatoe,
    price: 5000,
    description:
      "Freshly harvested and ready for you! 🌿🌾 Just pulled these sweet potatoes straight from the farm today.They’re 100% organic,",
    time: "3 hours ago",
  },
  {
    id: 2,
    companyName: "   Agrictech Farm",
    productName: "irish potatoe",
    location: "akure Nigeria",
    image: potatoe,
    price: 5000,
    description:
      "Freshly harvested and ready for you! 🌿🌾 Just pulled these sweet potatoes straight from the farm today.They’re 100% organic, ",
    time: "3 hours ago",
  },
  {
    id: 3,
    companyName: "   Agrictech Farm",
    productName: "irish potatoe",
    location: "akure Nigeria",
    image: potatoe,
    price: 5000,
    description:
      "Freshly harvested and ready for you! 🌿🌾 Just pulled these sweet potatoes straight from the farm today.They’re 100% organic,",
    time: "3 hours ago",
  },
  {
    id: 4,
    companyName: "   Agrictech Farm",
    productName: "irish potatoe",
    location: "akure Nigeria",
    image: potatoe,
    price: 5000,
    description:
      "Freshly harvested and ready for you! 🌿🌾 Just pulled these sweet potatoes straight from the farm today.They’re 100% organic,",
    time: "3 hours ago",
  },
];

const Products = () => {
  return (
    <section>
      <div className="grid md:grid-cols-2 gap-4  lg:grid-cols-3 ">
        {allProducts.map((product) => {
          const {
            productName,
            location,
            image,
            companyName,
            price,
            time,
            description,
          } = product;

          return (
            <article key={product.id} className="px-6 bg-white rounded-lg">
              <div className="flex justify-between mt-[3rem] mb-[1.69rem]">
                <div className="">
                  <h2 className="font-bold text-[#1E1E1E] capitalize text-[1.25rem]">
                    {companyName}
                  </h2>
                  <p className="text-[.625rem] ">{location}</p>
                </div>
                <p className="text-[.625rem]">{time}</p>
              </div>
              <Link to={`${productName}`}>
                <img src={image} alt="" className="w-[100%]" />
              </Link>
              <div className="flex justify-between mt-4 items-center">
                <h2 className="uppercase text-[1.2rem] md:text-[1.5rem] text-[#1E1E1E] font-bold">
                  {productName}
                </h2>
                <p className="text-[.925rem]">{price}</p>
              </div>
              <p className="mb-4">
                {description}
                <Link to={`${productName}`}>
                  <span className="text-[#4CAF50]">see more</span>
                </Link>{" "}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Products;
