import "./Header.css";
import logo from "../../assets/logo.svg";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
const Header = () => {
  const { authState } = useAuthContext();
  return (
    <div className="flex-hz-space-bw p-2 bg-bg-black md:px-40 sm:px-10 px-5 py-3 border-b border-white border-opacity-50 h-16 ">
      <p>
        <img src={logo} alt="SVG" />
      </p>
      <Link
        to={authState.isLoggedIn ? "/profile" : "/login"}
        className="px-5 py-1 bg-primary-bg-color rounded-md text-lg"
      >
        {authState.isLoggedIn ? "User" : "Login"}
      </Link>
    </div>
  );
};

export default Header;
