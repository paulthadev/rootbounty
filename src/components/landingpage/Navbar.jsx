import Logo from "../Logo";

function Navbar() {
  return (
    <div className="w-full bg-white h-[4.13rem] flex items-center">
      <div className="max-w-7xl lg:ml-16  px-8 md:px-6">
        <Logo />
      </div>
    </div>
  );
}

export default Navbar;
