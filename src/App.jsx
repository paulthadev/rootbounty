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
import Cart from "./pages/dashboard/Cart";
import SingleProduct from "./pages/dashboard/SingleProduct";
import BuyerProfile from "./pages/dashboard/BuyerProfile";
import FarmerProfile from "./pages/dashboard/FarmerProfile";
import ProductList from "./pages/dashboard/ProductList";

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
        path: "buyer/:productId",
        element: <SingleProduct />,
      },
      {
        path: "farmer",
        element: <FarmerDashboard />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "productLists",
        element: <ProductList />,
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
