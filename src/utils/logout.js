import toast from "react-hot-toast";
import { supabase } from "../utils/supabase";

export const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    toast.success("Logged out successfully");

    // Optionally redirect to login page or home
    window.location.href = "/login"; // Replace with the route where users should go after logout
  } catch (err) {
    toast.error(`Error logging out, ${err.message}`);
  }
};
