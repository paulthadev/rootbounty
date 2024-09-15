import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";
import useCurrentUser from "../../hooks/useCurrentUser";
import formatPrice from "../../utils/formatPrice";

function ProductList() {
  const { userData } = useCurrentUser();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const farmerId = userData?.farmer_id;

  const fecthProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await supabase
        .from("product")
        .select("*")
        .eq("farmer_id", farmerId);

      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fecthProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p className="text-3xl mb-3 font-bold">All Product List</p>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {products?.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <div className="flex gap-x-4">
                  {product?.images?.map((image, index) => {
                    return (
                      <img
                        src={image}
                        key={index}
                        className=" max-w-full w-fit h-14 rounded-lg"
                      />
                    );
                  })}
                </div>

                <div className="py-6">
                  <p className="text-xl font-semibold">
                    {product.product_name}
                  </p>

                  <p className="text-base text-gray-700">
                    {product.description}
                  </p>

                  <p className="text-base font-semibold">
                    <b>Price: </b>
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
