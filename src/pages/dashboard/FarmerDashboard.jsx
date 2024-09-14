import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import useCurrentUser from "../../hooks/useCurrentUser";
import { supabase } from "../../utils/supabase";
import Inputs from "../../components/Inputs";

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const { userData, loading } = useCurrentUser();

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [cultural, setCultural] = useState("");
  const [price, setPrice] = useState("");
  const [selectedTuberTypes, setSelectedTuberTypes] = useState([]);
  const [nutritionalInfo, setNutritionalInfo] = useState([]);
  const [healthBenefits, setHealthBenefits] = useState([]);

  useEffect(() => {
    if (!loading && userData) {
      if (userData?.user_type !== "farmer") {
        navigate("/dashboard");
      }
    }
  }, [loading, userData, navigate]);

  useEffect(() => {
    if (productName) {
      fetchProductDetails(productName);
    } else {
      setNutritionalInfo([]);
      setHealthBenefits([]);
    }
  }, [productName]);

  const fetchProductDetails = async (name) => {
    try {
      const nutritionixHost = import.meta.env.VITE_NUTRITIONIX_HOST;
      const response = await axios.post(
        `${nutritionixHost}/v2/natural/nutrients`,
        { query: name },
        {
          headers: {
            "x-app-id": import.meta.env.VITE_NUTRITIONIX_APP_ID,
            "x-app-key": import.meta.env.VITE_NUTRITIONIX_APP_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      const nutritionData = response.data;
      setNutritionalInfo(nutritionData.foods || []);

      // Example API request for health benefits
      // const benefitsResponse = await axios.get(
      //   `https://api.example.com/health-benefits?product=${name}`
      // );
      // const benefitsData = benefitsResponse.data; // Adjust based on API response format
      // setHealthBenefits(benefitsData);
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error("Failed to fetch product details.");
    }
  };

  const extractNutritionalInfo = (foods) => {
    return foods.map((food) => {
      const {
        nf_calories,
        nf_cholesterol,
        nf_dietary_fiber,
        nf_protein,
        nf_total_fat,
        nf_total_carbohydrate,
        serving_weight_grams,
      } = food;

      return {
        nf_calories,
        nf_cholesterol,
        nf_dietary_fiber,
        nf_protein,
        nf_total_fat,
        nf_total_carbohydrate,
        serving_weight_grams,
      };
    });
  };

  const handleTuberChange = (e) => {
    const value = e.target.value;
    setSelectedTuberTypes((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((tuber) => tuber !== value)
        : [...prevSelected, value]
    );
  };

  const handlePostProduct = async (e) => {
    e.preventDefault();

    // Skip image upload logic
    const imageUrls = []; // No images provided

    try {
      const { data, error } = await supabase
        .from("product")
        .insert([
          {
            product_name: productName,
            description: description,
            price: price,
            images: imageUrls,
            created_at: new Date().toISOString(),
            cultural: cultural,
            location: userData?.location,
            farmer_id: userData?.farmer_id,
            business_name: userData?.business_name,
            tuber_type: selectedTuberTypes,
            nutrition: extractNutritionalInfo(nutritionalInfo),
            health: healthBenefits,
          },
        ])
        .select();

      if (error) throw error;

      if (!data || data.length === 0) {
        console.error("No data returned from insert operation");
        toast.error("Failed to post product: No data returned");
        return;
      }

      toast.success("Product posted successfully!");

      // Clear fields
      setProductName("");
      setDescription("");
      setPrice("");
      setFiles([]);
      setCultural("");
      setSelectedTuberTypes([]);
      setNutritionalInfo([]);
      setHealthBenefits([]);
    } catch (error) {
      console.error("Error posting product:", error);
      toast.error(`Error posting product: ${error.message}`);
    }
  };

  return (
    <div>
      <h1 className="p-2 text-2xl font-semibold">Add Product</h1>
      <form onSubmit={handlePostProduct}>
        <Inputs
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <div className="p-2 flex items-center gap-x-4">
          <label className="block font-medium text-xl">Tuber type:</label>
          {userData?.tuber?.map((tuber) => (
            <div key={tuber} className="flex items-center ">
              <input
                type="checkbox"
                value={tuber}
                checked={selectedTuberTypes.includes(tuber)}
                onChange={handleTuberChange}
                className="mr-2 checkbox checkbox-primary checkbox-sm"
              />
              <label className="text-gray-600 capitalize">{tuber} </label>
            </div>
          ))}
        </div>

        <Inputs
          type="textarea"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
        />
        <Inputs
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Inputs
          type="text"
          placeholder="Cultural values or historical information."
          value={cultural}
          onChange={(e) => setCultural(e.target.value)}
        />

        {/* Display nutritional info */}
        <div className="px-2 mt-4">
          <h2 className="text-lg font-semibold">Nutritional Information</h2>
          <ul>
            {nutritionalInfo.map((food, index) => {
              const {
                nf_calories,
                nf_cholesterol,
                nf_dietary_fiber,
                nf_protein,
                nf_total_fat,
                nf_total_carbohydrate,
                serving_weight_grams,
                serving_qty,
              } = food;
              return (
                <li key={index} className="text-sm text-gray-800 pl-3">
                  <div className=" font-semibold text-black">
                    Serving Weight: {serving_weight_grams} g
                    <br />
                    Serving Quantity:{serving_qty}
                  </div>

                  <div>Calories:{nf_calories} kcal</div>
                  <div>Cholesterol: {nf_cholesterol} mg</div>
                  <div>Dietary Fiber: {nf_dietary_fiber} g</div>
                  <div>Protein: {nf_protein} g</div>
                  <div>Total Fat: {nf_total_fat} g</div>
                  <div>Total Carbohydrate: {nf_total_carbohydrate} g</div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Display health benefits */}
        <div className="px-2 mt-4">
          <h2 className="text-lg font-semibold">Health Benefits</h2>
          <ul>
            {healthBenefits.map((benefit, index) => (
              <li key={index} className="text-sm text-gray-600">
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="px-2">
          <button
            className="btn btn-primary btn-sm text-base text-white mt-2"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Post Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FarmerDashboard;
