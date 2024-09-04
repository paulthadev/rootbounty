import Logo from "../Logo";

function Header() {
  return (
    <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md h-fit">
      <div className="max-w-7xl mx-auto md:mx-10 px-6 py-3 lg:py-6 flex items-center">
        <Logo />
      </div>
    </header>
  );
}

export default Header;
