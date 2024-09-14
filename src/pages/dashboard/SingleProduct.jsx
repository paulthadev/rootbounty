import { useParams } from "react-router";
import { supabase } from "../../utils/supabase";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const { productId } = useParams();

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("product")
        .select("*")
        .eq("product_id", productId)
        .single();

      if (error) throw error;

      setProduct(data);
      setLoading(false);
    } catch (error) {
      toast.error(`Error fetching product. ${error.message}`);
      setLoading(false);
    }
  };

  console.log(product);

  useEffect(() => {
    fetchProduct();
  }, []);

  return <div>SingleProduct</div>;
};

export default SingleProduct;
