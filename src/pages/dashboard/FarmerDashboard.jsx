import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useCurrentUser from "../../hooks/useCurrentUser";
import { supabase } from "../../utils/supabase";
import Inputs from "../../components/Inputs";

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const { userData, loading } = useCurrentUser();

  console.log(userData);

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [nutrition, setNutrition] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (!loading && userData) {
      if (userData?.user_type !== "farmer") {
        navigate("/dashboard");
      }
    }

    if (!loading && !userData) {
      toast.error("User is not properly authenticated.");
      navigate("/login"); // Redirect to login page
    }
  }, [userData, loading, navigate]);

  if (!userData?.farmer_id) {
    toast.error("Farmer ID is missing. Please try logging in again.");
    return;
  }

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
            nutrition: nutrition,
            location: location,
            farmer_id: userData?.farmer_id,
            company_name: userData?.company_name,
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
      setNutrition("");
      setLocation("");
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
          placeholder="Nutritional Information"
          value={nutrition}
          onChange={(e) => setNutrition(e.target.value)}
        />
        <Inputs
          type="text"
          placeholder="Location Address"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        {/* Image upload input can be omitted for this test */}
        <div className="px-2">
          <button className="btn btn-primary btn-sm mt-2" disabled={uploading}>
            {uploading ? "Uploading..." : "Post Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FarmerDashboard;
