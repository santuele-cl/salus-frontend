import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/dashboard" className="flex items-center justify-between mr-4">
      <img src="/react.svg" className="mr-3 h-8" alt="Flowbite Logo" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        Salus
      </span>
    </Link>
  );
};
export default Logo;
