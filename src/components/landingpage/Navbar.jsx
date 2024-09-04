import { styles } from "../../styles/styles";
import Logo from "../Logo";

function Navbar() {
  return (
    <div className="w-full bg-white h-[4.13rem] flex items-center justify-start">
      <div className={styles.maxWidth}>
        <Logo />
      </div>
    </div>
  );
}

export default Navbar;
