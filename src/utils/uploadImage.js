import { supabase } from "../utils/supabase";
import toast from "react-hot-toast";

const uploadImage = async (file) => {
  const fileName = `${Date.now()}_${file.name}`;
  const filePath = `images/${fileName}`;

  try {
    // Upload the image to Supabase storage
    const { data, error } = await supabase.storage
      .from("product-images") // Ensure this bucket exists in Supabase
      .upload(filePath, file);

    if (error) {
      throw error;
    }

    // Get the public URL of the uploaded image
    const { data: publicData, error: urlError } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    if (urlError) {
      throw urlError;
    }

    // Return the public URL of the image
    return publicData.publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    toast.error(`Failed to upload image: ${error.message}`);
    return null;
  }
};

export default uploadImage;
