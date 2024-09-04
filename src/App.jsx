import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" index element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
