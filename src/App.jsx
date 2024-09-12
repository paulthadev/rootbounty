import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" index element={<LandingPage />} />
        <Route path="/onboarding" index element={<Onboarding />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
