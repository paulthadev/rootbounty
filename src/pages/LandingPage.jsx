import Header from "../components/landingpage/Header";
import HeroSection from "../components/landingpage/HeroSection";
import WorkShowcase from "../components/landingpage/WorkShowcase";
import { styles } from "../styles/styles";

function LandingPage() {
  return (
    <div>
      <Header />
      <div className={`${styles.maxWidth}`}>
        <HeroSection />
        <WorkShowcase />
      </div>
    </div>
  );
}

export default LandingPage;
