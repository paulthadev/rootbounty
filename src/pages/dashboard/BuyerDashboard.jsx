import { useEffect } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { handleLogout } from "../../utils/logout";
import { useNavigate } from "react-router";

function BuyerDashboard() {
  const navigate = useNavigate();
  const { userData, loading } = useCurrentUser();

  useEffect(() => {
    if (!loading && userData) {
      if (userData?.user_type !== "buyer") {
        // Redirect to the farmer dashboard
        navigate("/dashboard/farmer", { replace: true });
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
