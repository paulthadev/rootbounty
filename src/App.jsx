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
        index: true,
        element: <BuyerDashboard />,
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
