import { useEffect } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { handleLogout } from "../../utils/logout";

function BuyerDashboard() {
  const { userData, loading } = useCurrentUser();

  useEffect(() => {
    if (!loading && userData) {
      if (userData?.user_type !== "buyer") {
        // Redirect to the farmer dashboard
        window.location.replace("/farmer/dashboard");
      }
    }
  }, [userData, loading]);

  return (
    <div>
      <p>Buyer Dashboard</p>

      <button onClick={() => handleLogout()} className="btn btn-warning">
        logout
      </button>
    </div>
  );
}

export default BuyerDashboard;
