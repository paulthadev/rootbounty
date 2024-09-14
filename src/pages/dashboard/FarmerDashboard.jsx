import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
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

  console.log(userData);

  useEffect(() => {
    if (!loading && userData) {
      if (userData?.user_type !== "farmer") {
        navigate("/dashboard");
      }
    }
  }, []);

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

        <div className="px-2 mt-4">
          <label className="block font-medium md:text-lg text-gray-700">
            Select Tuber Types:
          </label>
          {userData?.tuber?.map((tuber) => (
            <div key={tuber} className="flex items-center mt-2">
              <input
                type="checkbox"
                value={tuber}
                checked={selectedTuberTypes.includes(tuber)}
                onChange={handleTuberChange}
                className="mr-2 checkbox checkbox-primary checkbox-xs"
              />
              <label className="text-sm text-gray-600">{tuber}</label>
            </div>
          ))}
        </div>

        {/* Image upload input can be omitted for this test */}
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
