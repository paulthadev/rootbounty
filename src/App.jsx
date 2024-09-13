import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import SignUpFarmer from "./pages/auth/SignUpFarmer";
import SignUpBuyer from "./pages/auth/SignUpBuyer";
import LoginPage from "./pages/auth/LoginPage";
import UserProfile from "./pages/dashboard/UserProfile";
import AuthCheck from "./routes/AuthCheck";
import ProtectedRoute from "./routes/ProtectedRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" index element={<LandingPage />} />

        {/* Wrap restricted routes with AuthCheck */}
        <Route
          path="/onboarding"
          index
          element={
            <AuthCheck>
              <Onboarding />
            </AuthCheck>
          }
        />
        <Route
          path="/signupfarmer"
          element={
            <AuthCheck>
              <SignUpFarmer />
            </AuthCheck>
          }
        />
        <Route
          path="/signupbuyer"
          element={
            <AuthCheck>
              <SignUpBuyer />
            </AuthCheck>
          }
        />
        <Route
          path="/login"
          element={
            <AuthCheck>
              <LoginPage />
            </AuthCheck>
          }
        />

        {/* Protect profile route for logged-in users only */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        {/* Public routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
