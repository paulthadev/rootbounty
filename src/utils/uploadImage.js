import toast from "react-hot-toast";
import { supabase } from "./supabase";

const uploadImage = async (file) => {
  const fileName = `${Date.now()}_${file.name
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_.]/g, "")}`;
  const filePath = `${fileName}`;

  try {
    // Upload the image to Supabase storage
    // eslint-disable-next-line no-unused-vars
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, file);

    if (error) {
      console.error("Upload error:", error, { fileName, filePath });
      throw error;
    }

    // Get the public URL of the uploaded image
    const { data: publicData, error: urlError } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    if (!publicData || urlError) {
      console.error("URL generation error:", urlError);
      throw new Error(`Failed to get public URL for file: ${fileName}`);
    }

    // Return the public URL of the image
    return publicData.publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error, { fileName, filePath });
    toast.error(`Failed to upload image: ${error.message}`);
    return null;
  }
};

export default uploadImage;
