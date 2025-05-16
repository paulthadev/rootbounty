import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [pendingProfile, setPendingProfile] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      // Fetch user session
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!user) throw new Error("No user found");

      setUser(user);

      // Check if email is confirmed
      setIsEmailVerified(user.email_confirmed_at || user.confirmed_at);

      // Check if user has pending profile in metadata
      setPendingProfile(user.user_metadata?.pending_profile === true);

      // Check if the user is in the 'buyer' table
      let { data: buyerData, error: buyerError } = await supabase
        .from("buyer")
        .select("*")
        .eq("email", user.email)
        .limit(1);

      if (buyerError) {
        console.error("Error fetching from 'buyer' table:", buyerError);
        if (buyerError.message !== "No rows") {
          throw buyerError;
        }
      }

      // If not found in the 'buyer' table, check the 'farmer' table
      if (!buyerData || buyerData.length === 0) {
        // Handle empty results
        const { data: farmerData, error: farmerError } = await supabase
          .from("farmer")
          .select("*")
          .eq("email", user.email)
          .limit(1);

        if (farmerError) {
          console.error("Error fetching from 'farmer' table:", farmerError);
          if (farmerError.message !== "No rows") {
            throw farmerError;
          }
        }

        setUserData(farmerData && farmerData.length > 0 ? farmerData[0] : null);
      } else {
        setUserData(buyerData[0]);
      }

      return user;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Update function to refresh user data and check verification status
  const refreshUser = async () => {
    return await fetchUser();
  };

  return {
    user,
    userData,
    loading,
    error,
    isEmailVerified,
    pendingProfile,
    refreshUser,
  };
};

export default useCurrentUser;
