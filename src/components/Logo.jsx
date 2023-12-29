import { Link } from "react-router-dom";
import useGetConfig from "../hooks/useGetConfig";

const Logo = () => {
  const { name, logo } = useGetConfig();

  return (
    <Link to="/dashboard" className="flex items-center justify-between mr-4">
      <div className="flex items-center justify-center">
        <img src={logo} className="mr-3 h-8" alt="logo" />
      </div>
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        {name}
      </span>
    </Link>
  );
};
export default Logo;
