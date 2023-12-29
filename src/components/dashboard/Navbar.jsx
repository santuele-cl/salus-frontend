import HamburgerBtn from "./HamburgerBtn";
import Logo from "../Logo";
import NavbarProfile from "./NavbarProfile";
// import NavbarSearchBar from "./NavbarSearchBar";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-4 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex justify-start items-center">
          <HamburgerBtn />
          <Logo />
          {/* <NavbarSearchBar /> */}
        </div>
        <NavbarProfile />
      </div>
    </nav>
  );
};
export default Navbar;
