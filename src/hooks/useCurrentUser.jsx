import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase"; // Ensure the path is correct

const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null); // State for storing user data from the database
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(userData);

  useEffect(() => {
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
        if (buyerData.length === 0) {
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

          setUserData(farmerData.length > 0 ? farmerData[0] : null); // Handle empty results
        } else {
          setUserData(buyerData[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, userData, loading, error };
};

export default useCurrentUser;
