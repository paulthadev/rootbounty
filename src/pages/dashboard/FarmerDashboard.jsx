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
  const [selectedTuberType, setSelectedTuberType] = useState(null); // Change to single value
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
    if (selectedTuberType) {
      fetchProductDetails(selectedTuberType);
    } else {
      setNutritionalInfo([]);
      setHealthBenefits([]);
    }
  }, [selectedTuberType]);

  const fetchProductDetails = async (tuberType) => {
    try {
      const nutritionixHost = import.meta.env.VITE_NUTRITIONIX_HOST;
      const response = await axios.post(
        `${nutritionixHost}/v2/natural/nutrients`,
        {
          query: tuberType,
          use_raw_foods: true,
        },
        {
          headers: {
            "x-app-id": import.meta.env.VITE_NUTRITIONIX_APP_ID,
            "x-app-key": import.meta.env.VITE_NUTRITIONIX_APP_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      const nutritionData = response.data;
      console.log(nutritionData);
      setNutritionalInfo(nutritionData.foods || []);

      // Fetch health benefits if needed
      // const benefitsResponse = await axios.get(
      //   `https://api.example.com/health-benefits?tuberType=${tuberType}`
      // );
      // const benefitsData = benefitsResponse.data;
      // setHealthBenefits(benefitsData);
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error("Failed to fetch product details.");
    }
  };

  const extractNutritionalInfo = (foods) => {
    if (foods.length === 0) return null;

    const food = foods[0]; // Assuming we're only dealing with one food item
    return {
      serving_weight_grams: food.serving_weight_grams,
      serving_qty: food.serving_qty,
      calories: food.nf_calories,
      cholesterol: food.nf_cholesterol,
      dietary_fiber: food.nf_dietary_fiber,
      protein: food.nf_protein,
      saturated_fat: food.nf_saturated_fat,
      sugars: food.nf_sugars,
      potassium: food.nf_potassium,
      sodium: food.nf_sodium,
      total_fat: food.nf_total_fat,
    };
  };

  const handleTuberChange = (e) => {
    setSelectedTuberType(e.target.value);
  };

  const handlePostProduct = async (e) => {
    e.preventDefault();

    const imageUrls = []; // No images provided

    try {
      const nutritionalData = extractNutritionalInfo(nutritionalInfo);

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
            tuber_type: selectedTuberType,
            nutrition: nutritionalData,
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
      setSelectedTuberType(null);
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
            <div key={tuber} className="flex items-center">
              <input
                type="radio"
                value={tuber}
                checked={selectedTuberType === tuber}
                onChange={handleTuberChange}
                className="mr-2 radio radio-primary"
              />
              <label className="text-gray-600 capitalize">{tuber}</label>
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
          {nutritionalInfo.length > 0 && (
            <ul className="grid grid-cols-2 text-sm text-gray-800 pl-3">
              <li>
                <span className="font-semibold">Serving Weight:</span>{" "}
                {nutritionalInfo[0].serving_weight_grams} g
              </li>
              <li>
                <span className="font-semibold">Serving Quantity:</span>{" "}
                {nutritionalInfo[0].serving_qty}
              </li>
              <li>
                <span className="font-semibold">Calories:</span>{" "}
                {nutritionalInfo[0].nf_calories} kcal
              </li>
              <li>
                <span className="font-semibold">Cholesterol:</span>{" "}
                {nutritionalInfo[0].nf_cholesterol} mg
              </li>
              <li>
                <span className="font-semibold">Dietary Fiber:</span>{" "}
                {nutritionalInfo[0].nf_dietary_fiber} g
              </li>
              <li>
                <span className="font-semibold">Protein:</span>{" "}
                {nutritionalInfo[0].nf_protein} g
              </li>
              <li>
                <span className="font-semibold">Saturated Fat:</span>{" "}
                {nutritionalInfo[0].nf_saturated_fat} g
              </li>
              <li>
                <span className="font-semibold">Sugars:</span>{" "}
                {nutritionalInfo[0].nf_sugars} g
              </li>
              <li>
                <span className="font-semibold">Potassium:</span>{" "}
                {nutritionalInfo[0].nf_potassium} mg
              </li>
              <li>
                <span className="font-semibold">Sodium:</span>{" "}
                {nutritionalInfo[0].nf_sodium} mg
              </li>
              <li>
                <span className="font-semibold">Total Fat:</span>{" "}
                {nutritionalInfo[0].nf_total_fat} g
              </li>
            </ul>
          )}
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
