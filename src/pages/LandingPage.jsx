import Header from "../components/landingpage/Header";
import HeroSection from "../components/landingpage/HeroSection";
import WorkShowcase from "../components/landingpage/WorkShowcase";

function LandingPage() {
  return (
    <>
      <Header />
      <div className="scrollbar-hide">
        <HeroSection />
        <WorkShowcase />
      </div>
    </>
  );
}

export default LandingPage;
