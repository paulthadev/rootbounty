import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useCurrentUser from "../../hooks/useCurrentUser";
import uploadImage from "../../utils/uploadImage";
import { supabase } from "../../utils/supabase";
import Inputs from "../../components/Inputs";

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const { userData, loading } = useCurrentUser();

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

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

  const handleFileChange = (e) => {
    const selectedFiles = [...e.target.files];
    const validFiles = selectedFiles.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} is too large. Max size is 5MB.`);
        return false;
      }
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        toast.error(`${file.name} is not a supported image type.`);
        return false;
      }
      return true;
    });
    setFiles(validFiles);
  };

  const handleUpload = async () => {
    setUploading(true);
    const fileUrls = [];
    try {
      for (const file of files) {
        const filePath = `images/${file.name}`;
        const url = await uploadImage(file, filePath);
        if (url) {
          fileUrls.push(url);
        } else {
          toast.error(`Failed to upload ${file.name}`);
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images. Please try again.");
    } finally {
      setUploading(false);
    }
    return fileUrls;
  };

  const handlePostProduct = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      toast.error("Please select at least one image.");
      return;
    }

    const imageUrls = await handleUpload();

    if (imageUrls.length === 0) {
      toast.error("Failed to upload images.");
      return;
    }

    try {
      const { data, error } = await supabase.from("product").insert([
        {
          product_name: productName,
          description: description,
          price: price,
          images: imageUrls,
          created_at: new Date().toISOString(),
          nutrition: nutrition,
          location: location,
          farmer_id: userData?.farmer_id,
        },
      ]);

      if (error) throw error;

      if (!data) {
        toast.error("Failed to post product.");
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
      console.error("Error posting product:", error.message);
      toast.error("Error posting product.");
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
        <div className="p-2">
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <div className="px-2">
          <button
            className="btn btn-primary btn-sm mt-2"
            disabled={uploading || !files.length}
          >
            {uploading ? "Uploading..." : "Post Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FarmerDashboard;
