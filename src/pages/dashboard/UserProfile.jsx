import { useEffect } from "react";
import { useNavigate } from "react-router";
import useCurrentUser from "../../hooks/useCurrentUser";
import Spinner from "../../components/Spinner";

const UserProfile = () => {
  const navigate = useNavigate();
  const { userData, loading, error } = useCurrentUser();

  useEffect(() => {
    if (!loading && userData) {
      if (userData?.user_type === "buyer") {
        // Redirect to the buyer dashboard
        window.location.replace("/dashboard");
      } else {
        // Redirect to the farmer dashboard
        window.location.replace("/farmer/dashboard");
      }
    }
  }, [navigate, userData, loading]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="h-screen grid place-items-center">
        <p className="text-red-500 text-center">Error: {error}</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="h-screen grid place-items-center">
        <p className="text-red-500">No User Logged In</p>
      </div>
    );
  }

  return null; // Since we're handling navigation, we don't need to render anything here
};

export default UserProfile;
