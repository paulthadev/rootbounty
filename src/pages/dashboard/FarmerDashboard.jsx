import { useEffect } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { handleLogout } from "../../utils/logout";

function FarmerDashboard() {
  const { userData, loading } = useCurrentUser();

  useEffect(() => {
    if (!loading && userData) {
      if (userData?.user_type !== "farmer") {
        // Redirect to the buyer dashboard
        window.location.replace("/buyer/dashboard");
      }
    }
  }, [userData, loading]);

  return (
    <div>
      <p>Farmer Dashboard</p>

      <button onClick={() => handleLogout()} className="btn btn-warning">
        logout
      </button>
    </div>
  );
}

export default FarmerDashboard;
