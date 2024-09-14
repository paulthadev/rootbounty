/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useCurrentUser from "../hooks/useCurrentUser"; // Assuming you have a hook to get user session
import Spinner from "../components/Spinner";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useCurrentUser();
  const navigate = useNavigate();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!loading) {
      // Once loading is done, initialization is complete, regardless of user status
      setInitialized(true);

      // If no user and initialization is done, redirect to login
      if (!user) {
        navigate("/login");
      }
    }
  }, [user, loading, navigate]);

  if (loading || !initialized) {
    // Show a loader while determining the user state
    return <Spinner />;
  }

  return user ? children : null; // Render children if the user exists
};

export default ProtectedRoute;
