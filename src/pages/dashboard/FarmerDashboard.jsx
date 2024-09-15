import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import useCurrentUser from "../../hooks/useCurrentUser";
import { supabase } from "../../utils/supabase";
import Inputs from "../../components/Inputs";
import uploadImage from "../../utils/uploadImage";

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const { userData, loading } = useCurrentUser();

  const [formData, setFormData] = useState({
    files: [],
    productName: "",
    description: "",
    cultural: "",
    price: "",
    healthBenefits: "",
    kg: "",
    selectedTuberType: null,
    nutritionalInfo: [],
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!loading && userData) {
      if (userData?.user_type !== "farmer") {
        navigate("/dashboard/buyer", { replace: true });
      }
    }
  }, [loading, userData, navigate]);

  useEffect(() => {
    if (formData.selectedTuberType) {
      fetchProductDetails(formData.selectedTuberType);
    } else {
      setFormData((prev) => ({
        ...prev,
        nutritionalInfo: [],
      }));
    }
  }, [formData.selectedTuberType]);

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
      setFormData((prev) => ({
        ...prev,
        nutritionalInfo: nutritionData.foods || [],
      }));
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
    setFormData((prev) => ({
      ...prev,
      selectedTuberType: e.target.value,
    }));
  };

  const handlePostProduct = async (e) => {
    e.preventDefault();

    const imageUrls = formData.files; // Now it contains URLs of uploaded images

    try {
      const nutritionalData = extractNutritionalInfo(formData.nutritionalInfo);

      const { data, error } = await supabase
        .from("product")
        .insert([
          {
            product_name: formData.productName,
            description: formData.description,
            price: formData.price,
            images: imageUrls,
            created_at: new Date().toISOString(),
            cultural: formData.cultural,
            location: userData?.location,
            farmer_id: userData?.farmer_id,
            business_name: userData?.business_name,
            tuber_type: formData.selectedTuberType,
            health: formData.healthBenefits,
            kg: formData.kg,
            nutrition: nutritionalData,
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
      setFormData({
        kg: "",
        price: "",
        files: [],
        cultural: "",
        description: "",
        productName: "",
        healthBenefits: "",
        nutritionalInfo: [],
        selectedTuberType: null,
      });
      document.querySelector('input[type="file"]').value = "";
      e.target.reset();
      navigate("/dashboard/productLists");
    } catch (error) {
      console.error("Error posting product:", error);
      toast.error(`Error posting product: ${error.message}`);
    }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length < 2 || files.length > 5) {
      toast.error("Please select between 2 to 5 images.");
      return;
    }

    setUploading(true);

    try {
      const uploadedUrls = await Promise.all(
        files.map((file) => uploadImage(file)) // Use your uploadImage function
      );
      setFormData((prev) => ({
        ...prev,
        files: uploadedUrls, // Set URLs instead of File objects
      }));
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1 className="p-2 text-2xl font-semibold">Add Product</h1>
      <form onSubmit={handlePostProduct}>
        {/* Product name  */}
        <Inputs
          label="Product Name"
          type="text"
          placeholder="Product Name"
          value={formData.productName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, productName: e.target.value }))
          }
        />

        {/* Tuber Type */}
        <div className="p-2 flex items-center flex-wrap gap-x-4 gap-y-2">
          <label className="block font-medium text-sm md:text-lg lg:text-xl">
            Tuber type:
          </label>
          {userData?.tuber?.map((tuber) => (
            <div key={tuber} className="flex items-center">
              <input
                type="radio"
                value={tuber}
                checked={formData.selectedTuberType === tuber}
                onChange={handleTuberChange}
                className="mr-1 radio radio-primary radio-xs md:radio-sm"
                required
              />
              <label className="text-gray-600 capitalize">{tuber}</label>
            </div>
          ))}
        </div>

        {/* Description */}
        <Inputs
          label="Description"
          type="textarea"
          placeholder="Provide Description of the product"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          rows={6}
        />

        {/* Price and Number of KG */}
        <div className="grid grid-cols-2">
          {/* Price */}
          <Inputs
            label="Price"
            type="number"
            min={0}
            step="0.01"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, price: e.target.value }))
            }
          />

          {/* Number of KG */}
          <Inputs
            label="Number of KG"
            type="float"
            min={0}
            step="0.01"
            placeholder="Number of KG"
            value={formData.kg}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, kg: e.target.value }))
            }
          />
        </div>

        {/* Cultural values */}
        <Inputs
          label="Cultural Values"
          type="textarea"
          placeholder="Cultural values or historical information."
          value={formData.cultural}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, cultural: e.target.value }))
          }
          rows={4}
        />

        {/* File upload */}
        <div className="p-2">
          <h2 className="block font-medium text-sm md:text-lg lg:text-xl">
            Upload Images
          </h2>
          <input
            type="file"
            accept="image/*"
            multiple
            required
            onChange={handleFileChange}
            className="file-input w-full max-w-2xl file-input-bordered file-input-primary text-gray-700"
          />
        </div>

        {/* Health benefits (optional) */}
        <div className="m-2">
          <h2 className="block font-medium text-sm md:text-lg lg:text-xl">
            Health Benefits{" "}
            <span className="text-gray-500 text-sm">(Optional)</span>
          </h2>
          <textarea
            type="text"
            placeholder="Health Benefits (optional)"
            value={formData.healthBenefits}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                healthBenefits: e.target.value,
              }))
            }
            rows={4}
            className={`registrationinput resize-none bg-white h-fit py-4 border outline-none focus:border-gray-400 input border-gray-400 w-full rounded-lg text-gray-900`}
          />
        </div>

        {/* Display nutritional info */}
        <div className="px-2 mt-4">
          <h2 className="text-lg font-semibold">Nutritional Information</h2>
          {formData.nutritionalInfo.length > 0 && (
            <ul className="grid grid-cols-2 text-sm text-gray-800 pl-3">
              <li>
                <span className="font-semibold">Serving Weight:</span>{" "}
                {formData.nutritionalInfo[0].serving_weight_grams} g
              </li>
              <li>
                <span className="font-semibold">Serving Quantity:</span>{" "}
                {formData.nutritionalInfo[0].serving_qty}
              </li>
              <li>
                <span className="font-semibold">Calories:</span>{" "}
                {formData.nutritionalInfo[0].nf_calories} kcal
              </li>
              <li>
                <span className="font-semibold">Cholesterol:</span>{" "}
                {formData.nutritionalInfo[0].nf_cholesterol} mg
              </li>
              <li>
                <span className="font-semibold">Dietary Fiber:</span>{" "}
                {formData.nutritionalInfo[0].nf_dietary_fiber} g
              </li>
              <li>
                <span className="font-semibold">Protein:</span>{" "}
                {formData.nutritionalInfo[0].nf_protein} g
              </li>
              <li>
                <span className="font-semibold">Saturated Fat:</span>{" "}
                {formData.nutritionalInfo[0].nf_saturated_fat} g
              </li>
              <li>
                <span className="font-semibold">Sugars:</span>{" "}
                {formData.nutritionalInfo[0].nf_sugars} g
              </li>
              <li>
                <span className="font-semibold">Potassium:</span>{" "}
                {formData.nutritionalInfo[0].nf_potassium} mg
              </li>
              <li>
                <span className="font-semibold">Sodium:</span>{" "}
                {formData.nutritionalInfo[0].nf_sodium} mg
              </li>
              <li>
                <span className="font-semibold">Total Fat:</span>{" "}
                {formData.nutritionalInfo[0].nf_total_fat} g
              </li>
            </ul>
          )}
        </div>

        <div className="p-2">
          <button
            className="btn btn-primary btn-block  md:btn-wide text-base text-white mt-2"
            disabled={uploading}
          >
            {uploading ? (
              <div className="loading loading-spinner bg-primary"></div>
            ) : (
              "Post Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FarmerDashboard;
