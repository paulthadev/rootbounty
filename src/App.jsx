import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import SignUpFarmer from "./pages/auth/SignUpFarmer";
import SignUpBuyer from "./pages/auth/SignUpBuyer";
import LoginPage from "./pages/auth/LoginPage";
import UserProfile from "./pages/dashboard/UserProfile";
import BuyerDashboard from "./pages/dashboard/BuyerDashboard";
import FarmerDashboard from "./pages/dashboard/FarmerDashboard";
import AuthCheck from "./routes/AuthCheck";
import ProtectedRoute from "./routes/ProtectedRoutes";
import DashboardLayout from "./pages/dashboard/dashboardLayout";
import Order from "./pages/dashboard/Order";
import Cart from "./pages/dashboard/Cart";
import SingleProduct from "./pages/dashboard/SingleProduct";
import Earnings from "./pages/dashboard/Earnings";
import BuyerProfile from "./pages/dashboard/BuyerProfile";
import FarmerProfile from "./pages/dashboard/FarmerProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/onboarding",
    element: (
      <AuthCheck>
        <Onboarding />
      </AuthCheck>
    ),
  },
  {
    path: "/signupfarmer",
    element: (
      <AuthCheck>
        <SignUpFarmer />
      </AuthCheck>
    ),
  },
  {
    path: "/signupbuyer",
    element: (
      <AuthCheck>
        <SignUpBuyer />
      </AuthCheck>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthCheck>
        <LoginPage />
      </AuthCheck>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: "buyer",
        element: <BuyerDashboard />,
      },
      {
        path: "buyer/:productName",
        element: <SingleProduct />,
      },
      {
        path: "farmer",
        element: <FarmerDashboard />,
      },
      {
        path: "orders",
        element: <Order />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "earnings",
        element: <Earnings />,
      },
      {
        path: "buyerprofile",
        element: <BuyerProfile />,
      },
      {
        path: "farmerprofile",
        element: <FarmerProfile />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
