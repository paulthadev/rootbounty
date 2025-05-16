import { supabase } from "./supabase";
import toast from "react-hot-toast";

/**
 * Creates a user profile in the appropriate database table if it doesn't exist yet
 * This function checks if a user has metadata indicating a pending profile
 * and creates the profile in the buyer or farmer table accordingly
 */
export const createUserProfileIfNeeded = async () => {
  try {
    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("Error fetching user:", userError);
      return { success: false, error: userError };
    }

    // Check if user has pending profile in metadata
    const metadata = user.user_metadata;

    if (!metadata?.pending_profile) {
      // No pending profile, nothing to do
      return { success: true, profileExists: true };
    }

    // Determine user type from metadata
    const userType = metadata.user_type;

    if (!userType) {
      console.error("User type not found in metadata");
      return { success: false, error: "User type not found in metadata" };
    }

    // Check if profile already exists
    const tableName = userType === "buyer" ? "buyer" : "farmer";
    const { data: existingProfile, error: checkError } = await supabase
      .from(tableName)
      .select("*")
      .eq("email", user.email)
      .limit(1);

    if (checkError) {
      console.error(`Error checking for existing profile:`, checkError);
      return { success: false, error: checkError };
    }

    // If profile already exists, update metadata and return
    if (existingProfile && existingProfile.length > 0) {
      // Update metadata to remove pending_profile flag
      await supabase.auth.updateUser({
        data: { pending_profile: false },
      });
      return { success: true, profileExists: true };
    }

    // Profile doesn't exist, create it
    const profileData = {
      email: user.email,
      firstname: metadata.firstname,
      lastname: metadata.lastname,
      phone: metadata.phone,
    };

    // Add user type specific fields
    if (userType === "buyer") {
      // Nothing additional for buyer
    } else if (userType === "farmer") {
      // Add farmer-specific fields
      profileData.business_name = metadata.business_name;
      profileData.location = metadata.location;
      profileData.tuber = metadata.tuber;
    }

    // Insert the profile into the appropriate table
    const { error: insertError } = await supabase
      .from(tableName)
      .insert([profileData]);

    if (insertError) {
      console.error(`Error creating ${userType} profile:`, insertError);
      return { success: false, error: insertError };
    }

    // Update metadata to remove pending_profile flag
    await supabase.auth.updateUser({
      data: { pending_profile: false },
    });

    toast.success(`Your ${userType} profile has been created!`);
    return { success: true, profileCreated: true };
  } catch (error) {
    console.error("Error in createUserProfileIfNeeded:", error);
    return { success: false, error };
  }
};
