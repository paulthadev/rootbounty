import { useEffect } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useNavigate } from "react-router";
import Products from "../../components/Products";

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
      <Products />
    </div>
  );
}

export default BuyerDashboard;
