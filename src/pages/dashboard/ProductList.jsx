import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";
import useCurrentUser from "../../hooks/useCurrentUser";
import formatPrice from "../../utils/formatPrice";
import { formatDate } from "../../utils/formatDate";

function ProductList() {
  const { userData } = useCurrentUser();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedProductId, setExpandedProductId] = useState(null);

  const farmerId = userData?.farmer_id;

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("product")
        .select("*")
        .eq("farmer_id", farmerId);

      if (error) throw error;

      setProducts(data);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const { error } = await supabase
        .from("product")
        .delete()
        .eq("product_id", productId);

      if (error) throw error;

      toast.success("Product deleted successfully!");
      // Refetch products after deletion
      fetchProducts();
    } catch (error) {
      toast.error(`Error deleting product: ${error.message}`);
    }
  };

  const toggleDescription = (productId) => {
    if (expandedProductId === productId) {
      setExpandedProductId(null);
    } else {
      setExpandedProductId(productId);
    }
  };

  useEffect(() => {
    if (farmerId) {
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [farmerId]);

  const truncateText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

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
                key={product.product_id}
                className="bg-white p-4 rounded-lg shadow-md h-fit overflow-hidden"
              >
                <div className="flex gap-x-4">
                  {product?.images?.map((image, index) => (
                    <img
                      src={image}
                      key={index}
                      className="max-w-full w-fit h-14 rounded-lg"
                    />
                  ))}
                </div>

                <div className="pt-6">
                  <p className="text-xl font-semibold">
                    {product.product_name}
                  </p>

                  <p className="text-base text-gray-700">
                    {expandedProductId === product.product_id
                      ? product.description
                      : truncateText(product.description, 10)}
                    {product.description.split(" ").length > 10 && (
                      <button
                        onClick={() => toggleDescription(product.product_id)}
                        className="text-blue-500 ml-2"
                      >
                        {expandedProductId === product.product_id
                          ? "View less"
                          : "View more"}
                      </button>
                    )}
                  </p>

                  <div className="grid grid-cols-2 mt-2">
                    <p className="text-base font-semibold">
                      <b>Price: </b>
                      {formatPrice(product.price)}
                    </p>

                    <p className="text-base">
                      <b>KG: </b>
                      {product.kg}kg
                    </p>
                  </div>

                  <p className="text-base">
                    <b>Tuber type: </b>{" "}
                    <span className="capitalize">{product.tuber_type}</span>
                  </p>

                  <p className="text-base">
                    <b>Date created: </b>{" "}
                    <span>
                      <b>{formatDate(product.created_at)}</b> ago
                    </span>
                  </p>

                  <div className="mt-2">
                    <button
                      onClick={() => deleteProduct(product.product_id)}
                      className="btn btn-error btn-block bg-red-500 text-white  text-lg rounded"
                    >
                      Delete
                    </button>
                  </div>
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
