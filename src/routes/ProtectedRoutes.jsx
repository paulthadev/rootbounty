/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useCurrentUser from "../hooks/useCurrentUser"; // Assuming you have a hook to get user session
import Spinner from "../components/Spinner";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useCurrentUser(); // Add a loading state to determine when user is being fetched
  const navigate = useNavigate();
  const [initialized, setInitialized] = useState(false); // Track if user state is fully initialized

  useEffect(() => {
    if (!loading && !user && initialized) {
      // If user is not logged in and it's fully initialized, redirect to login
      navigate("/login");
    } else if (!loading && user) {
      // Once user is logged in, we can consider initialization complete
      setInitialized(true);
    }
  }, [user, loading, navigate, initialized]);

  if (loading || !initialized) {
    // Show a loader or null until the user state is determined
    return <Spinner />;
  }

  return user ? children : null;
};

export default ProtectedRoute;
