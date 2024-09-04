import { styles } from "../../styles/styles";
import Logo from "../Logo";

function Header() {
  return (
    <div>
      <header className="w-full sticky top-0 z-50 bg-white/95 px-16 backdrop-blur-md  h-16 flex items-center">
        <div className={`${styles.NavWidth} `}>
          <nav className="flex justify-between items-center w-full">
            <div>
              <Logo />
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
