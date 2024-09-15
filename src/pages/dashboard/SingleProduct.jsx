import { useParams } from "react-router";
import { supabase } from "../../utils/supabase";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatDate } from "../../utils/formatDate";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { addItemToCart } from "../../features/cartSlice";
import { useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";

const SingleProduct = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Slider state
  const { productId } = useParams();
  const dispatch = useDispatch();

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

  // console.log(product);

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    business_name,
    product_id,
    location,
    description,
    cultural,
    product_name,
    farmer_id,
    tuber_type,
    health,
    nutrition,
    price,
    images = [], // Set a default empty array to avoid undefined
    created_at,
  } = product;

  const cartProduct = {
    images,
    product_name,
    product_id,
    price,
    farmer_id,
    quantity: 1,
    total: price,
  };

  function addToCart() {
    dispatch(addItemToCart({ product: cartProduct }));
  }

  // Handle next and previous image in the slider
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (loading) return <Spinner />;

  return (
    <section>
      <div className="grid md:grid-cols-2 mt-12 gap-8">
        <div>
          <div className="flex items-center justify-between gap-x-[5rem] lg:gap-x-[10rem]">
            <div>
              <h2 className="text-[#1E1E1E] text-lg font-bold capitalize">
                {business_name}
              </h2>
              <p className="text-[#1E1E1E] text-sm">{location}</p>
            </div>
            <p className="text-sm text-[#1E1E1E]">
              {formatDate(created_at)} ago
            </p>
          </div>

          {/* Image Slider */}
          {images.length > 0 ? (
            <div className="relative">
              <img
                src={images[currentImageIndex]}
                alt={`Product image ${currentImageIndex + 1}`}
                className="h-[18rem] object-cover lg:h-[23rem] w-[38rem] rounded-xl"
              />
              {/* Slider Buttons */}
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[1.5rem] font-bold bg-primary h-[3rem] w-[3rem] flex items-center justify-center  text-white p-2 rounded-full"
                onClick={handlePrevImage}
              >
                <MdKeyboardArrowLeft />
              </button>
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary text-[1.5rem] font-bold h-[3rem] w-[3rem] flex justify-center items-center
                 text-white p-2 rounded-full"
                onClick={handleNextImage}
              >
                <MdKeyboardArrowRight />
              </button>
            </div>
          ) : (
            <p>No images available</p>
          )}

          <h2 className="text-primary capitalize text-[1.5rem] font-bold mt-4">
            {product_name}
          </h2>
          <div>
            <h3 className="text-[#1E1E1E] font-bold text-[1.3rem] ">
              Nutrition Value
            </h3>
          </div>
        </div>

        <div className="md:mt-10">
          <div className="border-b-[1px] pb-3 mb-4">
            <h3 className="text-primary text-[1.5rem] capitalize font-bold">
              description
            </h3>
            <p>{description}</p>
          </div>

          <div className="border-b-[2px] pb-3 mb-4">
            <h3 className="text-primary text-[1.5rem] capitalize font-bold">
              health benefit
            </h3>
            <p>{health}</p>
          </div>

          <div className="border-b-[1px] pb-3 mb-4">
            <h3 className="text-primary text-[1.5rem] capitalize font-bold">
              cultural relevance
            </h3>
            <p>{cultural}</p>
          </div>

          <div className="flex gap-3 mt-7">
            {/* <button className="btn btn-primary text-white rounded-full  md:text-2xl md:btn-lg">
              order now
            </button> */}
            <button
              className="md:text-2xl btn btn-transparent text-[#1E1E1ECC] rounded-full md:btn-lg "
              onClick={addToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
