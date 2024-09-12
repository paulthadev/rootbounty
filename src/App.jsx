import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import SignUpFarmer from "./pages/SignUpFarmer";
import SignUpBuyer from "./pages/SignUpBuyer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" index element={<LandingPage />} />
        <Route path="/onboarding" index element={<Onboarding />} />
        <Route path="/signupfarmer" element={<SignUpFarmer />} />
        <Route path="/signupbuyer" element={<SignUpBuyer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
