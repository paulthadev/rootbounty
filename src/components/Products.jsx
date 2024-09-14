import { Link } from "react-router-dom";
import potatoe from "/potatoe.png";
import Spinner from "./Spinner";
import { supabase } from "../utils/supabase";
import { useEffect, useState } from "react";
import { formatDate } from "../utils/formatDate";
import formatPrice from "../utils/formatPrice";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from("product").select("*");

        if (error) {
          throw error;
        }

        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <div className="grid md:grid-cols-2 gap-4  lg:grid-cols-3 ">
        {products.map((product) => {
          const {
            product_name,
            product_id,
            location,
            image,
            business_name,
            price,
            created_at,
            description,
          } = product;

          return (
            <article key={product_id} className="px-6 bg-white rounded-lg">
              <div className="flex justify-between items-center mt-[3rem] mb-[1.69rem]">
                <div className="">
                  <h2 className="font-bold text-[#1E1E1E] capitalize text-[1.25rem]">
                    {business_name}
                  </h2>
                  <p className="text-[.625rem] max-w-[11rem] ">{location}</p>
                </div>

                <p className="text-[.625rem] xs:text-[.75rem] font-semibold">
                  {formatDate(created_at)}
                </p>
              </div>
              <Link to={`${product_name}`}>
                <img src={potatoe} alt="" className="w-[100%]" />
              </Link>

              <div className="flex justify-between mt-4 items-center">
                <h2 className="uppercase text-[1.2rem] md:text-[1.5rem] text-[#1E1E1E] font-bold">
                  {product_name}{" "}
                </h2>
                <p className="text-[.925rem] font-semibold">
                  {formatPrice(price)}
                </p>
              </div>

              <p className="mb-4">
                {description}
                <Link to={`${product_name}`}>
                  <span className="text-[#4CAF50]"> see more</span>
                </Link>
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Products;
