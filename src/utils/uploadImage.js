import { supabase } from "./supabase";

const uploadImage = async (file, path) => {
  try {
    const { error } = await supabase.storage
      .from("product-images")
      .upload(path, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error("Upload error:", error);
      throw error;
    }

    const { data: publicUrlData, error: urlError } = supabase.storage
      .from("product-images")
      .getPublicUrl(path);

    if (urlError) {
      console.error("Public URL error:", urlError);
      throw urlError;
    }

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error.message);
    return null;
  }
};

export default uploadImage;
