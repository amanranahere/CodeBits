import LogoBox from "./LogoBox";
import SearchBar from "./SearchBar";
import IconBox from "./IconBox";

function Navbar() {
  return (
    <div className="flex items-center justify-between ">
      <LogoBox />
      <SearchBar />
      <Navbar />
    </div>
  );
}

export default Navbar;
